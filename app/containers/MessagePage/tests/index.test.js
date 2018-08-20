import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { MessagePage } from '../index';

describe('<MessagePage />', () => {
  it('should render h3, DetailView elements', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const message = {
      loading: false,
      error: false,
      data: {},
    };

    const renderedComponent = shallowIntlWrap(
      <MessagePage match={match} dispatch={dispatch} message={message} />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
  });

  it('should dispatch loadMessage when id exists', () => {
    const match = {
      params: {
        id: '0002:0000005A',
      },
    };

    const message = {
      loading: false,
      error: false,
      data: {},
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <MessagePage match={match} dispatch={dispatch} message={message} />,
    );

    expect(dispatch.callCount).toEqual(1);
  });
});
