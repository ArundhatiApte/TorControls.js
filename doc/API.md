## Table of contents

- [exported module](#exported-module)
- [class TorControl](#torcontrol)
- [class TorControlResponse](#torcontrolresponse)
- [class TorControlRequestExeption](#torcontrolrequestexeption)
- [class PersistentConnectionTorControl](#persistentconnectiontorcontrol)
- [class TempConnectionTorControl](#tempconnectiontorcontrol)

### Exported module

`<Object>`  
- `createTorControls([options])`
- `TorControlRequestExeption`

#### createTorControls([options])

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

### class: TorControlRequestExeption

- Extends `<Error>`.

#### message

- `<string>` Response message from TOR service. Example: `'552/\r?\n/Unrecognized key "noSuchCommandInSpec"'`

### class: TorControl

Provides methods for sending signals and requests to TOR service.

#### Sending signals methods:

- signalClearDNSCache
- signalDebug
- signalDump
- signalHalt
- signalHup
- signalInt
- signalNewNym
- signalReload
- signalShutdown
- signalTerm
- signalUsr1
- signalUsr2

Every method has no argumens, returns `<Promise<TorControlResponse>>`.
If TOR service send message with error code, `<Promise>` will be rejected with `<TorControlRequestExeption>`.

#### getConf(nameOfProperty)

#### getEvents()

#### resetConf()

#### saveConf()

#### setConf()

#### _sendRequest(message)

- `message <string>` Message to TOR service.
- Returns `<Promise>`

Private method for sending requests to TOR service.
If TOR service send message with error code, `<Promise>` will be rejected with `<TorControlRequestExeption>`.  
Use this function to implement missing method in TorControl class.
Example:
```js
const customRequest = "..."
const sendCustomResuest = (torControls) => torControls._sendRequest(customRequest)
```

### class: TorControlResponse

Data about response from TOR service.

#### code

- `<number>` Code of response result.

####  message

`<string>` Response message.

### class: PersistentConnectionTorControl

- Extends `<TorControl>`.

Objects of the PersistentConnectionTorControl class hold a single connection to the TOR service throughout all requests.

#### close()

- Returns `<Promise>`

Closes connection to TOR service, by sending message: `"QUIT\r\n"`.

#### destroy()

Closes connection to TOR service, by `socket.end()` method, without sending message: `"QUIT\r\n"`.

### class: TempConnectionTorControl

- Extends `<TorControl>`.

Objects of the TempConnectionTorControl class, establish connection for every requests.
