"use strict";

const expect = require("assert");

const {
  createTorControls,
  TorControlRequestError
} = require("./../createTorControls");

const createCheckingSendingSignalsFn = (function() {
  const checkSengingSignals = (function() {
    const namesOfMethods = [
      "signalClearDNSCache",
      "signalNewNym"
    ];

    const checkSengingSignals = async function(torControls) {
      for (const nameOfMethod of namesOfMethods) {
        await checkSendingSignalByMethod(torControls, nameOfMethod);
      }
    };

    const checkSendingSignalByMethod = async function(torControls, nameOfMethod) {
      const result = await torControls[nameOfMethod]();
    };

    return checkSengingSignals;
  })();

  const createCheckingSendingSignalsFn = function(torControls) {
    return checkSengingSignals.bind(null, torControls);
  };

  return createCheckingSendingSignalsFn;
})();

describe("testing TorControls", function() {
  console.log("Make sure that creds in configForTor.json are valid.");

  const optionsForConnection = require("./configForTor.json");
  const torControlsWithoutPersistentConnection = createTorControls(optionsForConnection);

  optionsForConnection.isPersistent = true; // ok
  const torControlsWithPersistentConnection = createTorControls(optionsForConnection);

  it("signals (nonpersistent connection)", createCheckingSendingSignalsFn(torControlsWithoutPersistentConnection));
  it("signals (persistent connection)", createCheckingSendingSignalsFn(torControlsWithPersistentConnection));

  it("throwing error", function() {
    return expect.rejects(
      () => torControlsWithoutPersistentConnection.getInfo("signal noSuchCommandInSpec"),
      TorControlRequestError
    );
  });

  after(function closeConnection() {
    return torControlsWithPersistentConnection.destroy();
  });
});
