"use strict";

const TorControlRequestExeption = require("./TorControlRequestExeption");

const sendCommandToTorControl = function(connection, command) {
  return new Promise(function(resolve, reject) {
    connection.once("data", acceptResponse.bind(null, resolve, reject));
    connection.write(command + newLine);
  });
};

const acceptResponse = function(resolvePromise, rejectPromise, response) {
  response = response.toString();
        
  if (is250SuccesCode(response)) {
    return resolvePromise({
      code: 250,
      message: response
    });    
  }
  return rejectPromise(new TorControlRequestExeption(response));
};

const reSuccesResponse = /250/,
      newLine = "\r\n";

const is250SuccesCode = reSuccesResponse.test.bind(reSuccesResponse);

module.exports = sendCommandToTorControl;
