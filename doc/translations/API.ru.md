# API TorControls

####  Содержание

- [Экспортируемый модуль](#экспортируемый-модуль)
- [Класс TorControl](#torcontrol)
- [Класс TorControlRequestError](#torcontrolrequestexeption)
- [Класс PersistentConnectionTorControl](#persistentconnectiontorcontrol)
- [Класс TempConnectionTorControl](#tempconnectiontorcontrol)

## Экспортируемый модуль

`<Object>`
- `createTorControls([options])`
- `TorControlRequestError`

### createTorControls([options])

- `options <Object>`
    - `host <string>` По умолчанию "localhost".
    - `isPersistent <bool>`
Указывает использовать ли одно соединение с сервисом TOR для всех запросов, или устанавливать новое для каждого нового сообщения.
Если значение истина функция `createTorControls` вернет объект класса `<PersistentConnectionTorControl>`, иначе
`<TempConnectionTorControl>`. По умолчанию `false`.
    - `password <string>` Пароль для подключения к сервису TOR. По умолчанию "".
    - `port <number>` Порт управления сервисом TOR. По умолчанию 9051.
- Возвращает `<TorControl>`

## class: TorControlRequestError

- Наследует `<Error>`

### message

- `<string>` Ответное сообщение сервиса TOR. Пример: `'552/\r?\n/Unrecognized key "noSuchCommandInSpec"'`.

## Класс: TorControl

Предоставляет методы для отправки сигналов и запросов сервису TOR.

### Методы, отправляющие сигналы:

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

Каждый метод без параметров, возвращает `<Promise<string>>`, который в случае успеха будет содержать ответное
сообщение. Если сервис TOR ответит сообщение с кодом ошибки, `Promise` завершится исключением
`TorControlRequestError`.

### Другие методы

- setConf(request) Глава 3.1 в [TOR Control spec]
- resetConf(request) Глава 3.2 в [TOR Control spec]
- getConf(request) Глава 3.3 в [TOR Control spec]
- getEvents(request) Глава 3.4 в [TOR Control spec]
- saveConf(request) Глава 3.6 в [TOR Control spec]

- `request <string>`
- Возвращает `<Promise<string>>`

В случае успеха `Promise` будет содержать ответное сообщение.
Если сервис TOR ответит сообщением с кодом ошибки, метод завершится исключением `TorControlRequestError`.

### _sendRequest(message)

- `message <string>` Сообщение, отправляемое сервису TOR.
- Возвращает `<Promise<string>>`

Защищённый метод для отправки сообщений сервису TOR. Если сервис TOR ответит сообщение с кодом ошибки,
`Promise` завершится исключением `TorControlRequestError`. Используйте, если нужный метод отсутствует в классе
`TorControl`.
Пример:

```js
const customRequest = "..."
const sendCustomeResuest = (torControls) => torControls._sendRequest(customRequest)
```

## Класс: PersistentConnectionTorControl

- Наследует `<TorControl>`

Объекты класса удерживают одно соединение с сервисом TOR на протяжении всех запросов.

### close()

- Возвращает `<Promise>`

Закрывает соединение с сервисом TOR, отправляя сообщение `"QUIT\r\n"`.

### destroy()

Закрывает соединеие с сервисом TOR, методом `socket.end()`, без отправки сообщения `"QUIT\r\n"`.

## Класс: TempConnectionTorControl

- Наследует `<TorControl>`

Объекты класса устанавливают соединение с сервисом TOR для каждого запроса.

[TOR Control spec]: https://github.com/torproject/torspec/blob/main/control-spec.txt
