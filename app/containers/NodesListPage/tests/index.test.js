import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { NodesListPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';
const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

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
        breakpoint={breakpoint}
      />,
    );
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
