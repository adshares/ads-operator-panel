import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('<Header />', () => {
  it('Expect to have unit tests specified', () => {
    const renderedComponent = shallow(<Header />);

    expect(renderedComponent.find('HeaderWrapper').length).toEqual(1);
    expect(renderedComponent.find('NavBar').length).toEqual(1);
    expect(renderedComponent.find('Route').length).toEqual(1);
    expect(renderedComponent.find('Img').length).toEqual(1);
  });
});
