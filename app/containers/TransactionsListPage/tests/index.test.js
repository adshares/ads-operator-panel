import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { TransactionsListPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';

const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<TransactionsListPage />', () => {
  const location = { search: '' };

  it('should render h3 and ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const transactions = {};

    const renderedComponent = shallowIntlWrap(
      <TransactionsListPage
        match={match}
        location={location}
        dispatch={dispatch}
        transactions={transactions}
        breakpoint={breakpoint}
      />,
    );
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
