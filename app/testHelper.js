import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme/build/index';
import { IntlProvider } from 'react-intl';
import { shape } from 'prop-types';

const messages = require('./translations/en'); // en.json
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
});

const createIntlContext = () => ({
  context: { router, intl },
  childContextTypes: { router: shape({}), intl: shape({}) },
});

function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function mountWrap(node) {
  return mount(node, createContext());
}

export function mountIntlWrap(node) {
  return mount(nodeWithIntlProp(node), createIntlContext());
}

export function shallowWrap(node) {
  return shallow(node, createContext());
}

export function shallowIntlWrap(node) {
  return shallow(nodeWithIntlProp(node), createIntlContext());
}
