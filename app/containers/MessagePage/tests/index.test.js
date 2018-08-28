import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { MessagePage } from '../index';

describe('<MessagePage />', () => {
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
    const message = {
      loading: false,
      error: false,
      data: {},
    };

    const renderedComponent = shallowIntlWrap(
      <MessagePage
        match={match}
        dispatch={dispatch}
        message={message}
        transactions={transactions}
      />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });

  it('should dispatch loadMessage when id exists', () => {
    const match = {
      params: {
        id: '0001-00000001',
      },
    };

    const transactions = {
      loading: false,
      error: false,
      data: [],
    };
    const message = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <MessagePage
        match={match}
        dispatch={dispatch}
        message={message}
        transactions={transactions}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });
});
