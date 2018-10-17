import React from 'react';
import { shallow } from 'enzyme';
import DirectionTableCell from '../DirectionTableCell';
const TYPE_DEFAULT = 'in';

describe('<DirectionTableCell />', () => {
  it('should render <DirectionTableCell />', () => {
    const renderedComponent = shallow(
      <DirectionTableCell value={TYPE_DEFAULT} />,
    );
    expect(renderedComponent.find('div').length).toEqual(1);
    expect(renderedComponent.find('FaSignInAlt').length).toEqual(1);
    expect(renderedComponent.find('FaSignOutAlt').length).toEqual(0);
  });
});
