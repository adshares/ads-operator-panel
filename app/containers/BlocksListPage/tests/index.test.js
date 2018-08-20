import React from 'react';
import { shallow } from 'enzyme';
import { BlocksListPage } from '../index';

describe('<BlocksListPage />', () => {
  it('should render ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const blocks = {};

    const renderedComponent = shallow(
      <BlocksListPage match={match} dispatch={dispatch} blocks={blocks} />,
    );
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
