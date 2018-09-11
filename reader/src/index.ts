require('dotenv').config();

import minimist from 'minimist';

async function run() {
  const { app } = minimist<{
    app?: string;
  }>(process.argv.slice(2));

  let apps: string[] = [
    'blocks',
    'transactions',
    'transaction-traces',
    'pub-keys',
    'block-states',
    'action-traces'
  ];
  const logger = {
    verbose: console.log,
    log: console.log,
    error: console.error
  };

  if (app) {
    apps = [app];
  }

  for (let name of apps) {
    logger.verbose('run ' + name);
    await require(`./apps/${name}`).run({
      app: name,
      logger
    });
  }
}

run();
