import minimist from 'minimist';

const apps = ['blocks'];

async function run() {
  const { app } = minimist<{
    app?: string;
  }>(process.argv.slice(2));

  if (app) {
    const { run } = require(`./apps/${app}`);
    await run();
  } else {
    await Promise.all(apps.map(name => require(`./apps/${name}`).run));
  }
}

run();
