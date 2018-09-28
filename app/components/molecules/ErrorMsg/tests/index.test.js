import React from 'react';
import { shallow } from 'enzyme';

import ErrorMsg from '../index';

describe('<ErrorMsg />', () => {
  it('should render with text message', () => {
    const msg = 'Some error';
    const wrapper = shallow(<ErrorMsg error={msg} />);
    expect(
      wrapper
        .find('InfoSection .message')
        .first()
        .text(),
    ).toBe(msg);
  });

  it('should render with error object', () => {
    const error = { message: 'Some error' };
    const wrapper = shallow(<ErrorMsg error={error} />);
    expect(
      wrapper
        .find('InfoSection h1')
        .first()
        .text(),
    ).toBe(error.message);
  });
});
