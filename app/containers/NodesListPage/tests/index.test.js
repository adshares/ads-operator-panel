import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { NodesListPage } from '../index';

describe('<NodesListPage />', () => {
  const location = { search: '' };

  it('should render h3, ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const nodes = {};

    const renderedComponent = shallowIntlWrap(
      <NodesListPage
        match={match}
        location={location}
        dispatch={dispatch}
        nodes={nodes}
      />,
    );
    expect(renderedComponent.find('Title').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
