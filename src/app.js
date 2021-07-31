const Client = require('./client/client');
const examples = require('./examples/index');

//     id format: 'xxxxxxxxxxxxxxxxx'
const steamId64 = null; // String

async function start() {
  // Server infos
  //await examples.serverInfos();

  // User infos
  //await examples.userInfos(steamId64);

  // Server list monitor
  await examples.serverListMonitor();
}


start();