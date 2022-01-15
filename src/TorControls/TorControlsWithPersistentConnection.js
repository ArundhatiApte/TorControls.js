"use strict";

const TorControls = require("./TorControls"),
      sendCommandToTorControl = require("./../modules/sendCommandToTorControl"),
      closeConnectionToTorControlPort = require("./../modules/closeConnectionToTorControlPort");

const {_connection} = TorControls._namesOfPrivateProperties,
      defaultMaxTimeMSForWaitingClosingConnection = TorControls._defaultMaxTimeMSForWaitingClosingConnection;

const TorControlsWithPersistentConnection = class extends TorControls {
  async close() {
    await closeConnectionToTorControlPort(this[_connection], defaultMaxTimeMSForWaitingClosingConnection); 
    delete this[_connection];
  }

  destroy() {
    this[_connection].end();
    delete this[_connection];
  }

  async _sendRequest(command) {
    const connection = await _getConnectionToTorControlPort.call(this);
    return await sendCommandToTorControl(connection, command);
  }
};

const _getConnectionToTorControlPort = async function() {
  let connection = this[_connection];
  if (connection) {
    return connection;
  }
  connection = this[_connection] = await this._createConnectionToTorControlPort();
  return connection;
};

module.exports = TorControlsWithPersistentConnection;
