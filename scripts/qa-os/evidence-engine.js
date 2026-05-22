/**
 * QA-OS — Phase A: Evidence Engine with Distributed Tracing
 *
 * Every event (API call, WebSocket, chaos injection, DB snapshot) is stamped
 * with a global runTraceId and a per-event spanId, enabling full distributed
 * trace correlation across: API → DB → WebSocket → Chaos Engine.
 *
 * Outputs:
 *   e2e-raw-evidence.json      — all raw telemetry
 *   distributed-trace.json     — hierarchical span tree keyed by runTraceId
 *   api-traces/                — per-endpoint JSON files
 */

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

class EvidenceEngine {
  constructor() {
    // ── Distributed Trace IDs ──────────────────────────────────────────────
    this.runTraceId = this._uuid();   // Global identifier for this entire E2E run
    this.spanCounter = 0;             // Monotonically increasing span index

    // ── Telemetry Buckets ──────────────────────────────────────────────────
    this.apiTraces       = [];
    this.websocketEvents = [];
    this.consoleLogs     = [];
    this.screenshots     = [];
    this.dbSnapshots     = { before: null, after: null, diff: null };
    this.chaosEvents     = [];

    // ── SEO / Visual ───────────────────────────────────────────────────────
    this.seoVisualStats  = {};
  }

  // ── UUID & Span helpers ──────────────────────────────────────────────────

  _uuid() {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : crypto.randomBytes(16).toString('hex').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
  }

  generateTraceId() { return this._uuid(); }

  generateSpanId() {
    this.spanCounter++;
    return `span-${String(this.spanCounter).padStart(4, '0')}-${this._uuid().slice(0, 8)}`;
  }

  // ── DB hash ──────────────────────────────────────────────────────────────

  calculateDbStateHash(snapshot) {
    if (!snapshot) return 'null-hash';
    return crypto.createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
  }

  // ── Logging methods ───────────────────────────────────────────────────────

  /**
   * Log an API call with distributed trace metadata.
   * The x-trace-id header should be passed in axioscalls so the backend
   * can correlate server-side logs with this span.
   */
  logApiCall(method, endpoint, input, output, latency, status, success = true) {
    const spanId = this.generateSpanId();
    const trace  = {
      traceId:      this.runTraceId,
      spanId,
      spanIndex:    this.spanCounter,
      timestamp:    new Date().toISOString(),
      module:       endpoint.split('/').filter(Boolean)[0] || 'generic',
      type:         'api',
      method,
      endpoint,
      input:        input  ? JSON.parse(JSON.stringify(input))  : null,
      output:       output ? JSON.parse(JSON.stringify(output)) : null,
      latency,
      status,
      success,
      dbStateHash:  this.calculateDbStateHash(this.dbSnapshots.after || this.dbSnapshots.before),
    };
    this.apiTraces.push(trace);
    return trace;
  }

  /**
   * Log a WebSocket event with distributed trace correlation.
   */
  logWebSocketEvent(event, role, data = {}, durationMs = null) {
    const spanId = this.generateSpanId();
    const item   = {
      traceId:    this.runTraceId,
      spanId,
      spanIndex:  this.spanCounter,
      timestamp:  new Date().toISOString(),
      module:     'realtime',
      type:       'websocket',
      event,
      role,
      data:       JSON.parse(JSON.stringify(data)),
      durationMs,
      dbStateHash: this.calculateDbStateHash(this.dbSnapshots.after || this.dbSnapshots.before),
    };
    this.websocketEvents.push(item);
    return item;
  }

  /**
   * Log console output (structured, level-aware).
   */
  logConsole(level, message) {
    const item = { timestamp: new Date().toISOString(), level, message };
    this.consoleLogs.push(item);
    console.log(`[QA-OS] [${level.toUpperCase()}] - ${message}`);
  }

