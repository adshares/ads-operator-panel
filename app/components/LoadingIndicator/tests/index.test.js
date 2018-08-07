import React from 'react';
import { mount } from 'enzyme';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should render 13 divs', () => {
    const renderedComponent = mount(<LoadingIndicator />);
    expect(renderedComponent.find('div').length).toEqual(13);
  });
});
