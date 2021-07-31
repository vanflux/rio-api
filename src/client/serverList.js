const { EventEmitter } = require('events');
const Server = require('./server');

module.exports = class ServerList extends EventEmitter {
  constructor() {
    super();
    this.servers = [];
    this.serversById = {};
  }

  updateData(data) {
    let toRemoveIds = new Set(Object.keys(this.serversById));
    for (let serverData of data) {
      let {id} = serverData;
      if (toRemoveIds.has(id)) {
        let server = this.serversById[id];
        toRemoveIds.delete(id);
        if (server.updateData(serverData)) {
          this.emit('update server', server);
        }
      } else {
        let server = new Server(id, serverData);
        this.serversById[id] = server;
        this.servers.push(server);
        this.emit('new server', server);
      }
    }
    for (let id of toRemoveIds) {
      let server = this.serversById[id];
      delete this.serversById[id];
      let index = this.servers.findIndex(x => x.id == id);
      this.servers.splice(index, 1);
      this.emit('remove server', server);
    }
  }
}