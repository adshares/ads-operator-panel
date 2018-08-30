import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render the page message', () => {
    const history = {
      value: null,
      push: val => {
        history.value = val;

        return null;
      },
    };

    shallow(<HomePage history={history} />);
    expect(history.value).toEqual('/blockexplorer');
  });
});