  /**
   * Record a Puppeteer screenshot capture.
   */
  logScreenshot(id, label, relPath, absolutePath) {
    this.screenshots.push({
      id, label, relPath, absolutePath,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Record a chaos event with distributed trace metadata.
   */
  logChaos(type, target, details, severity = 'INFO') {
    const spanId = this.generateSpanId();
    const item   = {
      traceId:   this.runTraceId,
      spanId,
      spanIndex: this.spanCounter,
      timestamp: new Date().toISOString(),
      type:      'chaos',
      chaosType: type,
      target,
      details,
      severity,
    };
    this.chaosEvents.push(item);
    return item;
  }

  // ── Database snapshots ─────────────────────────────────────────────────────

  async captureDbSnapshot(pool, when = 'before') {
    const tables = [
      'User', 'Employee', 'Customer', 'Project', 'Task',
      'SupportTicket', 'Leave', 'Attendance', 'File',
      'Invoice', 'Commission', 'Salary',
    ];
    const snapshot = {};
    for (const table of tables) {
      try {
        const res = await pool.query(`SELECT COUNT(*)::integer FROM "${table}"`);
        snapshot[table] = res.rows[0].count;
      } catch (_) {
        snapshot[table] = 0;
      }
    }
    this.dbSnapshots[when] = snapshot;

    if (when === 'after' && this.dbSnapshots.before) {
      const diff = {};
      for (const table of tables) {
        diff[table] = (this.dbSnapshots.after[table] || 0) - (this.dbSnapshots.before[table] || 0);
      }
      this.dbSnapshots.diff = diff;
    }

    const hash = this.calculateDbStateHash(snapshot);
    this.logConsole('info', `DB snapshot [${when}] captured — Hash: ${hash.slice(0, 16)}… (traceId: ${this.runTraceId.slice(0, 8)}…)`);
    return snapshot;
  }

  // ── Distributed Trace Tree builder ─────────────────────────────────────────

  /**
   * Assemble all events into a chronological distributed trace tree.
   * Groups spans under the single runTraceId, sorted by spanIndex.
   */
  buildDistributedTrace() {
    const allSpans = [
      ...this.apiTraces,
      ...this.websocketEvents,
      ...this.chaosEvents,
    ].sort((a, b) => a.spanIndex - b.spanIndex);

    return {
      traceId:       this.runTraceId,
      startTime:     allSpans[0]?.timestamp || new Date().toISOString(),
      endTime:       allSpans[allSpans.length - 1]?.timestamp || new Date().toISOString(),
      totalSpans:    allSpans.length,
      apiSpans:      this.apiTraces.length,
      wsSpans:       this.websocketEvents.length,
      chaosSpans:    this.chaosEvents.length,
      spans:         allSpans,
    };
  }

  // ── Persistence ─────────────────────────────────────────────────────────────

  save(artifactDir, workspaceDir) {
    // ── 1. Raw evidence bundle ───────────────────────────────────────────────
    const rawEvidence = {
      timestamp:    new Date().toISOString(),
      runTraceId:   this.runTraceId,
      dbSnapshots: {
        before:     this.dbSnapshots.before,
        after:      this.dbSnapshots.after,
        diff:       this.dbSnapshots.diff,
        beforeHash: this.calculateDbStateHash(this.dbSnapshots.before),
        afterHash:  this.calculateDbStateHash(this.dbSnapshots.after),
      },
      apiTraces:        this.apiTraces,
      websocketEvents:  this.websocketEvents,
      chaosEvents:      this.chaosEvents,
      consoleLogs:      this.consoleLogs,
      screenshots:      this.screenshots,
      seoStats:         this.seoVisualStats,
    };

    // ── 2. Distributed trace ─────────────────────────────────────────────────
    const distributedTrace = this.buildDistributedTrace();

    const evidenceJson = JSON.stringify(rawEvidence,       null, 2);
    const traceJson    = JSON.stringify(distributedTrace,  null, 2);

    [artifactDir, workspaceDir].forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'e2e-raw-evidence.json'),  evidenceJson);
      fs.writeFileSync(path.join(dir, 'distributed-trace.json'), traceJson);

      // ── 3. Individual API trace files ────────────────────────────────────
      const tracesDir = path.join(dir, 'api-traces');
      if (!fs.existsSync(tracesDir)) fs.mkdirSync(tracesDir, { recursive: true });

      const saveTrace = (filename, predicate) => {
        const t = this.apiTraces.find(predicate);
        if (t) fs.writeFileSync(path.join(tracesDir, filename), JSON.stringify(t.output, null, 2));
      };

      saveTrace('crm-customer-creation.json',  t => t.endpoint === '/crm/customers' && t.success);
      saveTrace('crm-lead-creation.json',       t => t.endpoint === '/crm/leads' && t.success);
      saveTrace('crm-lead-won-transition.json', t => t.endpoint.startsWith('/crm/leads/') && t.endpoint.endsWith('/stage?stage=WON') && t.success);
      saveTrace('finance-invoice-generation.json', t => t.endpoint === '/finance/invoices' && t.success);
      saveTrace('finance-stripe-payment.json',  t => t.endpoint === '/finance/payments' && t.success);
      saveTrace('hr-clock-in.json',             t => t.endpoint === '/hr/attendance/clock-in' && t.success);
      saveTrace('hr-clock-out.json',            t => t.endpoint === '/hr/attendance/clock-out' && t.success);
      saveTrace('hr-leave-submission.json',     t => t.endpoint === '/hr/leaves' && t.success);
      saveTrace('hr-leave-approval.json',       t => t.endpoint.startsWith('/hr/leaves/') && t.endpoint.endsWith('/approve?status=APPROVED') && t.success);
      saveTrace('project-task-creation.json',   t => t.endpoint.startsWith('/projects/') && t.endpoint.endsWith('/tasks') && t.success);
      saveTrace('project-task-drag-drop.json',  t => t.endpoint.startsWith('/projects/tasks/') && t.endpoint.endsWith('/status?status=REVIEW') && t.success);

      // Login trace (first successful auth call)
      const loginTrace = this.apiTraces.find(t => t.endpoint === '/auth/login' && t.success);
      if (loginTrace) {
        const safe = { ...loginTrace, input: { email: loginTrace.input?.email, password: '[REDACTED]' } };
        fs.writeFileSync(path.join(tracesDir, 'superadmin-login-trace.json'), JSON.stringify(safe, null, 2));
      }
    });

    this.logConsole('info',
      `Evidence bundle persisted. RunTraceId: ${this.runTraceId} | ` +
      `Spans: ${distributedTrace.totalSpans} (API:${distributedTrace.apiSpans} WS:${distributedTrace.wsSpans} Chaos:${distributedTrace.chaosSpans})`
    );
    return rawEvidence;
  }
}

module.exports = new EvidenceEngine();
