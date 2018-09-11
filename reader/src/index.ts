require('dotenv').config();

import minimist from 'minimist';

const apps = ['blocks'];

async function run() {
  const { app } = minimist<{
    app?: string;
  }>(process.argv.slice(2));

  try {
    if (app) {
      const { run } = require(`./apps/${app}`);
      await run();
    } else {
      await Promise.all(apps.map(name => require(`./apps/${name}`).run));
    }
  } catch (e) {
    console.error('ERROR:', e);
    process.exit(-1);
  }
}

run();
