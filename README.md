## TorControls

Module for managing TOR service.

### Installation

Download repo. Goto to project/buildingNpmPackage folder, then execute script createPackage.sh.
There will be file TorControls.package.tar.gz.
In directory of your project install module by package manager:
`npm install path/to/TorControls.package.tar.gz`.

### Example of usage

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

### Links

- [API documentation](doc/API.md)
- [TOR Control specification](https://github.com/torproject/torspec/blob/main/control-spec.txt)

### License

[Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0)
