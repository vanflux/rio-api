module.exports = class Character {
  constructor(id) {
    this.id = id;
    this.name = null;
    this.appearanceData = null;
  }

  setAppearance(name, appearanceData) {
    this.name = name;
    this.appearanceData = appearanceData;
  }
}