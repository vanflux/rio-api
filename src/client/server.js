module.exports = class Server {
  constructor(id, data) {
    this.id = id;
    this.playersHistory = [];
    this.maxPlayerHistory = 50;
    this.updateData(data);
  }

  set currentPlayerCount(value) {
    if (this._currentPlayerCount == value) return;
    this._currentPlayerCount = value;
    this.playersHistory.unshift({time: Date.now(), value});
    if (this.playersHistory.length > this.maxPlayerHistory) this.playersHistory.length = this.maxPlayerHistory;
  }

  get currentPlayerCount() {
    return this._currentPlayerCount;
  }

  updateData(data) {
    let changed = false;
    if (this.address            != data.address             ) this.address            = data.address,               changed = true;
    if (this.currentPlayerCount != data.current_player_count) this.currentPlayerCount = data.current_player_count,  changed = true;
    if (this.levelRequirement   != data.level_requirement   ) this.levelRequirement   = data.level_requirement,     changed = true;
    if (this.mapName            != data.map_name            ) this.mapName            = data.map_name,              changed = true;
    if (this.maxPlayerCount     != data.max_player_count    ) this.maxPlayerCount     = data.max_player_count,      changed = true;
    if (this.region             != data.region              ) this.region             = data.region,                changed = true;
    if (this.version            != data.version             ) this.version            = data.version,               changed = true;
    return changed;
  }
}
