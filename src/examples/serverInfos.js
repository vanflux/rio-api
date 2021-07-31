const Client = require('../client/client');

module.exports = async function serverInfos() {
  let response; // temp var

  let client = new Client();

  response = await client.getServerList();
  if (response.hasError) return console.error('Error on getServerList', response.data);

  let bestServer = getBestServer(client);

  console.log('-------------------');

  console.log('Players in game: ' + playersCount(client));
  console.log('Best server: ' + bestServer.id + ' (' + bestServer.current_player_count + '/' + bestServer.max_player_count + ')');

  console.log('-------------------');
}

function playersCount(client) {
  return client.serverList.reduce((a, b) => a + b.current_player_count, 0);
}

function getBestServer(client) {
  let filteredServers = client.serverList
    .filter(server => server.current_player_count < server.max_player_count)
    .sort((a,b) => b.current_player_count - a.current_player_count);
  if (filteredServers.length === 0) return null;
  let server = filteredServers[0];
  return server;
}