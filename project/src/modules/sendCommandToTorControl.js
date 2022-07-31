"use strict";

const TorControlRequestError = require("./TorControlRequestError");

const sendCommandToTorControl = function(connection, command) {
  return new Promise(function(resolve, reject) {
    connection.once("data", acceptResponse.bind(null, resolve, reject));
    connection.write(command + newLine);
  });
};

const newLine = "\r\n";

const acceptResponse = function(resolvePromise, rejectPromise, response) {
  response = response.toString();

  if (is250SuccesCode(response)) {
    return resolvePromise(response);
  }
  return rejectPromise(new TorControlRequestError(response));
};

const is250SuccesCode = function(stringResponse) {
  return stringResponse.startsWith("250");
};

module.exports = sendCommandToTorControl;
