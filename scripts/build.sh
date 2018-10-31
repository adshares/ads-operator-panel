#!/usr/bin/env bash

env | sort

if [ ! -v TRAVIS ]; then
  # Checkout repo and change directory

  # Install git
  git --version || apt-get install -y git

  git clone \
    --depth=1 \
    https://github.com/adshares/ads-operator-panel.git \
    --branch ${ADS_OPERATOR_PANEL_BRANCH} \
    ${BUILD_PATH}/build

  cd ${BUILD_PATH}/build
fi

# Install dependencies
yarn install

# Build project
yarn run build
