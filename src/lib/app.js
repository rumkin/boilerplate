const freeze = require('./utils/deep-freeze.js');
const copy = require('./utils/deep-copy.js');

const Service = require('./service.js');

module.exports = class App {
  constructor(config = {}) {
    this.services = new Map();
    this.config = freeze(copy(config));
    this._api = {};
  }

  has(name) {
    return this.services.has(name);
  }

  register(name, service) {
    if (this.has(name)) {
      throw new Error(`Service ${name} already exists`);
    }

    if (service instanceof Service === false) {
      throw new Error('Argument #2 should be an instance of Service');
    }

    this.services.set(name, service);
    this._api[name] = service;
  }

  unregister(name) {
    if (! this.has(name)) {
      throw new Error(`Service ${name} not found`);
    }

    this.services.delete(name);
    delete this._api[name];
  }

  get api() {
    return {...this._api};
  }

  async start() {
    for (const service of this.services.values()) {
      await service.startService(this);
    }
  }

  async stop() {
    for (const service of this.services.values()) {
      await service.stopService(this);
    }
  }
};
