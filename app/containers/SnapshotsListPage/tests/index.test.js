import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { SnapshotsListPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';
const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<SnapshotsListPage />', () => {
  const location = { search: '' };

  it('should render h3 and ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const snapshots = {};

    const renderedComponent = shallowIntlWrap(
      <SnapshotsListPage
        match={match}
        location={location}
        dispatch={dispatch}
        snapshots={snapshots}
        breakpoint={breakpoint}
      />,
    );
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
