## TorControls

Модуль для управления сервисом TOR. 

### Установка

Скачайте репозиторий.
В папке project/buildingNpmPackage запустите скрипт createPackage.sh,
после чего появится файл TorControls.package.tar.gz.
В каталоге вашего проекта установите модуль менеджером пакетов:
`npm install path/to/TorControls.package.tar.gz`.

### Пример использования

```js
"use strict";

import {createTorControls} from "TorControls";
// const {createTorControls} = require("TorControls");

const torControls = createTorControls({
  host: "localhost",
  password: "some password1234",
  port: 9991
});

(async () => {
  await torControls.signalNewNym();
  const {message} = await torControls.getConf("SocksPort");
  console.log(message);
})();
```

### Ссылки

- [Документация по API](doc/translations/API.ru.md)
- [Спецификация протокола управления TOR](https://github.com/torproject/torspec/blob/main/control-spec.txt)
