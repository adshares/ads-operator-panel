import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { TransactionsListPage } from '../index';

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
      />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
