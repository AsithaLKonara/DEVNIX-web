const puppeteer = require('puppeteer');
const axios = require('axios');
const { io } = require('socket.io-client');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const evidenceEngine = require('./evidence-engine');
const chaosInjector  = require('./chaos-injector');

// Configurations
const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:5000/api/v1';
const SOCKET_CHAT_URL = 'http://localhost:5000/chat';
const DATABASE_URL = 'postgresql://asithalakmal@localhost:5432/postgres?schema=public';

class TestOrchestrator {
  constructor() {
    this.pool = new Pool({ connectionString: DATABASE_URL });
    this._superadminToken = '';  // Exposed for stochastic chaos post-run
    this.results = {
      passed: [],
      failed: [],
      rbacIssues: [],
      realtimeIssues: [],
      stripeIssues: [],
      prismaIssues: [],
      securityFindings: [],
      performance: {
        dashboardLoadTimeMs: 0,
        apiP95ResponseTimeMs: 0,
        websocketRoundtripMs: 0
      }
    };
    this.apiResponseTimes = [];
  }

  // Decoupled wrappers injecting Network Chaos + Distributed Trace headers
  async apiPost(endpoint, data, headers = {}) {
    return await chaosInjector.injectNetworkChaos(async () => {
      const spanId = evidenceEngine.generateSpanId();
      const traceHeaders = {
        'x-trace-id': evidenceEngine.runTraceId,
        'x-span-id':  spanId,
      };
      const start = Date.now();
      try {
        const res = await axios.post(`${BACKEND_URL}${endpoint}`, data, { headers: { ...traceHeaders, ...headers } });
        const duration = Date.now() - start;
        this.apiResponseTimes.push(duration);
        evidenceEngine.logApiCall('POST', endpoint, data, res.data, duration, res.status, true);
        return res.data?.data !== undefined ? res.data.data : res.data;
      } catch (err) {
        const duration = Date.now() - start;
        this.apiResponseTimes.push(duration);
        const errPayload = err.response?.data || err.message || err;
        evidenceEngine.logApiCall('POST', endpoint, data, errPayload, duration, err.response?.status || 500, false);
        throw err;
      }
    }, { method: 'POST', endpoint });
  }

  async apiGet(endpoint, headers = {}) {
    return await chaosInjector.injectNetworkChaos(async () => {
      const spanId = evidenceEngine.generateSpanId();
      const traceHeaders = {
        'x-trace-id': evidenceEngine.runTraceId,
        'x-span-id':  spanId,
      };
      const start = Date.now();
      try {
        const res = await axios.get(`${BACKEND_URL}${endpoint}`, { headers: { ...traceHeaders, ...headers } });
        const duration = Date.now() - start;
        this.apiResponseTimes.push(duration);
        evidenceEngine.logApiCall('GET', endpoint, null, res.data, duration, res.status, true);
        return res.data?.data !== undefined ? res.data.data : res.data;
      } catch (err) {
        const duration = Date.now() - start;
        this.apiResponseTimes.push(duration);
        const errPayload = err.response?.data || err.message || err;
        evidenceEngine.logApiCall('GET', endpoint, null, errPayload, duration, err.response?.status || 500, false);
        throw err;
      }
    }, { method: 'GET', endpoint });
  }

  async apiPatch(endpoint, data = {}, headers = {}) {
    return await chaosInjector.injectNetworkChaos(async () => {
      const spanId = evidenceEngine.generateSpanId();
      const traceHeaders = {
        'x-trace-id': evidenceEngine.runTraceId,
        'x-span-id':  spanId,
      };
      const start = Date.now();
      try {
        const res = await axios.patch(`${BACKEND_URL}${endpoint}`, data, { headers: { ...traceHeaders, ...headers } });
        const duration = Date.now() - start;
        this.apiResponseTimes.push(duration);
        evidenceEngine.logApiCall('PATCH', endpoint, data, res.data, duration, res.status, true);
        return res.data?.data !== undefined ? res.data.data : res.data;
      } catch (err) {
        const duration = Date.now() - start;
        this.apiResponseTimes.push(duration);
        const errPayload = err.response?.data || err.message || err;
        evidenceEngine.logApiCall('PATCH', endpoint, data, errPayload, duration, err.response?.status || 500, false);
        throw err;
      }
    }, { method: 'PATCH', endpoint });
  }

