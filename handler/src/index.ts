export * from './lib/async';
export * from './lib/hash';
export * from './lib/number';

import minimist from 'minimist';

async function run() {
  const { app } = minimist<{
    app: string;
  }>(process.argv.slice(2));

  const { run } = require(`./apps/${app}`);
  await run();
}

run();
