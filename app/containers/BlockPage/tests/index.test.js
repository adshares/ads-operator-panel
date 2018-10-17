import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { BlockPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';

const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<BlockPage />', () => {
  const location = { search: '' };

  it('should render h3, DetailView, ListView elements', () => {
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
        location={location}
        dispatch={dispatch}
        block={block}
        messages={messages}
        breakpoint={breakpoint}
      />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });

  it('should dispatch loadBlock when id exists', () => {
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
        location={location}
        dispatch={dispatch}
        block={block}
        messages={messages}
        breakpoint={breakpoint}
      />,
    );

    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the same id should not call dispatch function', () => {
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

    const renderedComponent = shallowIntlWrap(
      <BlockPage
        match={match}
        location={location}
        dispatch={dispatch}
        block={block}
        messages={messages}
        breakpoint={breakpoint}
      />,
    );

    const newMatchProp = {
      params: {
        id: 'ABC11234',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(1);
  });

  it('Update component with the new id should call dispatch function', () => {
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

    const renderedComponent = shallowIntlWrap(
      <BlockPage
        match={match}
        location={location}
        dispatch={dispatch}
        block={block}
        messages={messages}
        breakpoint={breakpoint}
      />,
    );

    const newMatchProp = {
      params: {
        id: 'ABC112111',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(3);
  });
});
