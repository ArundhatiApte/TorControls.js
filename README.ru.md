## TorControls

Модуль для управления сервисом TOR. 

### Утсановка

`npm install github:ArundhatiApte/TorControls-JS`  
или  
`yarn add github:ArundhatiApte/TorControls-JS`

### Пример испоьзования

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

- [Документация по API](doc/API.ru.md)
- [Спецификация протокола управления TOR](https://github.com/torproject/torspec/blob/main/control-spec.txt)

### Поддержка

- Bitcoin Cash: qruf96kpx63dqz46flu453xxkpq5e7wlpgpl2zdnx8
- Ethereum: 0x8dF38FfBd066Ba49EE059cda8668330304CECD57
- Litecoin: ltc1quygsxll92wwn88hx2rper3p9eq0ez49qu4tj5w
- Polkadot: 14GqUGDwGzowm92n9xaiD5R2miPxrEdtXPxgkCtar2vw18yn
