const Client = require('../client/client');

module.exports = async function serverInfos() {
  let response; // temp var

  let client = new Client();

  response = await client.loadServerList();
  if (response.hasError) return console.error('Error on loadServerList', response.data);

  let count = 5;
  let bestServers = getBestServers(client.serverList, count);

  console.log('-------------------');

  console.log('Players in game: ' + playersCount(client.serverList));
  console.log('Best servers (' + bestServers.length + '):');
  console.log(bestServers.map(server => '- ' + server.id + ' (' + server.currentPlayerCount + '/' + server.maxPlayerCount + ')').join('\n'));

  console.log('-------------------');
}

function playersCount(serverList) {
  return serverList.servers.reduce((a, b) => a + b.currentPlayerCount, 0);
}

function getBestServers(serverList, count=1) {
  let filteredServers = serverList.servers
    .filter(server => server.currentPlayerCount < server.maxPlayerCount)
    .sort((a,b) => b.currentPlayerCount - a.currentPlayerCount);
  
  if (filteredServers.length > count) filteredServers.length = count;
  return filteredServers;
}