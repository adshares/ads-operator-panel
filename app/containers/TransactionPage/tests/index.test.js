import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { TransactionPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';

const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<TransactionPage />', () => {
  const location = { search: '' };

  it('should render h3, DetailView elements', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const transaction = {
      loading: false,
      error: false,
      data: {},
    };

    const renderedComponent = shallowIntlWrap(
      <TransactionPage
        match={match}
        location={location}
        dispatch={dispatch}
        transaction={transaction}
        breakpoint={breakpoint}
      />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
  });

  it('should dispatch loadTransaction when id exists', () => {
    const match = {
      params: {
        id: '0002:0000005A:1234',
      },
    };

    const transaction = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <TransactionPage
        match={match}
        location={location}
        dispatch={dispatch}
        transaction={transaction}
        breakpoint={breakpoint}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the same id should not call dispatch function', () => {
    const match = {
      params: {
        id: '0002:0000005A:1234',
      },
    };

    const transaction = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <TransactionPage
        match={match}
        location={location}
        dispatch={dispatch}
        transaction={transaction}
        breakpoint={breakpoint}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0002:0000005A:1234',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the new id should call dispatch function', () => {
    const match = {
      params: {
        id: '0002:0000005A:1234',
      },
    };

    const transaction = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <TransactionPage
        match={match}
        location={location}
        dispatch={dispatch}
        transaction={transaction}
        breakpoint={breakpoint}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0002:0000005A:1111',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(2);
  });
});
