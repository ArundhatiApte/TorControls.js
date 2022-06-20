s## Содержание

- [Экспортируемый модуль](#экспортируемый-модуль)
- [Класс TorControl](#torcontrol)
- [Класс TorControlResponse](#torcontrolresponse)
- [Класс TorControlRequestError](#torcontrolrequestexeption)
- [Класс PersistentConnectionTorControl](#persistentconnectiontorcontrol)
- [Класс TempConnectionTorControl](#tempconnectiontorcontrol)

### Экспортируемый модуль

`<Object>`
- `createTorControls([options])`
- `TorControlRequestError`

#### createTorControls([options])

- `options <Object>`
    - `host <string>` По умолчанию "localhost".
    - `isPersistent <bool>`  
Указывает использовать ли одно соединение с сервисом TOR для всех запросов, или устанавливать новое для каждого нового сообщения.
Если значение истина функция `createTorControls` вернет объект класса `<PersistentConnectionTorControl>`, иначе
`<TempConnectionTorControl>`. По умолчанию `false`.
    - `password <string>` Пароль для подключения к сервису TOR. По умолчанию "".
    - `port <number>` Порт управления сервисом TOR. По умолчанию 9051.
- Возвращает `<TorControl>`

### class: TorControlRequestError

- Наследует `<Error>`

#### message

- `<string>` Ответное сообщение сервиса TOR. Пример: `'552/\r?\n/Unrecognized key "noSuchCommandInSpec"'`.

### Класс: TorControl

Предоствляет методы для отправки сигналов и запросов сервису TOR.

#### Методы, отправляющие сигналы:

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

Каждый метод без параметров, возвращает `<Promise<TorControlResponse>>`.
Если сервис TOR ответит сообщение с кодом ошибки, метод завершится исключением TorControlRequestError.

#### getConf(request)

#### getEvents(request)

#### resetConf(request)

#### saveConf(request)

#### setConf(request)

#### _sendRequest(message)

- `message <string>` Сообщение, отправляемое сервису TOR.
- Возвращает `<Promise>`

Частный метод для отправки сообщений сервису TOR. Если сервис TOR ответит сообщение с кодом ошибки, метод завершится исключением TorControlRequestError.  
Используйте, если нужный метод отсутствует в классе TorControl.  
Пример:

```js
const customRequest = "..."
const sendCustomeResuest = (torControls) => torControls._sendRequest(customRequest)
```

### Класс: TorControlResponse

Информация об ответе сервиса TOR.

#### code

- `<number>` Код результата запроса.

####  message

`<string>` Ответное сообщение.

### Класс: PersistentConnectionTorControl

- Наследует `<TorControl>`.

Объекты класса удерживают одно соединение с сервисом TOR на протяжении всех запросов.

#### close()

- Возвращает `<Promise>`

Закрывает соединение с сервисом TOR, отправляя сообщение `"QUIT\r\n"`.

#### destroy()

Закрывает соединеие с сервисом TOR, методом `socket.end()`, без отправки сообщения `"QUIT\r\n"`.

### Класс: TempConnectionTorControl

- Наследует `<TorControl>`

Объекты класса устанавливают соединение с сервисом TOR для каждого запроса.
