import React from 'react';
import { shallow } from 'enzyme';
import { FaCode } from 'react-icons/fa';
import Tabs from '../Tabs';

const tabs = [
  {
    id: 'Test',
    name: 'Test',
    icon: <FaCode />,
  },
  {
    id: 'Test2',
    name: 'Test2',
    icon: <FaCode />,
  },
];

describe('<Tabs />', () => {
  it('should render tabs', () => {
    const renderedComponent = shallow(
      <Tabs tabs={tabs} selectedTabId="Test" />,
    );

    expect(renderedComponent.find('TabButton').length).toEqual(2);
    expect(renderedComponent.find('IconWrapper').length).toEqual(2);
  });
});
