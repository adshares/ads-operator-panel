import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import { SnapshotPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';

const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<SnapshotPage />', () => {
  const location = { search: '' };

  it('should render h3, DetailView, TabListView elements', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const snapshot = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const nodes = {
      loading: false,
      error: false,
      data: [],
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };

    const renderedComponent = shallowIntlWrap(
      <SnapshotPage
        match={match}
        location={location}
        dispatch={dispatch}
        snapshot={snapshot}
        nodes={nodes}
        accounts={accounts}
        breakpoint={breakpoint}
        history={{}}
      />,
    );
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('DetailView').length).toEqual(1);
    expect(renderedComponent.find('TabListView').length).toEqual(1);
  });

  it('should dispatch loadSnapshot when id exists', () => {
    const match = {
      params: {
        id: 'ABC11234',
      },
    };

    const snapshot = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const nodes = {
      loading: false,
      error: false,
      data: [],
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };

    const dispatch = sinon.spy();

    shallowIntlWrap(
      <SnapshotPage
        match={match}
        location={location}
        dispatch={dispatch}
        snapshot={snapshot}
        nodes={nodes}
        accounts={accounts}
        breakpoint={breakpoint}
        history={{}}
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

    const snapshot = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const nodes = {
      loading: false,
      error: false,
      data: [],
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <SnapshotPage
        match={match}
        location={location}
        dispatch={dispatch}
        snapshot={snapshot}
        nodes={nodes}
        accounts={accounts}
        breakpoint={breakpoint}
        history={{}}
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

    const snapshot = {
      loading: false,
      error: false,
      data: {},
      prettyData: {},
    };
    const nodes = {
      loading: false,
      error: false,
      data: [],
    };
    const accounts = {
      loading: false,
      error: false,
      data: [],
    };

    const dispatch = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <SnapshotPage
        match={match}
        location={location}
        dispatch={dispatch}
        snapshot={snapshot}
        nodes={nodes}
        accounts={accounts}
        breakpoint={breakpoint}
        history={{}}
      />,
    );

    const newMatchProp = {
      params: {
        id: 'ABC112111',
      },
    };

    renderedComponent.setProps({ match: newMatchProp });
    expect(dispatch.callCount).toEqual(4);
  });
});
