# TorControls API

#### Table of contents

- [exported module](#exported-module)
- [class TorControl](#torcontrol)
- [class TorControlRequestError](#torcontrolrequestexeption)
- [class PersistentConnectionTorControl](#persistentconnectiontorcontrol)
- [class TempConnectionTorControl](#tempconnectiontorcontrol)

## Exported module

`<Object>`
- `createTorControls([options])`
- `TorControlRequestError`

### createTorControls([options])

- `options <Object>`
    - `host <string>` By default: "localhost".
    - `isPersistent <bool>`
Indicates will be used one connection to TOR service for all requests,
or establish new connection for every request. If value is `true` `createTorControls` function will return
instance of `<PersistentConnectionTorControl>`, otherwise instance of `<TempConnectionTorControl>`.
By default: `false`.
    - `password <string>` Password of TOR service. By default: "".
    - `port <number>` Control port. By default: 9051.
- Returns `<TorControl>`

## class: TorControlRequestError

- Extends `<Error>`

### message

- `<string>` Response message from TOR service. Example: `'552/\r?\n/Unrecognized key "noSuchCommandInSpec"'`

## class: TorControl

Provides methods for sending signals and requests to TOR service.

### Sending signals methods:

- signalClearDNSCache()
- signalDebug()
- signalDump()
- signalHalt()
- signalHup()
- signalInt()
- signalNewNym()
- signalReload()
- signalShutdown()
- signalTerm()
- signalUsr1()
- signalUsr2()

Every method has no arguments, returns `<Promise<string>>`, which, in succes case, will contain a response message.
If TOR service send message with error code, `<Promise>` will be rejected with `<TorControlRequestError>`.

### Other methods

- setConf(request) Chapter 3.1 in [TOR Control spec]
- resetConf(request) Chapter 3.2 in [TOR Control spec]
- getConf(request) Chapter 3.3 in [TOR Control spec]
- getEvents(request) Chapter 3.4 in [TOR Control spec]
- saveConf(request) Chapter 3.6 in [TOR Control spec]

- `request <string>`
- returns `<Promise<string>>`

In succes case a `Promise` will be fulfilled with a response message.
If TOR service send message with error code, `<Promise>` will be rejected with `<TorControlRequestError>`.

### _sendRequest(message)

- `message <string>` Message to TOR service.
- Returns `<Promise<string>>`

Protected method for sending requests to TOR service.
If TOR service send message with error code, `<Promise>` will be rejected with `<TorControlRequestError>`.
Use this function to implement missing method in TorControl class.
Example:

```js
const customRequest = "..."
const sendCustomResuest = (torControls) => torControls._sendRequest(customRequest)
```

### class: PersistentConnectionTorControl

- Extends `<TorControl>`

Objects of the PersistentConnectionTorControl class hold a single connection to the TOR service throughout
all requests.

#### close()

- Returns `<Promise>`

Closes connection to TOR service, by sending message: `"QUIT\r\n"`.

#### destroy()

Closes connection to TOR service, by `socket.end()` method, without sending message: `"QUIT\r\n"`.

### class: TempConnectionTorControl

- Extends `<TorControl>`

Objects of the TempConnectionTorControl class establish connection for every requests and close after.

[TOR Control spec]: https://github.com/torproject/torspec/blob/main/control-spec.txt
