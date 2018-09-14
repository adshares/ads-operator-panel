import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('<Header />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: false })),
    });
  });

  it('Should render HeaderWrapper, HeaderNav, Route and Brand', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find('HeaderWrapper').length).toEqual(1);
    expect(renderedComponent.find('MobileHamburgerMenu').length).toEqual(0);
    expect(renderedComponent.find('HeaderNav').length).toEqual(1);
    expect(renderedComponent.find('Route').length).toEqual(1);
    expect(renderedComponent.find('Brand').length).toEqual(1);
  });
});
