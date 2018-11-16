#!/usr/bin/env bash

set -e

# Ubuntu 18.04 only
nodejs --version || export INSTALL_NODEJS=true
npm --version || export INSTALL_NPM=true
yarn --version || export INSTALL_YARN=true

# Install dependencies for yarn operations
if [ -v INSTALL_NODEJS ]; then
    PACKAGE_LIST="${PACKAGE_LIST:-""} nodejs"
fi

if [ -v INSTALL_NPM ]; then
    PACKAGE_LIST="${PACKAGE_LIST:-""} npm"
fi

if [ -v INSTALL_YARN ]; then

    # Get yarn
    curl --version || apt-get -qq -y --no-install-recommends install curl

    # Get yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

    PACKAGE_LIST="${PACKAGE_LIST:-""} yarn"
fi

# Install yarn
apt-get -qq -y update
apt-get -qq -y install --no-install-recommends make libpng-dev gettext-base $PACKAGE_LIST
