#!/usr/bin/env bash

env | sort

if [ ! -v TRAVIS ]; then
  # Checkout repo and change directory

  # Install git
  git --version || apt-get install -y git

  git clone \
    --depth=1 \
    https://github.com/adshares/ads-operator-panel.git \
    --branch ${ADS_OPERATOR_PANEL_INSTALLATION_BRANCH} \
    ${ADS_OPERATOR_PANEL_BUILD_PATH}/build

  cd ${ADS_OPERATOR_PANEL_BUILD_PATH}/build
fi

# Create environment
envsubst < environment.ts.dist | tee src/environments/environment.${APP_ENV}.ts

# Install dependencies
yarn install

# Build project
yarn run build
