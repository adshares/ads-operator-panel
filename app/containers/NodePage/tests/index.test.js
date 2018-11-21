import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { NodePage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';

const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<NodePage />', () => {
  const location = { search: '' };

  it('should render h3, DetailView, TabListView elements', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const node = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };
    const messages = {
      loading: false,
      error: false,
      data: [],
    };
    const transactions = {
      loading: false,
      error: false,
      data: [],
    };

    const renderedComponent = shallowIntlWrap(
      <NodePage
        match={match}
        location={location}
        dispatch={dispatch}
        node={node}
        accounts={accounts}
        messages={messages}
        transactions={transactions}
        breakpoint={breakpoint}
        history={{}}
      />,
    );
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
    expect(renderedComponent.find('TabListView').length).toEqual(1);
  });

  it('should dispatch loadNode when id exists', () => {
    const match = {
      params: {
        id: '0001',
      },
    };

    const node = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };
    const messages = {
      loading: false,
      error: false,
      data: [],
    };
    const transactions = {
      loading: false,
      error: false,
      data: [],
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <NodePage
        match={match}
        location={location}
        dispatch={dispatch}
        node={node}
        accounts={accounts}
        messages={messages}
        transactions={transactions}
        breakpoint={breakpoint}
        history={{}}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the same id should not call dispatch function', () => {
    const match = {
      params: {
        id: '0001',
      },
    };

    const node = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };
    const messages = {
      loading: false,
      error: false,
      data: [],
    };
    const transactions = {
      loading: false,
      error: false,
      data: [],
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <NodePage
        match={match}
        location={location}
        dispatch={dispatch}
        node={node}
        accounts={accounts}
        messages={messages}
        transactions={transactions}
        breakpoint={breakpoint}
        history={{}}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0001',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the new id should call dispatch function', () => {
    const match = {
      params: {
        id: '0001',
      },
    };

    const node = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };
    const messages = {
      loading: false,
      error: false,
      data: [],
    };
    const transactions = {
      loading: false,
      error: false,
      data: [],
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <NodePage
        match={match}
        location={location}
        dispatch={dispatch}
        node={node}
        accounts={accounts}
        messages={messages}
        transactions={transactions}
        breakpoint={breakpoint}
        history={{}}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0002',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(5);
  });
});
