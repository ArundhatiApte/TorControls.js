## TorControls

Module for managing TOR service.

### Installation

`npm install github:ArundhatiApte/TorControls-JS`  
or  
`yarn add github:ArundhatiApte/TorControls-JS`

### Example of usage

```js
"use strict";

import {createTorControls} from "TorControls";
// const {createTorControls} = require("TorControls"); // commonJS

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

### Links

- [API documentation](#doc/API.ru.md)
- [TOR Control specification](https://github.com/torproject/torspec/blob/main/control-spec.txt)

### License

[Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0)

### Support

- Bitcoin Cash: qq0j7w2nvjvtk6r5pxux8d3ekse6kqz44qxxr7ayw6
- Ethereum: 0x6987e6De173C0f055B7039B314f2cedbFDA33582
- Litecoin: ltc1qtc8mh6lhv038tsm9z5y9jfxdtk5rlr6ueuc78u
- Polkadot: 1RMn2ThRFfz2kdkR3eqoAmaQFHT9yQVHYrhPdcKVNpzz9bU
