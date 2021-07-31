const Client = require("../client/client");
const utils = require("../utils");

module.exports = async function serverListMonitor() {
  let client = new Client();
  let serverToString = server => (
    server.id + ' (' + server.currentPlayerCount + '/' + server.maxPlayerCount + ')\t' + 
    server.address + '\tplayerHistory: [' + server.playersHistory.map(x => x.value).join(',') + ']'
  );

  client.serverList.on('new server', server =>    console.log('[New Server]    ' + serverToString(server)));
  client.serverList.on('update server', server => console.log('[Update Server] ' + serverToString(server)));
  client.serverList.on('remove server', server => console.log('[Remove Server] ' + serverToString(server)));

  while(true) {
    console.log('--------------------------------------------------');
    let response = await client.loadServerList();
    if (response.hasError) {
      console.log('Error on get server list', response.data);
    }
    await utils.sleep(10000);
  }
}