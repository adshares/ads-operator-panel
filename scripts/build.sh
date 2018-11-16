#!/usr/bin/env bash

set -e

env | sort

if [ ! -v TRAVIS ]; then
  # Checkout repo and change directory

  # Install git
  git --version || apt-get install -y git

  git clone \
    --depth=1 \
    https://github.com/adshares/ads-operator-panel.git \
    --branch ${BUILD_BRANCH} \
    ${BUILD_PATH}/build

  cd ${BUILD_PATH}/build
fi

# Install dependencies
yarn install

# Build project
yarn run build
