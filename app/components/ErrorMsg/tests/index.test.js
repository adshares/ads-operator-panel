import React from 'react';
import { mount } from 'enzyme';

import ErrorMsg from '../index';

describe('<ErrorMsg />', () => {
  it('should render with text message', () => {
    const msg = 'Some error';
    const wrapper = mount(<ErrorMsg error={msg} />);
    expect(
      wrapper
        .find('div')
        .first()
        .text(),
    ).toBe(msg);
  });

  it('should render with error object', () => {
    const error = { message: 'Some error' };
    const wrapper = mount(<ErrorMsg error={error} />);
    expect(
      wrapper
        .find('div')
        .first()
        .text(),
    ).toBe(error.message);
  });
});
