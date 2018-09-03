import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { AccountPage } from '../index';

describe('<AccountPage />', () => {
  const location = { search: '' };

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
        location={location}
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
        location={location}
        dispatch={dispatch}
        account={account}
        transactions={transactions}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });

  it('render ListView component with correct link url (searching)', () => {
    const match = {
      params: {
        id: '0001-00000000-9B6F',
      },
    };

    const expectedLink = '/blockexplorer/nodes/0001/accounts/0001-00000000-9B6F/transactions'; // eslint-disable-line

    const transactions = {
      loading: false,
      error: false,
      data: [],
    };
    const account = {
      loading: false,
      error: false,
      data: {
        node_id: '0001',
      },
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <AccountPage
        match={match}
        location={location}
        dispatch={dispatch}
        account={account}
        transactions={transactions}
      />,
    );

    const props = renderedComponent.find('ListView').props();
    expect(props.link).toEqual(expectedLink);
  });

  it('render ListView component with correct link url (full path)', () => {
    const match = {
      params: {
        id: '0001-00000000-9B6F',
        nodeId: '0001',
      },
    };

    const expectedLink = '/blockexplorer/nodes/0001/accounts/0001-00000000-9B6F/transactions'; // eslint-disable-line

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

    const renderedComponent = shallowIntlWrap(
      <AccountPage
        match={match}
        location={location}
        dispatch={dispatch}
        account={account}
        transactions={transactions}
      />,
    );

    const props = renderedComponent.find('ListView').props();
    expect(props.link).toEqual(expectedLink);
  });

  it('Update component with the same id should not call dispatch function', () => {
    const match = {
      params: {
        id: '0001-00000000-9B6F',
        nodeId: '0001',
      },
    };

    const transactions = {
      loading: false,
      error: false,
      data: [
        {
          id: '0001:00000173:0001',
          block_id: '5B869D20',
          message_id: '0001:00000173',
          address: '0001-00000001-8B4E',
        },
      ],
    };
    const account = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <AccountPage
        match={match}
        location={location}
        dispatch={dispatch}
        account={account}
        transactions={transactions}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0001-00000000-9B6F',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the new id should call dispatch function', () => {
    const match = {
      params: {
        id: '0001-00000000-9B6F',
        nodeId: '0001',
      },
    };

    const transactions = {
      loading: false,
      error: false,
      data: [
        {
          id: '0001:00000173:0001',
          block_id: '5B869D20',
          message_id: '0001:00000173',
          address: '0001-00000001-8B4E',
        },
      ],
    };
    const account = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <AccountPage
        match={match}
        location={location}
        dispatch={dispatch}
        account={account}
        transactions={transactions}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0002-00000000-9B6F',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(3);
  });
});
