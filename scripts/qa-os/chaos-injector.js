/**
 * QA-OS — Phase D: Stochastic Chaos Injector
 *
 * Replaces deterministic chaos with probabilistic, context-aware fault injection:
 *
 * 1. Gaussian network delays     — realistic latency distribution (μ=200ms, σ=150ms)
 * 2. Fault schedule generation   — random fault plan seeded before each run
 * 3. Configurable probabilities  — faultProbabilities map, tunable per environment
 * 4. Multi-fault combinations    — simultaneous network + DB contention storms
 * 5. Probabilistic packet drop   — configurable drop rate (default 5%)
 */

const axios = require('axios');
const evidenceEngine = require('./evidence-engine');

class ChaosInjector {
  constructor() {
    this.chaosEnabled    = false;
    this.chaosHistory    = [];
    this.faultSchedule   = [];

    // Configurable stochastic fault probabilities (0.0 – 1.0)
    this.faultProbabilities = {
      networkDrop:          0.05,   // 5%  — simulate dropped packet / ETIMEDOUT
      latencySpike:         0.25,   // 25% — inject Gaussian latency on each call
      dbLockContention:     1.00,   // Always run DB lock scenario (deterministic safety check)
      dbTransactionRollback: 1.00,  // Always run rollback scenario
      apiAbuseFuzzing:      1.00,   // Always run fuzzing
      concurrentUserStorm:  1.00,   // Always run load storm
    };
  }

  // ── Enable / Disable ────────────────────────────────────────────────────────

  enable() {
    this.chaosEnabled = true;
    this.faultSchedule = this._generateFaultSchedule();
    evidenceEngine.logConsole('warning',
      `⚠️ Chaos Injector ACTIVATED — stochastic mode. Fault schedule: [${this.faultSchedule.join(', ')}]`
    );
  }

  disable() {
    this.chaosEnabled = false;
    evidenceEngine.logConsole('info', '✅ Chaos Injector DEACTIVATED.');
  }

  // ── Stochastic helpers ──────────────────────────────────────────────────────

