import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { NodePage } from '../index';

describe('<NodePage />', () => {
  const location = { search: '' };

  it('should render h3, DetailView, ListView elements', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };
    const node = {
      loading: false,
      error: false,
      data: {},
    };

    const renderedComponent = shallowIntlWrap(
      <NodePage
        match={match}
        location={location}
        dispatch={dispatch}
        node={node}
        accounts={accounts}
      />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });

  it('should dispatch loadNode when id exists', () => {
    const match = {
      params: {
        id: '0001',
      },
    };

    const accounts = {
      loading: false,
      error: false,
      data: [],
    };
    const node = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <NodePage
        match={match}
        location={location}
        dispatch={dispatch}
        node={node}
        accounts={accounts}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });
});
