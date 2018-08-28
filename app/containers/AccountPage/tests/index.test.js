import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { AccountPage } from '../index';

describe('<AccountPage />', () => {
  it('should render h3, DetailView, LatestPanel elements', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const transactions = {
      loading: false,
      error: false,
      data: [],
    };
    const account = {
      loading: false,
      error: false,
      data: {},
    };

    const renderedComponent = shallowIntlWrap(
      <AccountPage
        match={match}
        dispatch={dispatch}
        account={account}
        transactions={transactions}
      />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });

  it('should dispatch loadAccount when id exists', () => {
    const match = {
      params: {
        id: '0001-00000000-9B6F',
      },
    };

    const transactions = {
      loading: false,
      error: false,
      data: [],
    };
    const account = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <AccountPage
        match={match}
        dispatch={dispatch}
        account={account}
        transactions={transactions}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });
});
