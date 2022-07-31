"use strict";

const net = require("net");

const createConnectionToTorControlPort = function(paramsForConnecting, password) {
  return new Promise((resolve, reject) => {
    const connection = net.connect(paramsForConnecting);

    connection.once("error", reject);
    connection.once("data", _createResponseOnAuthMessageAcceptor(resolve, connection, reject));

    connection.write('AUTHENTICATE "' + password + '"\r\n'); // Chapter 3.5
  });
};

const _createResponseOnAuthMessageAcceptor = function(resolvePromise, connection, rejectPromise) {
  return _extractStatusFromResponse.bind(null, resolvePromise, connection, rejectPromise);
};

const _extractStatusFromResponse = function(resolvePromise, connection, rejectPromise, response) {
  response = response.toString();
  if (response.startsWith("250")) {
    return resolvePromise(connection);
  }
  return rejectPromise(new Error("Authentication failed with message: " + response));
};

module.exports = createConnectionToTorControlPort;
