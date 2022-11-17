import React from 'react';
import { shallow } from 'enzyme';
import LabelTableCell from '../LabelTableCell';

describe('<LabelTableCell />', () => {
  it('should render <LabelTableCell />', () => {
    const renderedComponent = shallow(
      <LabelTableCell value="Test" icon="FaFire" />,
    );
    expect(renderedComponent.find('IconTableCell').length).toEqual(1);
    expect(renderedComponent.find('FaFire').length).toEqual(1);
    expect(renderedComponent.find('IconCellDescription').length).toEqual(0);
  });

  it('should render icon with text when gets showDesc props', () => {
    const renderedComponent = shallow(
      <LabelTableCell value="Test 2" icon="FaShieldAlt" showDesc />,
    );
    expect(renderedComponent.find('IconTableCell').length).toEqual(1);
    expect(renderedComponent.find('FaShieldAlt').length).toEqual(1);
    expect(renderedComponent.find('IconCellDescription').length).toEqual(1);
  });
});
