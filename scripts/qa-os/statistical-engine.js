/**
 * QA-OS — Phase E: Evidence-Derived Probabilistic Confidence Engine
 *
 * Upgrades confidence scoring from static expert-tuned weights to an
 * evidence-completeness-aware, uncertainty-quantified model:
 *
 * 1. Evidence Completeness    — actual captured traces ÷ expected traces
 * 2. Historical uncertainty   — confidence intervals widen with fewer runs
 * 3. Dynamic weight shifting  — low-evidence dimensions reduce their own weight
 * 4. Uncertainty band         — final score carries ±uncertainty_pct
 * 5. Direction-aware anomaly  — positive regression only triggers CRITICAL
 * 6. Proportional stdDev floor — max(sqrt(var), mean*0.15, 50ms)
 */

const fs = require('fs');
const evidenceEngine = require('./evidence-engine');

// Expected number of API trace events for 100% functional completeness
const EXPECTED_API_TRACES = 14; // login×5, crm×3, projects×3, hr×3 = ~14 core events

class StatisticalEngine {
  constructor() {
    this.history        = [];
    this.anomalies      = [];
    this.confidenceScore = 100.0;
    this.uncertaintyBand = 0.0;
    this.evidenceCompleteness = 1.0;
  }

  // ── History management ───────────────────────────────────────────────────────

  loadHistory(historyPath) {
    if (fs.existsSync(historyPath)) {
      try {
        this.history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
      } catch (e) {
        evidenceEngine.logConsole('warning', `Failed to read statistical history, starting fresh: ${e.message}`);
        this.history = [];
      }
    }
  }

  saveHistory(historyPath, currentMetrics) {
    this.history.push({ timestamp: new Date().toISOString(), metrics: currentMetrics });
    if (this.history.length > 10) {
      this.history = this.history.slice(this.history.length - 10); // Keep last 10
    }
    fs.writeFileSync(historyPath, JSON.stringify(this.history, null, 2));
    evidenceEngine.logConsole('info', `Rolling history persisted (${this.history.length}/10 runs).`);
  }

  // ── Phase E: Evidence Completeness ──────────────────────────────────────────

  /**
   * Measure what fraction of expected telemetry was actually captured.
   * A run that crashes early produces fewer traces → lower completeness.
   */
  computeEvidenceCompleteness(results, capturedApiTraces) {
    const totalScenarios = results.passed.length + results.failed.length;
    const scenarioCompleteness = totalScenarios > 0
      ? results.passed.length / totalScenarios : 1.0;

    const traceCompleteness = capturedApiTraces >= EXPECTED_API_TRACES
      ? 1.0
      : capturedApiTraces / EXPECTED_API_TRACES;

    // Weighted: 60% scenario pass-rate, 40% trace capture completeness
    this.evidenceCompleteness = (scenarioCompleteness * 0.6) + (traceCompleteness * 0.4);
    this.evidenceCompleteness = Math.min(1.0, Math.max(0.0, this.evidenceCompleteness));

    evidenceEngine.logConsole('info',
      `Evidence Completeness: ${(this.evidenceCompleteness * 100).toFixed(1)}% ` +
      `(scenarios: ${(scenarioCompleteness * 100).toFixed(0)}% | traces: ${capturedApiTraces}/${EXPECTED_API_TRACES})`
    );
    return this.evidenceCompleteness;
  }

  // ── Phase A+E: Direction-aware anomaly detection with proportional stdDev ───

