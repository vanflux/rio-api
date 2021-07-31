const Client = require('../client/client');

module.exports = async function serverInfos(steamId64) {
  if (steamId64 == null) return console.error('SteamId64 needed for this example');

  let response; // temp var

  let client = new Client(steamId64);

  response = await client.loadData();
  if (response.hasError) return console.error('Error on loadData', response.data);
  
  console.log('- Player Kills: ' + client.userData.player_kills);
  console.log('- Player Deaths: ' + client.userData.player_deaths);
  console.log('- Player K/D: ' + client.userData.kill_death_ratio);
  console.log('- Best Survivor Time: ' + client.userData.best_survivor_time);
  console.log('- Experience: ' + client.userData.experience);
  console.log('- Gold: ' + client.userData.gold);
  console.log('- Money: ' + client.userData.money);
  console.log('- Time Played: ' + client.userData.time_played);
  console.log('');
  console.log('Characters(' + client.getCharacters().length + '): ' + client.getCharacters().map(x => x.name).join(', '));
  
}