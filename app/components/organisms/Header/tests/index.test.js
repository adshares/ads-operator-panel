import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';
import { breakpoints } from '../../../../utils/breakpoints';

describe('<Header />', () => {
  it('Renders correctly mobile view', () => {
    const breakpointTablet = {
      name: 'tabletSm',
      size: breakpoints.tabletSm,
    };
    const renderedComponent = shallow(<Header breakpoint={breakpointTablet} />);

    expect(renderedComponent.find('HeaderWrapper').length).toEqual(1);
    expect(renderedComponent.find('Brand').length).toEqual(1);
    expect(renderedComponent.find('NavBar').length).toEqual(0);
    expect(renderedComponent.find('MobileHamburgerMenu').length).toEqual(1);
    expect(renderedComponent.find('Route').length).toEqual(1);
  });

  it('Renders correctly small desktop view', () => {
    const breakpointSmall = {
      name: 'tabletSm',
      size: breakpoints.desktopSm,
    };

    const renderedComponent = shallow(<Header breakpoint={breakpointSmall} />);
    expect(renderedComponent.find('HeaderWrapper').length).toEqual(1);
    expect(renderedComponent.find('SmallHeaderNav').length).toEqual(1);
    expect(renderedComponent.find('MobileHamburgerMenu').length).toEqual(0);
    expect(renderedComponent.find('Route').length).toEqual(1);
    expect(renderedComponent.find('Brand').length).toEqual(1);
  });

  it('Renders correctly desktop view', () => {
    const breakpointLarge = {
      name: 'desktopLg',
      size: breakpoints.desktopLg,
    };

    const renderedComponent = shallow(<Header breakpoint={breakpointLarge} />);
    expect(renderedComponent.find('HeaderWrapper').length).toEqual(1);
    expect(renderedComponent.find('HeaderNav').length).toEqual(1);
    expect(renderedComponent.find('MobileHamburgerMenu').length).toEqual(0);
    expect(renderedComponent.find('Route').length).toEqual(1);
    expect(renderedComponent.find('Brand').length).toEqual(1);
  });
});