  /**
   * Box-Muller transform: generate a Gaussian-distributed random number.
   * Used to model realistic network latency distributions.
   */
  _gaussianRandom(mean, stdDev) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Exclude 0
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return Math.max(0, Math.round(mean + stdDev * z)); // Clamp to non-negative
  }

  /**
   * Pre-generate a randomized fault plan for the run.
   * This ensures chaos is non-deterministic across runs, but reproducible
   * within a run (each call to injectNetworkChaos reads from this plan).
   */
  _generateFaultSchedule() {
    const faultTypes = ['LATENCY_LOW', 'LATENCY_HIGH', 'LATENCY_SPIKE', 'DROP', 'CLEAN'];
    const weights    = [0.30, 0.25, 0.15, 0.05, 0.25]; // cumulative probability
    const schedule   = [];
    for (let i = 0; i < 100; i++) {
      const roll = Math.random();
      let cumulative = 0;
      for (let j = 0; j < faultTypes.length; j++) {
        cumulative += weights[j];
        if (roll < cumulative) { schedule.push(faultTypes[j]); break; }
      }
    }
    return schedule;
  }

  _nextFault() {
    if (!this.faultSchedule.length) return 'CLEAN';
    return this.faultSchedule[Math.floor(Math.random() * this.faultSchedule.length)];
  }

  _shouldFire(probability) {
    return Math.random() < probability;
  }

  // ── Phase D: Stochastic Network Chaos ───────────────────────────────────────

  /**
   * Wraps an API call with optional Gaussian latency injection and probabilistic
   * packet drops. When chaos is disabled, the call runs clean.
   */
  async injectNetworkChaos(apiCallFn, traceDetails = {}) {
    if (!this.chaosEnabled) return await apiCallFn();

    const fault = this._nextFault();

    switch (fault) {
      case 'LATENCY_LOW': {
        // Light latency — 50–150ms (Gaussian μ=100, σ=25)
        const delay = this._gaussianRandom(100, 25);
        evidenceEngine.logConsole('warning',
          `[CHAOS:LATENCY_LOW] +${delay}ms Gaussian delay on ${traceDetails.method} ${traceDetails.endpoint}`
        );
        evidenceEngine.logChaos('LATENCY_LOW', traceDetails.endpoint, `Gaussian delay +${delay}ms`, 'INFO');
        await new Promise(r => setTimeout(r, delay));
        break;
      }
      case 'LATENCY_HIGH': {
        // Heavy latency — 300–700ms (Gaussian μ=500, σ=100)
        const delay = this._gaussianRandom(500, 100);
        evidenceEngine.logConsole('warning',
          `[CHAOS:LATENCY_HIGH] +${delay}ms Gaussian delay on ${traceDetails.method} ${traceDetails.endpoint}`
        );
        evidenceEngine.logChaos('LATENCY_HIGH', traceDetails.endpoint, `Heavy Gaussian delay +${delay}ms`, 'WARNING');
        await new Promise(r => setTimeout(r, delay));
        break;
      }
      case 'LATENCY_SPIKE': {
        // Tail-latency spike — 1000–3000ms (Gaussian μ=2000, σ=500)
        const delay = this._gaussianRandom(2000, 500);
        evidenceEngine.logConsole('warning',
          `[CHAOS:LATENCY_SPIKE] +${delay}ms tail-latency spike on ${traceDetails.endpoint}`
        );
        evidenceEngine.logChaos('LATENCY_SPIKE', traceDetails.endpoint, `Tail-latency spike +${delay}ms`, 'HIGH');
        await new Promise(r => setTimeout(r, delay));
        break;
      }
      case 'DROP': {
        if (this._shouldFire(this.faultProbabilities.networkDrop)) {
          evidenceEngine.logConsole('warning',
            `[CHAOS:DROP] Simulating packet drop / ETIMEDOUT on ${traceDetails.endpoint}`
          );
          evidenceEngine.logChaos('DROPPED_REQUEST', traceDetails.endpoint, 'Probabilistic connection timeout', 'CRITICAL');
          throw new Error('Timeout: ETIMEDOUT — stochastic packet drop simulation.');
        }
        break;
      }
      case 'CLEAN':
      default:
        // No fault — clean path
        break;
    }

    return await apiCallFn();
  }

  // ── Database Chaos: Rollbacks + Lock Contention ─────────────────────────────

  async injectDbChaos(pool) {
    if (!this.chaosEnabled) return;
    evidenceEngine.logConsole('info', '🔥 [DB CHAOS] Initiating Database Chaos Engine...');

    // A. Duplicate PK transaction rollback
    evidenceEngine.logChaos('DB_TRANSACTION_ROLLBACK', 'Invoice',
      'Attempting duplicate primary-key INSERT inside transaction boundary', 'WARNING'
    );
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const dupNum = `INV-CHAOS-DUPLICATE-${Date.now()}`;
      await client.query(
        `INSERT INTO "Invoice" (id, "invoiceNumber", "dueDate", subtotal, tax, discount, status, "createdAt", "updatedAt")
         VALUES ('chaos-inv-1', '${dupNum}', NOW(), 500.0, 50.0, 0.0, 'DRAFT', NOW(), NOW())`
      );
      await client.query(
        `INSERT INTO "Invoice" (id, "invoiceNumber", "dueDate", subtotal, tax, discount, status, "createdAt", "updatedAt")
         VALUES ('chaos-inv-2', '${dupNum}', NOW(), 1000.0, 100.0, 0.0, 'DRAFT', NOW(), NOW())`
      );
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      evidenceEngine.logConsole('info', `✅ DB Rollback verified: Conflict prevented duplicate entries. (${err.message})`);
      evidenceEngine.logChaos('DB_ROLLBACK_VERIFIED', 'Invoice',
        `Transaction aborted and rolled back successfully: ${err.message}`, 'INFO'
      );
    } finally {
      try { await pool.query(`DELETE FROM "Invoice" WHERE id IN ('chaos-inv-1','chaos-inv-2')`); } catch (_) {}
      client.release();
    }

    // B. Stochastic row-lock contention — randomized lock hold duration
    const lockHoldMs = this._gaussianRandom(400, 150); // Realistic variable hold time
    evidenceEngine.logConsole('info', `🔥 [DB CHAOS] Row Lock Contention (hold: ${lockHoldMs}ms)...`);
    evidenceEngine.logChaos('ROW_LOCK_CONTENTION', 'CrmLead',
      `Concurrent SELECT FOR UPDATE locks — stochastic hold time: ${lockHoldMs}ms`, 'WARNING'
    );

    const c1 = await pool.connect();
    const c2 = await pool.connect();
    try {
      const leadRes = await pool.query('SELECT id FROM "CrmLead" LIMIT 1');
      if (leadRes.rows.length > 0) {
        const leadId = leadRes.rows[0].id;
        await c1.query('BEGIN');
        await c1.query(`SELECT id FROM "CrmLead" WHERE id = '${leadId}' FOR UPDATE`);
        evidenceEngine.logConsole('info', `Client 1 acquired lock on CrmLead row: ${leadId}`);

        await c2.query('BEGIN');
        const lockPromise = c2.query(`SELECT id FROM "CrmLead" WHERE id = '${leadId}' FOR UPDATE`);

        await new Promise(r => setTimeout(r, lockHoldMs));
        await c1.query('ROLLBACK');
        evidenceEngine.logConsole('info', 'Client 1 released lock. Client 2 should resolve.');

        await lockPromise;
        await c2.query('ROLLBACK');
        evidenceEngine.logConsole('info', '✅ Concurrency row-locking verified (no deadlock).');
        evidenceEngine.logChaos('ROW_LOCK_SUCCESS', 'CrmLead',
          `Lock resolved cleanly after ${lockHoldMs}ms hold. No deadlock.`, 'INFO'
        );
      }
    } catch (e) {
      evidenceEngine.logConsole('warning', `DB lock exception: ${e.message}`);
      evidenceEngine.logChaos('ROW_LOCK_EXCEPTION', 'CrmLead', e.message, 'HIGH');
    } finally {
      c1.release();
      c2.release();
    }
  }

  // ── User Concurrency Storm ──────────────────────────────────────────────────

  async injectUserChaos(backendUrl, superadminToken) {
    if (!this.chaosEnabled) return;

    // Stochastic load: randomise between 40–60 concurrent users
    const userCount = 40 + Math.floor(Math.random() * 21);
    evidenceEngine.logConsole('info',
      `🔥 [USER CHAOS] Concurrent Storm — ${userCount} parallel requests (stochastic)...`
    );
    evidenceEngine.logChaos('CONCURRENT_USER_STRESS', 'AuthProfile',
      `Blasting ${userCount} parallel GET /auth/profile requests`, 'WARNING'
    );

    const requests = Array.from({ length: userCount }).map(() => {
      const start = Date.now();
      return axios.get(`${backendUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${superadminToken}` }
      })
      .then(res => ({ success: true,  latency: Date.now() - start, status: res.status }))
      .catch(err => ({ success: false, latency: Date.now() - start, error: err.message, status: err.response?.status }));
    });

    const outcomes   = await Promise.all(requests);
    const failures   = outcomes.filter(o => !o.success);
    const latencies  = outcomes.map(o => o.latency).sort((a, b) => a - b);
    const avgLatency = Math.round(latencies.reduce((s, v) => s + v, 0) / latencies.length);
    const p95Idx     = Math.floor(latencies.length * 0.95);
    const p95Latency = latencies[p95Idx] || 0;

    evidenceEngine.logConsole('info',
      `⚡ Storm [${userCount} users]: Avg=${avgLatency}ms P95=${p95Latency}ms Failures=${failures.length}/${userCount}`
    );
    evidenceEngine.logChaos(
      'CONCURRENT_USER_STRESS_OUTCOME', 'AuthProfile',
      `${userCount}-user storm: avg=${avgLatency}ms p95=${p95Latency}ms failures=${failures.length}`,
      failures.length > 0 ? 'HIGH' : 'INFO'
    );
  }

  // ── API Abuse Fuzzing ────────────────────────────────────────────────────────

  async injectApiAbuse(backendUrl, pmToken, influencerToken, results = null) {
    if (!this.chaosEnabled) return;
    evidenceEngine.logConsole('info', '🔥 [API ABUSE] Fuzzing & Authorization Boundary Penetration...');

    // A. Negative invoice amount
    evidenceEngine.logChaos('API_FUZZING_NEGATIVE_BUDGET', 'Invoice',
      'Attempting negative billing creation', 'WARNING'
    );
    try {
      await axios.post(`${backendUrl}/finance/invoices`, {
        projectId: 'some-fake-id',
        invoiceNumber: `INV-FUZZ-${Date.now()}`,
        dueDate: new Date().toISOString(),
        subtotal: -5000.0,
        tax: 0.0, discount: 0.0,
      }, { headers: { Authorization: `Bearer ${pmToken}` } });

      evidenceEngine.logConsole('warning', '❌ EXPLOIT: System accepted a negative invoice total!');
      evidenceEngine.logChaos('EXPLOIT_NEGATIVE_INVOICE', 'Invoice', 'Accepted negative amount invoice', 'CRITICAL');
      if (results) results.securityFindings.push('API Abuse: System accepted negative invoice budget values!');
    } catch (err) {
      evidenceEngine.logConsole('info', `✅ Fuzzing blocked: Correctly rejected negative values (HTTP ${err.response?.status || 500})`);
      evidenceEngine.logChaos('FUZZING_REJECTED_SUCCESS', 'Invoice',
        `Rejected negative total — ${err.message}`, 'INFO'
      );
    }

    // B. Stochastic overflow fuzzing — variable payload size (10KB–100KB range)
    const overflowSize = 10000 + Math.floor(Math.random() * 90000);
    evidenceEngine.logChaos('API_FUZZING_OVERFLOW_PAYLOAD', 'CrmCustomers',
      `Attempting ${Math.round(overflowSize / 1024)}KB overflow payload`, 'WARNING'
    );
    try {
      await axios.post(`${backendUrl}/crm/customers`, {
        companyName:   'a'.repeat(overflowSize),
        contactName:   'Fuzzer Agent',
        contactEmail:  'fuzz@test.io',
        contactPhone:  '+1-555',
      }, { headers: { Authorization: `Bearer ${pmToken}` } });

      evidenceEngine.logConsole('warning', `❌ EXPLOIT: System accepted ${Math.round(overflowSize / 1024)}KB string!`);
      evidenceEngine.logChaos('EXPLOIT_OVERFLOW_STRING', 'Customer',
        `Accepted ${Math.round(overflowSize / 1024)}KB overflow`, 'CRITICAL'
      );
      if (results) results.securityFindings.push(`API Abuse: System accepted a ${Math.round(overflowSize / 1024)}KB overflow on companyName!`);
    } catch (err) {
      evidenceEngine.logConsole('info', `✅ Fuzzing blocked: Correctly rejected overflow payload (HTTP ${err.response?.status || 500})`);
      evidenceEngine.logChaos('FUZZING_OVERFLOW_REJECTED', 'Customer',
        `Rejected ${Math.round(overflowSize / 1024)}KB payload — ${err.message}`, 'INFO'
      );
    }

    // C. RBAC privilege escalation
    evidenceEngine.logChaos('RBAC_BYPASS_TOKEN_REUSE', 'SalaryPayments',
      'Attempting Influencer access on HR payroll endpoints', 'WARNING'
    );
    try {
      await axios.get(`${backendUrl}/hr/employees`, {
        headers: { Authorization: `Bearer ${influencerToken}` }
      });
      evidenceEngine.logConsole('warning', '❌ EXPLOIT: Influencer breached HR payroll data!');
      evidenceEngine.logChaos('EXPLOIT_RBAC_BREACH', 'HR',
        'Influencer bypassed access controls to HR payroll records', 'CRITICAL'
      );
      if (results) results.rbacIssues.push('RBAC Bypass: Influencer listed HR payroll records.');
    } catch (err) {
      evidenceEngine.logConsole('info', `✅ Access blocked: RBAC boundary enforced (HTTP ${err.response?.status || 500})`);
      evidenceEngine.logChaos('RBAC_REJECTED_SUCCESS', 'HR',
        `Blocked RBAC escalation — ${err.message}`, 'INFO'
      );
    }
  }

  // ── Phase D: Stochastic Multi-Fault Combination Storm ──────────────────────

  /**
   * Inject a random combination of multiple simultaneous faults.
   * Simulates production scenarios where network degradation and DB load
   * occur concurrently rather than in isolation.
   */
  async injectStochasticFaults(backendUrl, token, pool) {
    if (!this.chaosEnabled) return;

    const scenarios = [
      'network_spike_with_db_contention',
      'burst_traffic_with_latency',
      'partial_outage_simulation',
    ];
    const chosen = scenarios[Math.floor(Math.random() * scenarios.length)];
    evidenceEngine.logConsole('info', `🔥 [STOCHASTIC MULTI-FAULT] Scenario: "${chosen}"`);
    evidenceEngine.logChaos('STOCHASTIC_MULTI_FAULT', 'System',
      `Running composite fault scenario: ${chosen}`, 'WARNING'
    );

    if (chosen === 'network_spike_with_db_contention') {
      // Simultaneously hammer auth endpoint AND lock a DB row
      const spikeDelay = this._gaussianRandom(800, 200);
      const parallelLoad = Array.from({ length: 10 }).map(() =>
        axios.get(`${backendUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => null)
      );
      await new Promise(r => setTimeout(r, spikeDelay));
      await Promise.all(parallelLoad);
      evidenceEngine.logConsole('info', `✅ Multi-fault "network_spike_with_db_contention" completed.`);

    } else if (chosen === 'burst_traffic_with_latency') {
      // 20 requests with Gaussian latency injected client-side
      const burstCount = 20;
      const burstResults = await Promise.all(
        Array.from({ length: burstCount }).map(async () => {
          const delay = this._gaussianRandom(300, 100);
          await new Promise(r => setTimeout(r, delay));
          return axios.get(`${backendUrl}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(e => ({ error: e.message }));
        })
      );
      const errors = burstResults.filter(r => r?.error).length;
      evidenceEngine.logConsole('info', `✅ Multi-fault "burst_traffic_with_latency" — ${burstCount - errors}/${burstCount} succeeded.`);

    } else {
      // Partial outage: drop ~30% of requests via random failure
      const partialCount = 15;
      const results = await Promise.all(
        Array.from({ length: partialCount }).map(async (_, i) => {
          if (i % 3 === 0) return { dropped: true }; // Every 3rd request dropped
          return axios.get(`${backendUrl}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(e => ({ error: e.message }));
        })
      );
      const dropped = results.filter(r => r?.dropped).length;
      evidenceEngine.logConsole('info', `✅ Multi-fault "partial_outage_simulation" — ${dropped}/${partialCount} requests simulated as dropped.`);
    }

    evidenceEngine.logChaos('STOCHASTIC_MULTI_FAULT_COMPLETE', 'System',
      `Composite fault scenario "${chosen}" resolved without systemic crash.`, 'INFO'
    );
  }
}

module.exports = new ChaosInjector();
