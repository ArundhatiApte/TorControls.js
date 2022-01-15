"use strict";

const expect = require("assert"),
      Tester = require("tester");

const {
  createTorControls,
  TorControlRequestExeption
} = require("./../createTorControls");
      
const tester = new Tester("testing TorControls"),
      optionsForConnection = require("./configForTor.json");

const torControlsWithoutPersistentConnection = createTorControls(optionsForConnection);
optionsForConnection.isPersistent = true;
const torControlsWithPersistentConnection = createTorControls(optionsForConnection);

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
      console.log("result from ", nameOfMethod, " : ", result);
    };
  
    return checkSengingSignals;
  })();
  
  const createCheckingSendingSignalsFn = function(torControls) {
    return checkSengingSignals.bind(null, torControls);
  };

  return createCheckingSendingSignalsFn;
})();

tester.addTest(createCheckingSendingSignalsFn(torControlsWithoutPersistentConnection), {
  name: "testSignals"
});

tester.addTest(createCheckingSendingSignalsFn(torControlsWithPersistentConnection), {
  name: "testSignalsWithPersistentConnection"
});

const testThrowingError = function() {
  return expect.rejects(function() {
    return torControlsWithoutPersistentConnection.getInfo("signal noSuchCommandInSpec");
  }, TorControlRequestExeption);
};

tester.addTest(testThrowingError);

tester.onAllTestsEnded.addListener(function() {
  return torControlsWithPersistentConnection.close();
});

tester.run();
