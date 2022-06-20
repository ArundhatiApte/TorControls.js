"use strict";

const createConnectionToTorControlPort = require("./../modules/createConnectionToTorControlPort");

const TorControls = class {
  constructor(options) {
    this[_connection] = null;
    options ?
      this._setupByConfig(options) :
      this._setupByDefault();
  }

  _setupByConfig(config) {
    this[_paramsForConnecting] = {
      port: config.port || defaultPort,
      host: config.host || defaultHost
    };
    this[_password] = config.password || defaultPassword;
  }

  _setupByDefault() {
    this[_paramsForConnecting] = {
      port: defaultPort,
      host: defaultHost
    };
    this[_password] = defaultPassword;
  }

  _createConnectionToTorControlPort() {
    return createConnectionToTorControlPort(
      this[_paramsForConnecting],
      this[_password]
    );
  }

  //async _sendRequest(command, willKeepConnection) {}

  signal(nameOfSignal) {
    return this._sendRequest("SIGNAL " + nameOfSignal);
  }

  mapAddress(address) {
    return this._sendRequest("MAPADDRESS " + address);
  }

  getInfo(request) {
    return this._sendRequest("GETINFO " + (typeof request === "string" ? request : request.join("\n")));
  }

  // signals
  signalClearDNSCache() {
    return this.signal("CLEARDNSCACHE");
  }

  signalDebug() {
    return this.signal("DEBUG");
  }

  signalDump() {
    return this.signal("DUMP");
  }

  signalHalt() {
    return this.signal("HALT");
  }

  signalHup() {
    return this.signal("HUP");
  }

  signalInt() {
    return this.signal("INT");
  }

  signalNewNym() {
    return this.signal("NEWNYM");
  }

  signalReload() {
    return this.signal("RELOAD", true);
  }

  signalShutdown() {
    return this.signal("SHUTDOWN", true);
  }

  signalTerm() {
    return this.signal("TERM", true);
  }

  signalUsr1() {
    return this.signal("USR1");
  }
  //

  getConf(request) { // Chapter 3.3
    return this._sendRequest("GETCONF " + request);
  }

  getEvents(request) { // Chapter 3.4
    return this._sendRequest("GETEVENTS " + request);
  }

  resetConf(request) { // Chapter 3.2
    return this._sendRequest("RESETCONF " + request);
  }

  saveConf(request) { // Chapter 3.6
    return this._sendRequest("SAVECONF " + request);
  }

  setConf(request) { // Chapter 3.1
    return this._sendRequest("SETCONF " + request);
  }
};

const defaultPort = 9051;
const defaultHost = "localhost";
const defaultPassword = "";
const defaultMaxTimeMsForWaitingClosingConnection = 444;

const _connection = Symbol();
const _paramsForConnecting = Symbol();
const _password = Symbol();

TorControls._defaultMaxTimeMsForWaitingClosingConnection = defaultMaxTimeMsForWaitingClosingConnection;
TorControls._namesOfPrivateProperties = {_connection};

module.exports = TorControls;
