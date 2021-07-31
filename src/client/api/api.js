const routes = require('./routes');


module.exports = class Api {
  constructor(request, opts) {
    this.request = request;
    this.opts = Object.assign({}, opts);
  }

  formatResponse(response) {
    return response;
  }
  
  async getAppearance(accountId, characterId) {
    return this.formatResponse(await routes.getAppearance(this.request, accountId, characterId, this.opts));
  }
  
  async getServerList() {
    return this.formatResponse(await routes.getServerList(this.request, this.opts));
  }
  
  async login(steamId) {
    return this.formatResponse(await routes.login(this.request, steamId, this.opts));
  }
}