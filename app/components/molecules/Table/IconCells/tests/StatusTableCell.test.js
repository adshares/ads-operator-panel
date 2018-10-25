import React from 'react';
import { shallow } from 'enzyme';
import StatusTableCell from '../StatusTableCell';
const STATUS_DEFAULT = 0;

describe('<StatusTableCell />', () => {
  it('should render <StatusTableCell />', () => {
    const renderedComponent = shallow(
      <StatusTableCell value={STATUS_DEFAULT} />,
    );
    expect(renderedComponent.find('IconTableCell').length).toEqual(1);
    expect(renderedComponent.find('FaShieldAlt').length).toEqual(1);
    expect(renderedComponent.find('IconCellDescription').length).toEqual(0);
  });

  it('should render icon with text when gets showDesc props', () => {
    const renderedComponent = shallow(
      <StatusTableCell value={STATUS_DEFAULT} showDesc />,
    );
    expect(renderedComponent.find('IconCellDescription').length).toEqual(1);
  });
});
