import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { MessagePage } from '../index';

describe('<MessagePage />', () => {
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
    const message = {
      loading: false,
      error: false,
      data: {},
    };

    const renderedComponent = shallowIntlWrap(
      <MessagePage
        match={match}
        location={location}
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
        location={location}
        dispatch={dispatch}
        message={message}
        transactions={transactions}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });

  it('render ListView component with correct link url (searching)', () => {
    const match = {
      params: {
        id: '0001-00000001',
      },
    };

    const expectedLink = '/blockexplorer/blocks/12345678/messages/0001-00000001/transactions'; // eslint-disable-line

    const transactions = {
      loading: false,
      error: false,
      data: [],
    };
    const message = {
      loading: false,
      error: false,
      data: {
        block_id: '12345678',
      },
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <MessagePage
        match={match}
        location={location}
        dispatch={dispatch}
        message={message}
        transactions={transactions}
      />,
    );

    const props = renderedComponent.find('ListView').props();
    expect(props.link).toEqual(expectedLink);
  });

  it('render ListView component with correct link url (full path)', () => {
    const match = {
      params: {
        id: '0001-00000001',
        blockId: '12345678',
      },
    };

    const expectedLink = '/blockexplorer/blocks/12345678/messages/0001-00000001/transactions'; // eslint-disable-line

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

    const renderedComponent = shallowIntlWrap(
      <MessagePage
        match={match}
        location={location}
        dispatch={dispatch}
        message={message}
        transactions={transactions}
      />,
    );

    const props = renderedComponent.find('ListView').props();
    expect(props.link).toEqual(expectedLink);
  });

  it('Update component with the same id should not call dispatch function', () => {
    const match = {
      params: {
        id: '0001-00000001',
        blockId: '12345678',
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

    const renderedComponent = shallowIntlWrap(
      <MessagePage
        match={match}
        location={location}
        dispatch={dispatch}
        message={message}
        transactions={transactions}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0001-00000001',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the new id should call dispatch function', () => {
    const match = {
      params: {
        id: '0001-00000001',
        blockId: '12345678',
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

    const renderedComponent = shallowIntlWrap(
      <MessagePage
        match={match}
        location={location}
        dispatch={dispatch}
        message={message}
        transactions={transactions}
      />,
    );

    const newMatchProp = {
      params: {
        id: '0001-00000002',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(3);
  });
});
