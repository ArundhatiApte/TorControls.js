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
  
  //async _sendRequest(command) {}
  
  signal(nameOfSignal) {
    return this._sendRequest("SIGNAL " + nameOfSignal);
  }
  
  mapAddress(address) {
    return this._sendRequest("MAPADDRESS " + address);
  }
  
  getInfo(request) {
    return this._sendRequest(
      "GETINFO " + 
      (typeof request === "string" ? request : request.join("\n"))
    );
  }
};

const defaultPort = 9051,
      defaultHost = "localhost",
      defaultPassword = "",
      defaultMaxTimeMSForWaitingClosingConnection = 444;

const _connection = "_c",
      _paramsForConnecting = "_p",
      _password = "_s";


TorControls._defaultMaxTimeMSForWaitingClosingConnection = defaultMaxTimeMSForWaitingClosingConnection;
TorControls._namesOfPrivateProperties = {_connection};

const proto = TorControls.prototype;

(function addMethodsToTorControls(proto) {
  
  const namesOfMethods = [
    "setConf", "resetConf", 
    "getConf", "getEvents",
    "saveConf"
  ];
  
  const createSendingRequestMethod = function(prefixOfCommand) {
    return function(restPartOfCommand) {
      return this._sendRequest(prefixOfCommand + restPartOfCommand);
    };
  };
  
  let request;
  for (const nameOfMethod of namesOfMethods) {
    request = nameOfMethod.toUpperCase() + " ";
    proto[nameOfMethod] = createSendingRequestMethod(request);
  }
})(proto);

(function addSendingSignalMethodsToControls(proto) {

  const namesOfMethods = [
    "signalReload", "signalHup", 
    "signalShutdown", "signalDump",
    "signalUsr1", "signalDebug",
    "signalUsr2", "signalHalt",
    "signalTerm", "signalInt",
    "signalNewNym", "signalClearDNSCache"
  ];
    
  const createSendingSignalMethod = function(nameOfSignal) {
    return function() {
      return this.signal(nameOfSignal);
    };
  };
  
  const lengthOfSignalWord = "signal".length;
  const extractNameOfSignalFromNameOfMethod = function(nameOfMethod) {
    return nameOfMethod.slice(lengthOfSignalWord).toUpperCase();
  };
  
  let nameOfSignal;
  for (const nameOfMethod of namesOfMethods) {
    nameOfSignal = extractNameOfSignalFromNameOfMethod(nameOfMethod);
    proto[nameOfMethod] = createSendingSignalMethod(nameOfSignal);
  }
})(proto);

module.exports = TorControls;
