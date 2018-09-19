import React from 'react';
import { shallow } from 'enzyme';

import Button from '../index';

const component = (props = {}) => <Button {...props} />;

describe('<Button />', () => {
  it('Renders correctly', () => {
    const renderedComponent = shallow(component());
    expect(renderedComponent.find('StyledButton').length).toEqual(1);
  });
});
