import React from 'react';
import { shallow } from 'enzyme';
import { NodesListPage } from '../index';

describe('<NodesListPage />', () => {
  it('should render ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const nodes = {};

    const renderedComponent = shallow(
      <NodesListPage match={match} dispatch={dispatch} nodes={nodes} />,
    );
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
