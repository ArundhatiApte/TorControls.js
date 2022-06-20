#!/bin/sh

rm TorControls.package.tar.gz

tar -czvf TorControls.package.tar.gz \
  --exclude='test*'\
  --exclude='tests.js'\
  LICENCE package.json README.md src
