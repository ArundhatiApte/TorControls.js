#!/bin/sh

rm TorControls.package.tar.gz

tar -czvf TorControls.package.tar.gz\
  --transform='s,^,package/,'\
  --exclude='test*'\
  ./../../LICENCE ./../../README.md\
  ./../package.json  ./../src