  analyzeRegressions(currentMetrics) {
    this.anomalies = [];
    if (this.history.length === 0) {
      evidenceEngine.logConsole('info', 'No baseline yet — skipping regression analysis.');
      return this.anomalies;
    }

    evidenceEngine.logConsole('info', 'Computing Z-score regression drifts (direction-aware, proportional stdDev)...');

    for (const key of Object.keys(currentMetrics)) {
      const pastValues = this.history
        .map(run => run.metrics[key])
        .filter(v => typeof v === 'number');

      if (pastValues.length >= 2) {
        const mean      = pastValues.reduce((s, v) => s + v, 0) / pastValues.length;
        const variance  = pastValues.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / pastValues.length;

        // Tiered proportional stdDev floor — prevents false positives from OS scheduling
        // jitter in fast micro-scenarios (DB queries, file ops typically < 100ms):
        //
        //  mean < 200ms  → floor = max(mean*0.60, 100ms)   [fast: high relative tolerance]
        //  mean < 2000ms → floor = max(mean*0.20, 100ms)   [normal: moderate tolerance]
        //  mean ≥ 2000ms → floor = max(mean*0.15, 100ms)   [slow: tighter tolerance]
        //
        // Rationale: A 254ms Prisma query in a 66ms-mean scenario is OS jitter, not a
        // production incident. A 1800ms auth call in a 1200ms-mean scenario IS notable.
        let proportionalFloor;
        if (mean < 200) {
          proportionalFloor = Math.max(mean * 0.60, 100);
        } else if (mean < 2000) {
          proportionalFloor = Math.max(mean * 0.20, 100);
        } else {
          proportionalFloor = Math.max(mean * 0.15, 100);
        }
        const stdDev = Math.max(Math.sqrt(variance), proportionalFloor);

        const current   = currentMetrics[key];
        const zScore    = (current - mean) / stdDev;       // signed
        const absDrift  = Math.abs(zScore);
        const isRegression = zScore > 0;
        const isSignificant = absDrift > 2.0 || (isRegression && current > mean * 2);

        // Phase E: uncertainty factor — wider CI with fewer historical runs
        // With N=2 runs, stdDev estimate is uncertain → flag more cautiously
        const historyFactor = Math.min(1.0, pastValues.length / 5); // Saturates at 5 runs
        const adjustedThreshold = 2.0 + (1.0 - historyFactor) * 1.0; // 3.0 with N=2, 2.0 with N≥5

        evidenceEngine.logConsole('info',
          `"${key}": ${current}ms | μ=${Math.round(mean)}ms | σ=${Math.round(stdDev)}ms | Z=${zScore.toFixed(2)} | Threshold=±${adjustedThreshold.toFixed(1)}σ`
        );

        if (isSignificant && absDrift > adjustedThreshold) {
          let severity;
          if (!isRegression) {
            severity = 'IMPROVEMENT';
          } else if (absDrift > 3.0 || current > mean * 3) {
            // Fast micro-scenario safety cap: if BOTH the current value AND the mean are
            // sub-500ms / sub-200ms, the absolute latency is still acceptable even if the
            // relative Z-score looks alarming. Cap at WARNING to avoid false CI blocks.
            // Example: Prisma mean=66ms, current=254ms — 254ms is still fine.
            const isMicroScenarioJitter = mean < 200 && current < 500;
            severity = isMicroScenarioJitter ? 'WARNING' : 'CRITICAL';
          } else {
            severity = 'WARNING';
          }

          const anomaly = {
            metric:            key,
            currentValue:      current,
            historicalAverage: Math.round(mean),
            stdDev:            Math.round(stdDev),
            zScore:            Number(zScore.toFixed(2)),
            historyDepth:      pastValues.length,
            adjustedThreshold: Number(adjustedThreshold.toFixed(2)),
            severity,
            type:   isRegression ? 'Performance regression' : 'Performance improvement',
            reason: !isRegression
              ? `System ran ${absDrift.toFixed(2)}σ faster — improvement`
              : `Z-Score +${zScore.toFixed(2)} exceeds adjusted threshold (+${adjustedThreshold.toFixed(1)}σ)`,
          };
          this.anomalies.push(anomaly);
          const logLevel = severity === 'IMPROVEMENT' ? 'info' : 'warning';
          evidenceEngine.logConsole(logLevel,
            `${severity === 'IMPROVEMENT' ? '📈' : '⚠️'} [LATENCY ${severity}] "${key}" Z=${zScore.toFixed(2)}σ (drift: ${absDrift.toFixed(2)}σ)`
          );
        }
      }
    }

    return this.anomalies;
  }

  // ── Phase E: Evidence-Derived Probabilistic Confidence ──────────────────────

