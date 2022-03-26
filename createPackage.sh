#!/bin/sh

rm TorControls.package.zip

zip -r TorControls.package.zip . \
  -x node_modules/\*\
  -x doc/\*\
  -x .git/\*\
  -x examples/\*\
  -x *test\*\
  -x ".gitignore"\
  -x *test/\*\
  -x "createPackage.sh"
