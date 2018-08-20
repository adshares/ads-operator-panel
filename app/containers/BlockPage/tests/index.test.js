import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { BlockPage } from '../index';

describe('<BlockPage />', () => {
  it('should render h3, DetailView, LatestPanel elements', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const messages = {
      loading: false,
      error: false,
      data: [],
    };
    const block = {
      loading: false,
      error: false,
      data: {},
    };

    const renderedComponent = shallowIntlWrap(
      <BlockPage
        match={match}
        dispatch={dispatch}
        block={block}
        messages={messages}
      />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
    expect(renderedComponent.find('LatestPanel').length).toEqual(1);
  });

  it('should dispatch loadBlock and loadMessages when id exists', () => {
    const match = {
      params: {
        id: 'ABC11234',
      },
    };

    const messages = {
      loading: false,
      error: false,
      data: [],
    };
    const block = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <BlockPage
        match={match}
        dispatch={dispatch}
        block={block}
        messages={messages}
      />,
    );

    expect(dispatch.callCount).toEqual(2);
  });
});
