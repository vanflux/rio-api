const request = require("request");
const Api = require('./api/api');
const Character = require("./character");
const SeedRandom = require('seedrandom');

const gameName = 'RioV4';
const engine = 'UE4';
const engineVer = '4.26-CL-0';
new SeedRandom()

module.exports = class Client {
  constructor (steamId64, opts) {
    if (typeof steamId64 == 'object') {
      opts = steamId64;
      steamId64 = null;
    }

    this.steamId = steamId64;

    let random = new SeedRandom(this.steamId ? this.steamId : Math.random());

    const winVer = random.quick() > 0.2 ? '10.0' : (random.quick() > 0.5 ? '8.0' : '8.1');
    const winBuild = 10000 + Math.floor(random.quick() * 89999);
    const rnd = 100 + Math.floor(random.quick() * 199);
    const arch = random.quick() > 0.9 ? 32 : 64;
    const os = `Windows/${winVer}.${winBuild}.0.${rnd}.${arch}bit`;
    const randomUserAgent = `${gameName}/++${engine}+Release-${engineVer} ${os}`;

    // Get random user agent for make the api calls

    this.opts = Object.assign({}, opts);
    this.request = this.opts.request ? this.opts.request : request.defaults({});
    this.api = new Api(this.request, Object.assign({
      headers: {
        'User-Agent': randomUserAgent,
      },
    }, this.opts.apiOpts));
  }

  // Need steam id
  async loadData() {
    if (this.steamId == null) return { hasError: true, data: 'Steam Id missing' };
    let response = await this.api.login(this.steamId);
    if (response.hasError) return response;

    this.userData = response.data;
    
    this.id = this.userData.id;

    // Parse characters ids string
    if (typeof this.userData.characters == 'string') {
      let charactersIds = this.userData.characters.split(',').map(x => parseInt(x)).filter(x => !isNaN(x));
      this.userData.characters = charactersIds.map(id => new Character(id));

      await Promise.all(this.userData.characters.map(character => new Promise(async resolve => {
        let response = await this.getAppearance(character.id);
        if (!response.hasError && response.data) {
          character.setAppearance(response.data.character_name, response.data.appearance_data);
        }
        resolve();
      })));
    } else {
      this.userData.characters = [];
    }

    return { hasError: false, data: this.userData };
  }

  // No auth needed
  async getServerList() {
    let response = await this.api.getServerList();
    if (response.hasError) return response;
    this.serverList = response.data.server_list ? response.data.server_list : [];
    return { hasError: false, data: this.serverList };
  }

  // Need auth
  async getAppearance(characterId) {
    if (!this.isAuthenticated()) return { hasError: true, data: 'Client not authenticated' };
    let response = await this.api.getAppearance(this.id, characterId);
    if (response.hasError) return response;
    let appearance = response.data;
    return { hasError: false, data: appearance };
  }

  // Need auth
  getCharacters() {
    if (!this.isAuthenticated()) return { hasError: true, data: 'Client not authenticated' };
    return this.userData.characters;
  }

  isAuthenticated() {
    return !!(this.steamId != null && this.userData != null);
  }
}