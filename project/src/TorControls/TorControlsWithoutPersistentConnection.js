"use strict";

const TorControls = require("./TorControls");
const sendCommandToTorControl = require("./../modules/sendCommandToTorControl");
const closeConnectionToTorControlPort = require("./../modules/closeConnectionToTorControlPort");

const {_connection} = TorControls._namesOfPrivateProperties;
const defaultMaxTimeMsForWaitingClosingConnection = TorControls._defaultMaxTimeMsForWaitingClosingConnection;

const TorControlsWithoutPersistentConnection = class extends TorControls {
  async _sendRequest(command, willKeepConnection) {
    const connection = this[_connection] || (await this._createConnectionToTorControlPort());

    let result, error;
    try {
      result = await sendCommandToTorControl(connection, command);
    } catch(err) {
      error = err;
    }
    if (willKeepConnection) {
      if (error) {
        throw error;
      }
      return result;
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
