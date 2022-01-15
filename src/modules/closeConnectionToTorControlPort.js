"use strict";

const createTimeoutForClosing = function(
  connection, resolvePromise, maxTimeMSForWaitingClosing
) {
  return setTimeout(
    closeConection.bind(null, connection, resolvePromise),
    maxTimeMSForWaitingClosing  
  );
};

const closeConection = function(connection, resolvePromise) {
  connection.end();
  resolvePromise();
};

const createResolver = function(timeoutForClosing, resolvePromise) {
  return resolveTask.bind(null, timeoutForClosing, resolvePromise);
};

const resolveTask = function(timeoutForClosing, resolvePromise) {
  clearTimeout(timeoutForClosing);
  resolvePromise();
};

const closeConnectionToTorControlPort = function(connection, maxTimeMSForWaitingClosing) {
  return new Promise(function(resolve) {
    const timeout = createTimeoutForClosing(
      connection, resolve, maxTimeMSForWaitingClosing
    );
    connection.once("end", createResolver(timeout, resolve));
    connection.write("QUIT\r\n");
  });
};

module.exports = closeConnectionToTorControlPort;
