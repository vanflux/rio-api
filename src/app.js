const Client = require('./client/client');
const examples = require('./examples/index');
const utils = require('./utils');

//    id format:  'xxxxxxxxxxxxxxxxx'
const steamId64 = null; // String

async function start() {
  console.log('Server infos example');
  await examples.serverInfos();

  if (steamId64 == null) return console.log('You havent entered your steamId64. Go to src/app.js and put your id');


  console.log('Waiting 3 seconds... User infos example');
  await utils.sleep(3000); // Wait 3 seconds because the api has a limiter (too many requests)

  
  // Get user infos example (you can get steamId64 using steam username and maybe implement a discord bot for monitoring this infos)
  await examples.userInfos(steamId64);
}


start();