#!/usr/bin/env bash

# Ubuntu 18.04 only

# Install dependencies for yarn operations
apt-get install -y nodejs npm libpng-dev

# envsubst binary
apt-get install -y gettext-base

# Get yarn
apt-get install -y curl

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

apt-get remove -y curl

# Install yarn
apt-get update && apt-get install -y yarn
