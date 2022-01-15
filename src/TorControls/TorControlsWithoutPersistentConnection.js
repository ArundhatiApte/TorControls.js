"use strict";

const TorControls = require("./TorControls"),
      sendCommandToTorControl = require("./../modules/sendCommandToTorControl"),
      closeConnectionToTorControlPort = require("./../modules/closeConnectionToTorControlPort");

const {_connection} = TorControls._namesOfPrivateProperties,
      defaultMaxTimeMSForWaitingClosingConnection = TorControls._defaultMaxTimeMSForWaitingClosingConnection;

const TorControlsWithoutPersistentConnection = class extends TorControls {
  async _sendRequest(command) {
    const connection = await this._createConnectionToTorControlPort();
    
    let result, error;
    try {
      result = await sendCommandToTorControl(connection, command);
    } catch(err) {
      error = err;
    }
    await closeConnectionToTorControlPort(connection, defaultMaxTimeMSForWaitingClosingConnection);
    delete this[_connection];
    if (error) {
      throw error;
    }
    return result;
  }
};

module.exports = TorControlsWithoutPersistentConnection;
