import React from 'react';
import { shallow } from 'enzyme';

import { TransactionsListPage } from '../index';

describe('<TransactionsListPage />', () => {
  it('should render ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const transactions = {};

    const renderedComponent = shallow(
      <TransactionsListPage
        match={match}
        dispatch={dispatch}
        transactions={transactions}
      />,
    );
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