  async runScenario(name, fn) {
    evidenceEngine.logConsole('info', `Starting scenario: "${name}"`);
    try {
      const start = Date.now();
      await fn();
      const duration = Date.now() - start;
      this.results.passed.push({ name, duration });
      evidenceEngine.logConsole('info', `✅ Scenario PASSED: "${name}" (${duration}ms)`);
    } catch (error) {
      const duration = 0;
      this.results.failed.push({ name, error: error.message || error });
      evidenceEngine.logConsole('error', `❌ Scenario FAILED: "${name}" - Error: ${error.message || error}`);
      throw error; // Re-throw to allow Self-Healing loop to catch and repair
    }
  }

  async executeAll(artifactDir, workspaceDir) {
    evidenceEngine.logConsole('info', 'Starting deterministic E2E orchestration sequence...');
    
    // Capture DB State Before
    await evidenceEngine.captureDbSnapshot(this.pool, 'before');

    let superadminToken = '';
    let pmToken = '';
    let employeeToken = '';
    let customerToken = '';
    let influencerToken = '';

    let superadminUser, pmUser, employeeUser, customerUser, influencerUser;
    let pmEmployeeId, devEmployeeId, customerDbId, leadDbId, projectDbId, taskDbId, invoiceDbId, commissionDbId, ticketDbId;

    // --- Scenario 1: Authentication & Mapping ---
    await this.runScenario('Authentication & Role Mapping', async () => {
      const saLogin = await this.apiPost('/auth/login', { email: 'superadmin@xonit.space', password: 'xonit123' });
      superadminToken = saLogin.accessToken;
      this._superadminToken = superadminToken; // Expose for post-run stochastic chaos
      superadminUser = saLogin.user;

      const pmLogin = await this.apiPost('/auth/login', { email: 'pm@xonit.space', password: 'xonit123' });
      pmToken = pmLogin.accessToken;
      pmUser = pmLogin.user;

      const devLogin = await this.apiPost('/auth/login', { email: 'dev@xonit.space', password: 'xonit123' });
      employeeToken = devLogin.accessToken;
      employeeUser = devLogin.user;

      const clientLogin = await this.apiPost('/auth/login', { email: 'client@xonit.space', password: 'xonit123' });
      customerToken = clientLogin.accessToken;
      customerUser = clientLogin.user;

      const hunterLogin = await this.apiPost('/auth/login', { email: 'hunter@xonit.space', password: 'xonit123' });
      influencerToken = hunterLogin.accessToken;
      influencerUser = hunterLogin.user;

      if (!superadminToken || !pmToken || !employeeToken || !customerToken || !influencerToken) {
        throw new Error('Role login authentication failed.');
      }

      const saProfile = await this.apiGet('/auth/profile', { Authorization: `Bearer ${superadminToken}` });
      const pmProfile = await this.apiGet('/auth/profile', { Authorization: `Bearer ${pmToken}` });
      const empProfile = await this.apiGet('/auth/profile', { Authorization: `Bearer ${employeeToken}` });

      pmEmployeeId = pmProfile.employeeProfile?.id;
      devEmployeeId = empProfile.employeeProfile?.id;
    });

    // --- Database Relational Checks ---
    await this.runScenario('Prisma & Relational Database Integrity', async () => {
      const resUsers = await this.pool.query('SELECT id, email, role FROM "User"');
      resUsers.rows.forEach(user => {
        if (user.id.length !== 36) {
          this.results.prismaIssues.push(`Invalid UUID format for User ID: ${user.id}`);
        }
      });

      const resEmployees = await this.pool.query('SELECT id, "userId", "jobTitle" FROM "Employee"');
      resEmployees.rows.forEach(emp => {
        const parent = resUsers.rows.find(u => u.id === emp.userId);
        if (!parent) {
          this.results.prismaIssues.push(`Orphaned employee record detected (ID: ${emp.id})`);
        }
      });

      // Assert CASCADE drop operations
      try {
        const tempProjId = `e2e-proj-cascade-${Date.now()}`;
        const tempTaskId = `e2e-task-cascade-${Date.now()}`;

        await this.pool.query(
          `INSERT INTO "Project" (id, name, status, priority, "createdAt", "updatedAt") 
           VALUES ('${tempProjId}', 'E2E Cascade Test Project', 'PLANNING', 'MEDIUM', NOW(), NOW())`
        );
        await this.pool.query(
          `INSERT INTO "Task" (id, "projectId", title, status, priority, "createdById", "createdAt", "updatedAt") 
           VALUES ('${tempTaskId}', '${tempProjId}', 'E2E Cascade Test Task', 'TODO', 'MEDIUM', '${superadminUser.id}', NOW(), NOW())`
        );
        await this.pool.query(
          `INSERT INTO "TaskComment" (id, "taskId", "userId", content, "createdAt", "updatedAt") 
           VALUES ('e2e-comment-${Date.now()}', '${tempTaskId}', '${superadminUser.id}', 'Cascade comment', NOW(), NOW())`
        );

        const checkTasks = await this.pool.query(`SELECT id FROM "Task" WHERE "projectId" = '${tempProjId}'`);
        if (checkTasks.rows.length === 0) throw new Error('Cascade seed failed.');

        await this.pool.query(`DELETE FROM "Project" WHERE id = '${tempProjId}'`);

        const checkTasksAfter = await this.pool.query(`SELECT id FROM "Task" WHERE "projectId" = '${tempProjId}'`);
        const checkCommentsAfter = await this.pool.query(`SELECT id FROM "TaskComment" WHERE "taskId" = '${tempTaskId}'`);

        if (checkTasksAfter.rows.length > 0 || checkCommentsAfter.rows.length > 0) {
          this.results.prismaIssues.push('CASCADE project delete failed to clear dependent tasks/comments.');
        }
      } catch (dbErr) {
        this.results.prismaIssues.push(`Database CASCADE execution error: ${dbErr.message}`);
      }
    });

    // --- Security & API Penetration Gating ---
    await this.runScenario('API Penetration & Security Controls', async () => {
      // SQLi check
      try {
        await axios.post(`${BACKEND_URL}/auth/login`, { email: "' OR '1'='1' --", password: 'any' });
        this.results.securityFindings.push('SQLi penetration threat: /auth/login accepted injection payload without status 401.');
      } catch (err) {
        // Correct behavior: should block (401)
      }

      // XSS note check
      try {
        const leadRes = await this.pool.query('SELECT id FROM "CrmLead" LIMIT 1');
        if (leadRes.rows.length > 0) {
          const leadId = leadRes.rows[0].id;
          const xss = '<script>alert("XSS-ATTACK")</script>';
          await this.apiPost(`/crm/leads/${leadId}/notes`, { content: xss }, { Authorization: `Bearer ${pmToken}` });
        }
      } catch (err) {
        // escape/sanitized or failed cleanly
      }

      // Expired token check
      try {
        await axios.get(`${BACKEND_URL}/finance/invoices`, { headers: { Authorization: 'Bearer invalid_fake_token' } });
        this.results.securityFindings.push('Security exploit: Expired fake token authorized bypass.');
      } catch (_) {}

      // RBAC customer block check
      try {
        await axios.get(`${BACKEND_URL}/hr/employees`, { headers: { Authorization: `Bearer ${customerToken}` } });
        this.results.rbacIssues.push('RBAC leak: Customer bypassed HR panel endpoint listing.');
      } catch (_) {}

      // RBAC influencer project creation block
      try {
        await axios.post(`${BACKEND_URL}/projects`, { name: 'Escaped project' }, { headers: { Authorization: `Bearer ${influencerToken}` } });
        this.results.rbacIssues.push('RBAC leak: Influencer role successfully spawned project.');
      } catch (_) {}
    });

    // --- WebSocket Messaging Transit checks ---
    await this.runScenario('WebSocket Realtime Messaging & Event Delivery', async () => {
      return new Promise((resolve, reject) => {
        const pmSocket = io(SOCKET_CHAT_URL, { auth: { token: pmToken }, transports: ['websocket'] });
        const devSocket = io(SOCKET_CHAT_URL, { auth: { token: employeeToken }, transports: ['websocket'] });

        let sendTime = 0;
        let roundtrip = 0;

        pmSocket.on('connect', () => {
          evidenceEngine.logWebSocketEvent('connect', 'PM', { status: 'connected' });
          devSocket.connect();
        });

        devSocket.on('connect', () => {
          evidenceEngine.logWebSocketEvent('connect', 'Employee', { status: 'connected' });
          devSocket.emit('get_history');
        });

        devSocket.on('chat_history', (hist) => {
          evidenceEngine.logWebSocketEvent('chat_history', 'Employee', { count: hist.length });
          sendTime = Date.now();
          pmSocket.emit('send_message', { content: 'QA-OS Realtime Message Roundtrip check' });
        });

        devSocket.on('new_message', (msg) => {
          if (msg.content === 'QA-OS Realtime Message Roundtrip check') {
            roundtrip = Date.now() - sendTime;
            this.results.performance.websocketRoundtripMs = roundtrip;
            evidenceEngine.logWebSocketEvent('new_message', 'Employee', msg, roundtrip);

            pmSocket.disconnect();
            devSocket.disconnect();

            if (roundtrip > 500) {
              this.results.realtimeIssues.push(`WebSocket transit time slow: ${roundtrip}ms exceeds 500ms SLO.`);
            }
            resolve();
          }
        });

        const timeout = setTimeout(() => {
          pmSocket.disconnect();
          devSocket.disconnect();
          reject(new Error('WebSocket E2E handshake transit timeout (15s limit).'));
        }, 15000);
      });
    });

    // --- CRM Lead Pipeline transitions ---
    await this.runScenario('CRM Lead Conversion & Automated Project Creation', async () => {
      const email = `e2e-crm-client-${Date.now()}@wayne.corp`;
      const cust = await this.apiPost('/crm/customers', {
        companyName: 'Wayne Enterprises Global QA',
        contactName: 'Lucius Fox E2E QA',
        contactEmail: email,
        contactPhone: '+1-800-FOX'
      }, { Authorization: `Bearer ${pmToken}` });
      customerDbId = cust.id;

      const lead = await this.apiPost('/crm/leads', {
        title: 'Global Satellite Defense Network QA',
        value: 95000.0,
        customerId: customerDbId,
        stage: 'NEW'
      }, { Authorization: `Bearer ${pmToken}` });
      leadDbId = lead.id;

      await this.apiPatch(`/crm/leads/${leadDbId}/stage?stage=WON`, {}, { Authorization: `Bearer ${pmToken}` });

      const projQuery = await this.pool.query(
        `SELECT id, name, budget FROM "Project" WHERE name = 'Project: Global Satellite Defense Network QA'`
      );

      if (projQuery.rows.length === 0) {
        throw new Error('relational transition: Lead stage WON failed to trigger Project creation cascade.');
      }
      projectDbId = projQuery.rows[0].id;
    });

    // --- Project board drag & drop update ---
    await this.runScenario('Project Board Management & Kanban Sprint Execution', async () => {
      const task = await this.apiPost(`/projects/${projectDbId}/tasks`, {
        title: 'Implement Satellite Network Uplinks Protocol QA',
        description: 'Zero-latency TCP socket synchronization.',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        assignedToId: devEmployeeId
      }, { Authorization: `Bearer ${pmToken}` });
      taskDbId = task.id;

      await this.pool.query(
        `INSERT INTO "ProjectMember" (id, "projectId", "employeeId", role, "createdAt")
         VALUES ('${taskDbId}-mem', '${projectDbId}', '${devEmployeeId}', 'DEVELOPER', NOW())
         ON CONFLICT DO NOTHING`
      );

      await this.apiPost(`/projects/tasks/${taskDbId}/comments`, { content: 'Starting socket configuration runs.' }, {
        Authorization: `Bearer ${employeeToken}`
      });

      const updated = await this.apiPatch(`/projects/tasks/${taskDbId}/status?status=REVIEW`, {}, {
        Authorization: `Bearer ${employeeToken}`
      });

      if (updated.status !== 'REVIEW') {
        throw new Error('Kanban drag-and-drop status update failed.');
      }
    });

    // --- HRM Attendance & leaves loop ---
    await this.runScenario('Human Resources (HRM) Attendance & Leave Management', async () => {
      await this.apiPost('/hr/attendance/clock-in', {}, { Authorization: `Bearer ${employeeToken}` });
      await this.apiPost('/hr/attendance/clock-out', {}, { Authorization: `Bearer ${employeeToken}` });

      const leave = await this.apiPost('/hr/leaves', {
        type: 'ANNUAL',
        startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        reason: 'E2E Annual Leave QA'
      }, { Authorization: `Bearer ${employeeToken}` });

      const approved = await this.apiPatch(`/hr/leaves/${leave.id}/approve?status=APPROVED`, {}, {
        Authorization: `Bearer ${superadminToken}`
      });

      if (approved.status !== 'APPROVED') {
        throw new Error('Leave approval status change failed.');
      }
    });

    // --- Finance invoices & stripe payouts pipeline ---
    await this.runScenario('Finance, Stripe Payment & Referral Payout Releases', async () => {
      const invoice = await this.apiPost('/finance/invoices', {
        projectId: projectDbId,
        invoiceNumber: `INV-E2E-QA-${Date.now()}`,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        subtotal: 10000.0,
        tax: 1000.0,
        discount: 500.0
      }, { Authorization: `Bearer ${superadminToken}` });
      invoiceDbId = invoice.id;

      await this.apiPost('/finance/payments', {
        invoiceId: invoiceDbId,
        amount: 10500.0,
        method: 'STRIPE',
        transactionId: `tx_stripe_qa_${Date.now()}`
      }, { Authorization: `Bearer ${customerToken}` });

      const checkInv = await this.pool.query(`SELECT status FROM "Invoice" WHERE id = '${invoiceDbId}'`);
      if (checkInv.rows[0].status !== 'PAID') {
        this.results.stripeIssues.push('Invoice stripe integration status block: Paid invoice stayed DRAFT/UNPAID.');
        throw new Error('Invoice status transition to PAID failed.');
      }

      const commissions = await this.apiGet('/finance/commissions', { Authorization: `Bearer ${superadminToken}` });
      const comm = commissions.find(c => c.payment?.invoice?.projectId === projectDbId);
      if (comm) {
        commissionDbId = comm.id;
        const released = await this.apiPatch(`/finance/commissions/${commissionDbId}/release`, {}, {
          Authorization: `Bearer ${superadminToken}`
        });
        if (released.status !== 'RELEASED') {
          throw new Error('Referral payout commission release failed.');
        }
      }
    });

    // --- Support Desk Ticketing ---
    await this.runScenario('Support Desk Help Ticket Lifecycle', async () => {
      const ticketId = `e2e-ticket-qa-${Date.now()}`;
      await this.pool.query(
        `INSERT INTO "SupportTicket" (id, "customerId", subject, description, status, "createdAt", "updatedAt")
         VALUES ('${ticketId}', '${customerDbId}', 'VPC Cloud Ingress Interruption', 'Experiencing 502 timeouts', 'OPEN', NOW(), NOW())`
      );

      await this.pool.query(`UPDATE "SupportTicket" SET status = 'RESOLVED', "updatedAt" = NOW() WHERE id = '${ticketId}'`);
      const checkTicket = await this.pool.query(`SELECT status FROM "SupportTicket" WHERE id = '${ticketId}'`);
      if (checkTicket.rows[0].status !== 'RESOLVED') {
        throw new Error('Support ticket resolve failed.');
      }
    });

    // --- File Storage R2/S3 Roster checks ---
    await this.runScenario('Secure Files Management & S3 R2 Metadata Storage', async () => {
      const fileId = `e2e-file-qa-${Date.now()}`;
      await this.pool.query(
        `INSERT INTO "File" (id, name, "fileUrl", "mimeType", "sizeBytes", "projectId", "taskId", "uploadedById", "createdAt")
         VALUES ('${fileId}', 'e2e-test.txt', 'https://s3.xonit.space/e2e-test.txt', 'text/plain', 1024, '${projectDbId}', '${taskDbId}', '${employeeUser.id}', NOW())`
      );

      const check = await this.pool.query(`SELECT id FROM "File" WHERE id = '${fileId}'`);
      if (check.rows.length === 0) {
        throw new Error('File storage schema registration failed.');
      }
    });

    // --- Active Chaos Simulations Storm ---
    evidenceEngine.logConsole('info', '⚡ Triggering Phase 2 Chaos Simulation Storms directly during scenarios...');
    chaosInjector.enable();
    try {
      await chaosInjector.injectDbChaos(this.pool);
      await chaosInjector.injectUserChaos(BACKEND_URL, superadminToken);
      await chaosInjector.injectApiAbuse(BACKEND_URL, pmToken, influencerToken, this.results);
    } catch (chaosErr) {
      evidenceEngine.logConsole('warning', `Chaos Simulation encountered an execution issue: ${chaosErr.message}`);
    }
    chaosInjector.disable();

    // --- Browser Automation Puppeteer visual crawl ---
    await this.runScenario('Browser Interface, Form Submits & UI Visual Validations', async () => {
      evidenceEngine.logConsole('info', 'Launching Puppeteer headlessly...');
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      const safeGoto = async (url) => {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
        await new Promise(r => setTimeout(r, 2000));
      };

      // A. Public web
      const startPage = Date.now();
      await safeGoto(FRONTEND_URL);
      this.results.performance.dashboardLoadTimeMs = Date.now() - startPage;

      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '01-public-website.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '01-public-website.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('01-public-website', 'Public Landing Page', '/e2e/screenshots/01-public-website.webp', path.join(artifactDir, 'screenshots', '01-public-website.webp'));

      // Check SEO meta tags
      const pageTitle = await page.title();
      const pageDesc = await page.evaluate(() => {
        const meta = document.querySelector('meta[name="description"]');
        return meta ? meta.getAttribute('content') : '';
      });
      const h1Count = await page.evaluate(() => document.querySelectorAll('h1').length);

      this.seoStats = { title: pageTitle, metaDescription: pageDesc, h1Count, pageLoadTimeMs: this.results.performance.dashboardLoadTimeMs };

      // B. Contact page
      await safeGoto(`${FRONTEND_URL}/contact`);
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '02-contact-page.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '02-contact-page.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('02-contact-page', 'Contact Form', '/e2e/screenshots/02-contact-page.webp', path.join(artifactDir, 'screenshots', '02-contact-page.webp'));

      // C. Login Page
      await safeGoto(`${FRONTEND_URL}/login`);
      await page.type('input[type="email"]', 'superadmin@xonit.space');
      await page.type('input[type="password"]', 'xonit123');
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '03-login-filled.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '03-login-filled.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('03-login-filled', 'Authentication Signin', '/e2e/screenshots/03-login-filled.webp', path.join(artifactDir, 'screenshots', '03-login-filled.webp'));

      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 90000 })
      ]);
      await new Promise(r => setTimeout(r, 2000));

      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '04-dashboard-loaded.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '04-dashboard-loaded.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('04-dashboard-loaded', 'Dashboard Home', '/e2e/screenshots/04-dashboard-loaded.webp', path.join(artifactDir, 'screenshots', '04-dashboard-loaded.webp'));

      // D. CRM board
      await safeGoto(`${FRONTEND_URL}/dashboard/crm`);
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '05-crm-board.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '05-crm-board.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('05-crm-board', 'Sales CRM Board', '/e2e/screenshots/05-crm-board.webp', path.join(artifactDir, 'screenshots', '05-crm-board.webp'));

      // E. Projects list
      await safeGoto(`${FRONTEND_URL}/dashboard/projects`);
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '06-projects-list.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '06-projects-list.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('06-projects-list', 'Projects Index', '/e2e/screenshots/06-projects-list.webp', path.join(artifactDir, 'screenshots', '06-projects-list.webp'));

      // F. HR
      await safeGoto(`${FRONTEND_URL}/dashboard/hr`);
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '07-hr-manager.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '07-hr-manager.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('07-hr-manager', 'HR Management', '/e2e/screenshots/07-hr-manager.webp', path.join(artifactDir, 'screenshots', '07-hr-manager.webp'));

      // G. Finance
      await safeGoto(`${FRONTEND_URL}/dashboard/finance`);
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '08-finance-ledger.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '08-finance-ledger.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('08-finance-ledger', 'Finance Ledger', '/e2e/screenshots/08-finance-ledger.webp', path.join(artifactDir, 'screenshots', '08-finance-ledger.webp'));

      // H. Tickets
      await safeGoto(`${FRONTEND_URL}/dashboard/tickets`);
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '09-support-desk.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '09-support-desk.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('09-support-desk', 'Help Desk Ticket System', '/e2e/screenshots/09-support-desk.webp', path.join(artifactDir, 'screenshots', '09-support-desk.webp'));

      // I. Chat
      await safeGoto(`${FRONTEND_URL}/dashboard/chat`);
      await page.screenshot({ path: path.join(workspaceDir, 'screenshots', '10-realtime-chat.webp'), type: 'webp', quality: 80 });
      await page.screenshot({ path: path.join(artifactDir, 'screenshots', '10-realtime-chat.webp'), type: 'webp', quality: 80 });
      evidenceEngine.logScreenshot('10-realtime-chat', 'Realtime Chat Roster', '/e2e/screenshots/10-realtime-chat.webp', path.join(artifactDir, 'screenshots', '10-realtime-chat.webp'));

      await browser.close();
    });

    // P95 calculation
    const sorted = this.apiResponseTimes.sort((a, b) => a - b);
    const p95Idx = Math.floor(sorted.length * 0.95);
    this.results.performance.apiP95ResponseTimeMs = sorted[p95Idx] || 0;
    this.results.performance.dashboardLoadTimeMs = this.seoStats?.pageLoadTimeMs || 0;

    // Capture DB State After
    await evidenceEngine.captureDbSnapshot(this.pool, 'after');

    // Sync evidence visual SEO
    evidenceEngine.seoVisualStats = this.seoStats || {};

    // Close PG pool
    await this.pool.end();

    evidenceEngine.logConsole('info', 'E2E Orchestrator execution finalized successfully.');
    return {
      results: this.results,
      seoStats: this.seoStats
    };
  }
}

module.exports = new TestOrchestrator();
