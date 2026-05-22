/**
 * QA-OS — Phase C: Environment Fingerprinting
 *
 * Captures a deterministic snapshot of the runtime environment per run.
 * Computes an environmentHash for cross-run change detection.
 * Flags unreliable statistical comparisons when the environment shifts.
 */

const os = require('os');
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const evidenceEngine = require('./evidence-engine');

class EnvFingerprint {
  constructor() {
    this.current = null;
    this.previous = null;
    this.fingerprintChanged = false;
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  _getPostgresVersion() {
    try {
      const raw = execSync('psql --version 2>/dev/null', { timeout: 3000 }).toString().trim();
      const match = raw.match(/(\d+\.\d+)/);
      return match ? match[1] : 'unknown';
    } catch (_) {
      return 'unknown';
    }
  }

  _getNextMode() {
    try {
      const pkgPath = path.join(__dirname, '../../package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const devScript = pkg.scripts?.dev || '';
      if (devScript.includes('turbo')) return 'development-turbopack';
      if (devScript.includes('next dev')) return 'development-webpack';
      return 'development';
    } catch (_) {
      return 'development';
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Capture the current environment fingerprint.
   * Call once at bootstrap before any tests run.
   */
  capture() {
    const cpus = os.cpus();
    const fingerprint = {
      capturedAt: new Date().toISOString(),
      hostname:   os.hostname(),
      platform:   os.platform(),
      arch:       os.arch(),
      cpuModel:   cpus[0]?.model || 'unknown',
      cpuCores:   cpus.length,
      cpuSpeedMhz: cpus[0]?.speed || 0,
      totalRamGb: parseFloat((os.totalmem() / (1024 ** 3)).toFixed(2)),
      freeRamGb:  parseFloat((os.freemem()  / (1024 ** 3)).toFixed(2)),
      loadAvg1m:  parseFloat(os.loadavg()[0].toFixed(2)),
      loadAvg5m:  parseFloat(os.loadavg()[1].toFixed(2)),
      nodeVersion:      process.version,
      postgresVersion:  this._getPostgresVersion(),
      nextMode:         this._getNextMode(),
      timezoneOffsetMin: new Date().getTimezoneOffset(),
    };

    // Stable hash: excludes volatile fields (RAM free, loadAvg, capturedAt)
    const hashInput = [
      fingerprint.hostname,
      fingerprint.cpuModel,
      fingerprint.cpuCores,
      fingerprint.totalRamGb,
      fingerprint.nodeVersion,
      fingerprint.postgresVersion,
    ].join('|');
    fingerprint.environmentHash = crypto
      .createHash('sha256')
      .update(hashInput)
      .digest('hex')
      .slice(0, 16);

    this.current = fingerprint;
    evidenceEngine.logConsole('info',
      `🖥️ Env Fingerprint: [${fingerprint.environmentHash}] ` +
      `${fingerprint.cpuCores}× CPU | ${fingerprint.totalRamGb}GB RAM | ` +
      `Node ${fingerprint.nodeVersion} | PG ${fingerprint.postgresVersion}`
    );
    return fingerprint;
  }

  /**
   * Load the previous run's fingerprint and detect environment drift.
   */
  loadPrevious(storePath) {
    if (!fs.existsSync(storePath)) return null;
    try {
      this.previous = JSON.parse(fs.readFileSync(storePath, 'utf8'));
      if (this.current && this.previous.environmentHash !== this.current.environmentHash) {
        this.fingerprintChanged = true;
        evidenceEngine.logConsole('warning',
          `⚠️ [ENV DRIFT] Environment changed: ${this.previous.environmentHash} → ${this.current.environmentHash}. ` +
          `Statistical comparisons against prior runs may be unreliable.`
        );
      } else {
        evidenceEngine.logConsole('info',
          `✅ Environment fingerprint stable across runs: [${this.current?.environmentHash}]`
        );
      }
    } catch (_) {
      this.previous = null;
    }
    return this.previous;
  }

  /**
   * Persist the current fingerprint for the next run to compare against.
   */
  save(storePath) {
    if (this.current) {
      fs.writeFileSync(storePath, JSON.stringify(this.current, null, 2));
    }
  }

  /**
   * Build a markdown section for inclusion in walkthrough/PR comment.
   */
  buildMarkdown() {
    if (!this.current) return '';
    const c = this.current;
    let md = `### 🖥️ Environment Fingerprint\n\n`;
    md += `| Property | Value |\n| :--- | :--- |\n`;
    md += `| **Fingerprint Hash** | \`${c.environmentHash}\` |\n`;
    md += `| **Hostname** | \`${c.hostname}\` |\n`;
    md += `| **OS / Arch** | \`${c.platform} / ${c.arch}\` |\n`;
    md += `| **CPU** | ${c.cpuCores}× ${c.cpuModel} @ ${c.cpuSpeedMhz}MHz |\n`;
    md += `| **RAM** | ${c.freeRamGb}GB free / ${c.totalRamGb}GB total |\n`;
    md += `| **Load Avg (1m / 5m)** | ${c.loadAvg1m} / ${c.loadAvg5m} |\n`;
    md += `| **Node.js** | \`${c.nodeVersion}\` |\n`;
    md += `| **PostgreSQL** | \`${c.postgresVersion}\` |\n`;
    md += `| **Next.js Mode** | \`${c.nextMode}\` |\n`;
    if (this.fingerprintChanged) {
      md += `\n> [!WARNING]\n`;
      md += `> **Environment changed since last run** (hash: \`${this.previous?.environmentHash}\` → \`${c.environmentHash}\`). `;
      md += `Statistical regression comparisons against prior baseline history may carry higher uncertainty.\n\n`;
    }
    return md;
  }
}

module.exports = new EnvFingerprint();
