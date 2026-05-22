/**
 * QA-OS — Phase B: Baseline Versioning & Freeze Manager
 *
 * Maintains immutable versioned frozen baselines (baseline-v1.json, v2.json …)
 * separate from the rolling regression-history.json.
 *
 * Solves "baseline poisoning": when the rolling average slowly absorbs
 * degradation, making regressions look normal. The frozen baseline is the
 * authoritative performance contract.
 */

const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');
const evidenceEngine = require('./evidence-engine');

class BaselineManager {
  constructor() {
    this.baselinesDir       = null;
    this.currentBaseline    = null;
    this.baselineVersion    = 0;
    this.poisoningDetected  = false;
    this.frozenComparison   = null;
    this.autoRefrozen       = false;
  }

  // ── Initialisation ────────────────────────────────────────────────────────

  init(baselinesDir) {
    this.baselinesDir = baselinesDir;
    if (!fs.existsSync(baselinesDir)) {
      fs.mkdirSync(baselinesDir, { recursive: true });
    }
    evidenceEngine.logConsole('info', `BaselineManager initialised — store: ${baselinesDir}`);
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  _filePath(version) {
    return path.join(this.baselinesDir, `baseline-v${version}.json`);
  }

  _getLatestVersion() {
    if (!this.baselinesDir || !fs.existsSync(this.baselinesDir)) return 0;
    const versions = fs.readdirSync(this.baselinesDir)
      .map(f => { const m = f.match(/^baseline-v(\d+)\.json$/); return m ? parseInt(m[1]) : null; })
      .filter(Boolean)
      .sort((a, b) => b - a);
    return versions[0] || 0;
  }

  _metricsHash(metrics) {
    return crypto.createHash('sha256').update(JSON.stringify(metrics)).digest('hex');
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Load the latest frozen baseline (read-only).
   * Returns null if no baseline exists yet (first run).
   */
  loadLatestFrozenBaseline() {
    const version = this._getLatestVersion();
    if (version === 0) {
      evidenceEngine.logConsole('info', '📌 No frozen baseline yet. Current run will establish v1 on completion.');
      return null;
    }
    try {
      const baseline = JSON.parse(fs.readFileSync(this._filePath(version), 'utf8'));
      this.currentBaseline = baseline;
      this.baselineVersion  = version;
      evidenceEngine.logConsole('info',
        `📌 Loaded frozen baseline v${version} — frozen: ${baseline.frozenAt} | hash: ${baseline.metricsHash.slice(0, 12)}…`
      );
      return baseline;
    } catch (e) {
      evidenceEngine.logConsole('warning', `Failed to load baseline v${version}: ${e.message}`);
      return null;
    }
  }

  /**
   * Write a new immutable frozen baseline file.
   */
  freezeBaseline(metrics, reason = 'auto') {
    const newVersion   = this._getLatestVersion() + 1;
    const metricsHash  = this._metricsHash(metrics);
    const baseline     = {
      version:     newVersion,
      frozenAt:    new Date().toISOString(),
      reason,
      metricsHash,
      metrics,
    };
    fs.writeFileSync(this._filePath(newVersion), JSON.stringify(baseline, null, 2));
    this.currentBaseline = baseline;
    this.baselineVersion  = newVersion;
    this.autoRefrozen     = reason === 'auto-improvement';
    evidenceEngine.logConsole('info',
      `✅ Frozen baseline v${newVersion} written (reason: ${reason} | hash: ${metricsHash.slice(0, 12)}…)`
    );
    return baseline;
  }

  /**
   * Baseline Poisoning Detection.
   *
   * "Poisoning" = the rolling history has absorbed consistent degradation so that
   * regressions against the rolling mean look normal.  We detect it by comparing
   * recent runs directly against the frozen baseline.
   */
  detectBaselinePoisoning(history) {
    if (!this.currentBaseline || history.length < 3) return false;

    const frozenMetrics = this.currentBaseline.metrics;
    const recentRuns    = history.slice(-5);
    let degradedMetrics = 0;
    let checkedMetrics  = 0;

    for (const key of Object.keys(frozenMetrics)) {
      const frozenVal = frozenMetrics[key];
      if (typeof frozenVal !== 'number' || frozenVal === 0) continue;
      checkedMetrics++;

      const recentValues = recentRuns
        .map(r => r.metrics[key])
        .filter(v => typeof v === 'number');
      if (recentValues.length < 2) continue;

      const recentMean = recentValues.reduce((s, v) => s + v, 0) / recentValues.length;
      if (recentMean > frozenVal * 1.5) {   // 50% worse than frozen = poisoning signal
        degradedMetrics++;
        evidenceEngine.logConsole('warning',
          `🚨 [POISONING SIGNAL] "${key}": frozen=${frozenVal}ms | recent_mean=${Math.round(recentMean)}ms ` +
          `(+${((recentMean / frozenVal - 1) * 100).toFixed(0)}% worse)`
        );
      }
    }

    this.poisoningDetected = checkedMetrics > 0 && (degradedMetrics / checkedMetrics) >= 0.4;
    if (this.poisoningDetected) {
      evidenceEngine.logConsole('warning',
        `🚨 [BASELINE POISONING DETECTED] ${degradedMetrics}/${checkedMetrics} metrics show ≥50% degradation ` +
        `vs frozen baseline. Rolling history has absorbed degraded runs. Manual review + re-freeze recommended.`
      );
    }
    return this.poisoningDetected;
  }

  /**
   * Compare current run metrics against the frozen baseline.
   * Returns a structured diff object used in reports.
   */
  compareAgainstFrozen(currentMetrics) {
    if (!this.currentBaseline) return null;

    const frozenMetrics = this.currentBaseline.metrics;
    const comparison    = {
      baselineVersion: this.baselineVersion,
      frozenAt:        this.currentBaseline.frozenAt,
      diffs:           {},
      regressionCount:  0,
      improvementCount: 0,
      stableCount:      0,
    };

    for (const key of Object.keys(frozenMetrics)) {
      const frozen  = frozenMetrics[key];
      const current = currentMetrics[key];
      if (typeof frozen !== 'number' || typeof current !== 'number') continue;

      const deltaPct = ((current - frozen) / frozen) * 100;
      let direction;
      if      (deltaPct >  15) { direction = 'REGRESSION';   comparison.regressionCount++;  }
      else if (deltaPct < -10) { direction = 'IMPROVEMENT';  comparison.improvementCount++; }
      else                     { direction = 'STABLE';        comparison.stableCount++;      }

      comparison.diffs[key] = {
        frozen, current, deltaPct: parseFloat(deltaPct.toFixed(2)), direction,
      };
    }

    this.frozenComparison = comparison;
    evidenceEngine.logConsole('info',
      `📌 Frozen baseline v${this.baselineVersion} diff: ` +
      `${comparison.regressionCount} regressions | ${comparison.improvementCount} improvements | ${comparison.stableCount} stable`
    );
    return comparison;
  }

  /**
   * Auto-refreeze heuristic: if 60%+ of metrics have been consistently
   * 15%+ better than the frozen baseline across the last 5 runs, the
   * system has genuinely improved and the baseline should advance.
   */
  shouldAutoRefreeze(history, currentMetrics) {
    if (!this.currentBaseline || history.length < 5) return false;

    const frozenMetrics  = this.currentBaseline.metrics;
    const recentRuns     = history.slice(-5);
    let betterCount = 0, checkedCount = 0;

    for (const key of Object.keys(frozenMetrics)) {
      const frozen = frozenMetrics[key];
      if (typeof frozen !== 'number' || frozen === 0) continue;
      checkedCount++;
      const allBetter = recentRuns.every(run => {
        const val = run.metrics[key];
        return typeof val === 'number' && val < frozen * 0.85;
      });
      if (allBetter) betterCount++;
    }

    const ratio = checkedCount > 0 ? betterCount / checkedCount : 0;
    if (ratio >= 0.6) {
      evidenceEngine.logConsole('info',
        `📈 Auto-refreeze candidate: ${betterCount}/${checkedCount} metrics consistently ≥15% faster than frozen baseline.`
      );
      return true;
    }
    return false;
  }

  /**
   * Build the frozen baseline comparison markdown section.
   */
  buildMarkdown() {
    let md = '';
    if (!this.currentBaseline) {
      md += `### 📌 Frozen Baseline\n\n> [!NOTE]\n> No frozen baseline exists yet. This run will establish **v1**.\n\n`;
      return md;
    }

    md += `### 📌 Frozen Baseline Comparison (v${this.baselineVersion})\n\n`;

    if (this.poisoningDetected) {
      md += `> [!CAUTION]\n`;
      md += `> **Baseline Poisoning Detected!** The rolling history has absorbed consistent degradation. `;
      md += `The frozen baseline v${this.baselineVersion} is the authoritative performance contract. `;
      md += `Manual investigation and re-freeze required before the next release.\n\n`;
    }

    if (this.autoRefrozen) {
      md += `> [!TIP]\n`;
      md += `> **Auto-Refrozen:** System performance improved consistently across 5+ runs. `;
      md += `Baseline auto-advanced to v${this.baselineVersion}.\n\n`;
    }

    if (!this.frozenComparison) return md;

    md += `*Frozen: ${this.currentBaseline.frozenAt} | Hash: \`${this.currentBaseline.metricsHash.slice(0, 12)}…\`*\n\n`;
    md += `| Metric | Frozen Baseline | Current Run | Δ% | Status |\n`;
    md += `| :--- | :---: | :---: | :---: | :--- |\n`;

    for (const [key, diff] of Object.entries(this.frozenComparison.diffs)) {
      const icon = diff.direction === 'REGRESSION' ? '🔴' : diff.direction === 'IMPROVEMENT' ? '🟢' : '⚪';
      const sign = diff.deltaPct > 0 ? '+' : '';
      md += `| \`${key}\` | ${diff.frozen}ms | ${diff.current}ms | ${sign}${diff.deltaPct}% | ${icon} ${diff.direction} |\n`;
    }
    md += `\n`;
    return md;
  }
}

module.exports = new BaselineManager();
