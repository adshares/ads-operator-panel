import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { AccountsListPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';
const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<AccountsListPage />', () => {
  const location = { search: '' };

  it('should render h3 and ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const accounts = {};

    const renderedComponent = shallowIntlWrap(
      <AccountsListPage
        match={match}
        location={location}
        dispatch={dispatch}
        accounts={accounts}
        breakpoint={breakpoint}
      />,
    );
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
