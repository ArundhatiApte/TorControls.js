"use strict";

const TorControlsWithPersistentConnection = require("./TorControls/TorControlsWithPersistentConnection"),
      TorControlsWithoutPersistentConnection = require("./TorControls/TorControlsWithoutPersistentConnection");

const createTorControls = function(config) {
  if (!config) {
    return new TorControlsWithoutPersistentConnection();
  }
  return config.isPersistent ?
    new TorControlsWithPersistentConnection(config) :
    new TorControlsWithoutPersistentConnection(config);
};

module.exports = {
  createTorControls,
  TorControlRequestError: require("./modules/TorControlRequestError")
}
