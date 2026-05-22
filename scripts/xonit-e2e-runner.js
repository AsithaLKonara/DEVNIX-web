/**
 * Xonit Space E2E Integration Runner Wrapper
 * 
 * This file serves as a backward-compatible wrapper that delegates
 * E2E integration test execution directly to the new modular
 * QA Operating System (QA-OS) orchestrator.
 */

const { bootstrap } = require('./qa-os/index');

bootstrap().catch(err => {
  console.error(`[E2E-VALIDATOR] Wrapper error during bootstrapping: ${err.stack || err}`);
  process.exit(1);
});
