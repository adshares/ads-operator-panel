import React from 'react';
import { shallow } from 'enzyme';

import TransactionAddressLink from '../index';

describe('<TransactionAddressLink />', () => {
  it('Should render <span> element with value when  no address', () => {
    const renderedComponent = shallow(
      <TransactionAddressLink
        address="--"
        transactionLink="/"
        transactionId="0001:00000000:0001"
      />,
    );

    expect(renderedComponent.find('span').length).toEqual(1);
  });

  it('Should render <Link> and <strong> when multi transaction occurs', () => {
    const addresses = ['0001-00000000-0001', '0001-00000000-0002'];
    const renderedComponent = shallow(
      <TransactionAddressLink
        address={addresses}
        transactionLink="/"
        transactionId="0001:00000000:0001"
      />,
    );

    expect(renderedComponent.find('Link').length).toEqual(1);
    expect(renderedComponent.find('strong').length).toEqual(1);
  });

  it('Should render <Link> when there is only one target address', () => {
    const addresses = '0001-00000000-0001';

    const renderedComponent = shallow(
      <TransactionAddressLink
        address={addresses}
        transactionLink="/"
        transactionId="0001:00000000:0001"
      />,
    );

    expect(renderedComponent.find('Link').length).toEqual(1);
    expect(renderedComponent.find('strong').length).toEqual(0);
  });
});
