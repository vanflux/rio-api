const Client = require("../client/client");
const utils = require("../utils");

module.exports = async function serverListMonitor() {
  let client = new Client();

  let formatServer = server => (
    server.id + 
    ' (' + server.currentPlayerCount + '/' + server.maxPlayerCount + ')\t' + 
    server.address + 
    '\tplayerHistory: [' + server.playersHistory.map(x => x.value).join(',') + ']'
  );

  client.serverList.on('new server',    server => {
    console.log('[New Server]    ' + formatServer(server));
  });
  client.serverList.on('update server', server => {
    console.log('[Update Server] ' + formatServer(server));
  });
  client.serverList.on('remove server', server => {
    console.log('[Remove Server] ' + formatServer(server));
  });

  let response = await client.loadServerList();
  if (response.hasError) console.error(response.data);
  setInterval(async () => {
    console.log('Updating...');
    let response = await client.loadServerList();
    if (response.hasError) console.error(response.data);
  }, 5000);
}