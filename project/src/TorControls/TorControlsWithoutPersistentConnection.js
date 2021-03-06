"use strict";

const TorControls = require("./TorControls");
const sendCommandToTorControl = require("./../modules/sendCommandToTorControl");
const closeConnectionToTorControlPort = require("./../modules/closeConnectionToTorControlPort");

const {_connection} = TorControls._namesOfProtectedProperties;
const defaultMaxTimeMsForWaitingClosingConnection = TorControls._defaultMaxTimeMsForWaitingClosingConnection;

const TorControlsWithoutPersistentConnection = class extends TorControls {
  async _sendRequest(command) {
    const connection = await this._createConnectionToTorControlPort();

    let result, error;
    try {
      result = await sendCommandToTorControl(connection, command);
    } catch(err) {
      error = err;
    }
    await closeConnectionToTorControlPort(connection, defaultMaxTimeMsForWaitingClosingConnection);
    delete this[_connection];
    if (error) {
      throw error;
    }
    return result;
  }
};

module.exports = TorControlsWithoutPersistentConnection;
