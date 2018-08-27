import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { NodesListPage } from '../index';

describe('<NodesListPage />', () => {
  it('should render h3, ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const nodes = {};

    const renderedComponent = shallowIntlWrap(
      <NodesListPage match={match} dispatch={dispatch} nodes={nodes} />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