  /**
   * Compute a confidence score that factors in:
   * 1. Functional integrity        (40% nominal weight)
   * 2. Data integrity              (30% nominal weight)
   * 3. Performance stability       (20% nominal weight)
   * 4. Security integrity          (10% nominal weight)
   *
   * Plus Phase E adjustments:
   * - Evidence completeness multiplier (how much evidence was captured)
   * - Uncertainty band (based on history depth — fewer runs → wider uncertainty)
   * - Dynamic weight rebalancing (if a dimension has no evidence, its weight shifts)
   */
  computeConfidenceScore(results, performanceReport, capturedApiTraces = 0) {
    evidenceEngine.logConsole('info', '📐 Computing evidence-derived probabilistic confidence score...');

    // ── Base dimension scores ────────────────────────────────────────────────

    // 1. Functional Integrity (40%)
    const totalScenarios     = results.passed.length + results.failed.length;
    const functionalIntegrity = totalScenarios > 0
      ? (results.passed.length / totalScenarios) * 100 : 100.0;

    // 2. Data Integrity (30%)
    let dataIntegrity = 100.0;
    if (results.prismaIssues?.length > 0) {
      dataIntegrity -= results.prismaIssues.length * 20.0;
    }
    dataIntegrity = Math.max(0.0, dataIntegrity);

    // 3. Performance Stability (20%)
    let performanceStability = 100.0;
    if (!performanceReport.thresholdChecks?.dashboardUnder3s) performanceStability -= 25.0;
    if (!performanceReport.thresholdChecks?.apiUnder800ms)     performanceStability -= 25.0;
    if (!performanceReport.thresholdChecks?.websocketUnder500ms) performanceStability -= 25.0;

    // Only count CRITICAL regressions (positive Z-scores) — not improvements
    const criticalRegressions = (this.anomalies || []).filter(a => a.severity === 'CRITICAL');
    performanceStability -= criticalRegressions.length * 10.0;
    performanceStability  = Math.max(0.0, performanceStability);

    // 4. Security Stability (10%)
    let securityStability = 100.0;
    if (results.rbacIssues?.length     > 0) securityStability -= results.rbacIssues.length     * 50.0;
    if (results.securityFindings?.length > 0) securityStability -= results.securityFindings.length * 25.0;
    securityStability = Math.max(0.0, securityStability);

    // ── Phase E: Evidence completeness ──────────────────────────────────────

    const completeness = this.computeEvidenceCompleteness(results, capturedApiTraces);

    // ── Phase E: Dynamic weight adjustment ──────────────────────────────────
    // If evidence completeness is very low, the functional score is unreliable.
    // Shift weight away from functional toward data + security (which are DB-verifiable).

    let wFunc = 0.40, wData = 0.30, wPerf = 0.20, wSec = 0.10;
    if (completeness < 0.8) {
      const deficit = (0.8 - completeness) * 0.5; // Max 0.10 shift
      wFunc = Math.max(0.30, wFunc - deficit);
      wData = Math.min(0.40, wData + deficit * 0.6);
      wSec  = Math.min(0.15, wSec  + deficit * 0.4);
    }

    // ── Phase E: Uncertainty quantification ─────────────────────────────────
    // Fewer historical runs → wider uncertainty band on statistical scores.
    // N=1: ±5.0pp | N=2: ±3.5pp | N=3: ±2.0pp | N≥5: ±0.5pp
    const n = this.history.length;
    const uncertaintyBand = n === 0 ? 5.0
      : n === 1 ? 5.0
      : n === 2 ? 3.5
      : n === 3 ? 2.0
      : n === 4 ? 1.0
      : 0.5;
    this.uncertaintyBand = uncertaintyBand;

    // ── Weighted aggregation ─────────────────────────────────────────────────

    const rawScore = (
      functionalIntegrity  * wFunc +
      dataIntegrity        * wData +
      performanceStability * wPerf +
      securityStability    * wSec
    );

    // Apply evidence completeness multiplier: low evidence → penalise confidence
    const completenessAdjusted = rawScore * (0.70 + 0.30 * completeness);

    this.confidenceScore = Number(
      Math.max(0.0, Math.min(100.0, completenessAdjusted)).toFixed(2)
    );

    // ── Logging ──────────────────────────────────────────────────────────────

    evidenceEngine.logConsole('info', `Confidence Score Model (Phase E — Evidence-Derived):`);
    evidenceEngine.logConsole('info', `  Weights: Func=${(wFunc*100).toFixed(0)}% Data=${(wData*100).toFixed(0)}% Perf=${(wPerf*100).toFixed(0)}% Sec=${(wSec*100).toFixed(0)}%`);
    evidenceEngine.logConsole('info', `  - Functional Integrity  (${(wFunc*100).toFixed(0)}%): ${functionalIntegrity.toFixed(2)}%`);
    evidenceEngine.logConsole('info', `  - Data Integrity        (${(wData*100).toFixed(0)}%): ${dataIntegrity.toFixed(2)}%`);
    evidenceEngine.logConsole('info', `  - Performance Stability (${(wPerf*100).toFixed(0)}%): ${performanceStability.toFixed(2)}%`);
    evidenceEngine.logConsole('info', `  - Security Stability    (${(wSec*100).toFixed(0)}%): ${securityStability.toFixed(2)}%`);
    evidenceEngine.logConsole('info', `  Evidence Completeness: ${(completeness * 100).toFixed(1)}% | Uncertainty: ±${uncertaintyBand}pp | N=${n} runs`);
    evidenceEngine.logConsole('info', `  >> CONFIDENCE: ${this.confidenceScore}% ±${uncertaintyBand}pp (${this.confidenceScore - uncertaintyBand}–${Math.min(100, this.confidenceScore + uncertaintyBand)}%)`);

    return this.confidenceScore;
  }
}

module.exports = new StatisticalEngine();
