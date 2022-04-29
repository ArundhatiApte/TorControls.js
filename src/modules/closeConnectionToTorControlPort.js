"use strict";

const createTimeoutForClosing = function(connection, resolvePromise, maxTimeMsForWaitingClosing) {
  return setTimeout(
    closeConection.bind(null, connection, resolvePromise),
    maxTimeMsForWaitingClosing
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

const closeConnectionToTorControlPort = function(connection, maxTimeMsForWaitingClosing) {
  return new Promise(function(resolve) {
    const timeout = createTimeoutForClosing(
      connection, resolve, maxTimeMsForWaitingClosing
    );
    connection.once("end", createResolver(timeout, resolve));
    connection.write("QUIT\r\n");
  });
};

module.exports = closeConnectionToTorControlPort;
