require('dotenv').config();

import minimist from 'minimist';

async function run() {
  const { app } = minimist<{
    app?: string;
  }>(process.argv.slice(2));

  let apps: string[] = ['blocks'];
  const logger = {
    verbose: console.log,
    log: console.log,
    error: console.error
  };

  if (app) {
    apps = [app];
  }

  await Promise.all(
    apps.map(name =>
      require(`./apps/${name}`).run({
        app: name,
        logger
      })
    )
  );
}

run();
