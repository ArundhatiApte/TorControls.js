"use strict";

const TorControls = require("./TorControls");
const sendCommandToTorControl = require("./../modules/sendCommandToTorControl");
const closeConnectionToTorControlPort = require("./../modules/closeConnectionToTorControlPort");

const {_connection} = TorControls._namesOfPrivateProperties;
const defaultMaxTimeMsForWaitingClosingConnection = TorControls._defaultMaxTimeMsForWaitingClosingConnection;

const TorControlsWithPersistentConnection = class extends TorControls {
  async close() {
    await closeConnectionToTorControlPort(this[_connection], defaultMaxTimeMsForWaitingClosingConnection);
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
