require('dotenv').config();
import minimist from 'minimist';

import { run as actionTraces } from './apps/action-traces';
import { run as blockStates } from './apps/block-states';
import { run as blocks } from './apps/blocks';
import { run as pubKeys } from './apps/pub-keys';
import { run as transactionTraces } from './apps/transaction-traces';
import { run as transactions } from './apps/transactions';

async function run() {
  const { app } = minimist<{
    app?: string;
  }>(process.argv.slice(2));

  let appsMap = {
    blocks: blocks,
    transactions: transactions,
    'transaction-traces': transactionTraces,
    'pub-keys': pubKeys,
    'block-states': blockStates,
    'action-traces': actionTraces
  };

  let apps = [];

  const logger = {
    verbose: (..._: any[]) => {},
    log: (..._: any[]) => {},
    error: (..._: any[]) => {}
  };

  if (app) {
    apps = [app];
  } else {
    apps = Object.keys(appsMap);
  }

  for (let name of apps) {
    logger.verbose('run ' + name);
    await appsMap[name]({
      app: name,
      logger
    });
  }
}

run();
