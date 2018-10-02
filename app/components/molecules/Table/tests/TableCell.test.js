import React from 'react';
import { mount } from 'enzyme';
import TableCell from '../TableCell';
const renderComponent = props => (
  <table>
    <tbody>
      <tr>
        <TableCell {...props} />
      </tr>
    </tbody>
  </table>
);

describe('<TableCell />', () => {
  it('should render <TableCell />', () => {
    const renderedComponent = mount(renderComponent({ value: 'test' }));
    expect(renderedComponent.find('TableCellStyled').length).toEqual(1);
    expect(renderedComponent.find('div').length).toEqual(1);
  });

  it('should render proper text from props', () => {
    const renderedComponent = mount(renderComponent({ value: 'test' }));

    expect(
      renderedComponent
        .find('TableCellStyled div')
        .at(0)
        .text(),
    ).toEqual('test');
  });

  it('should render element form props', () => {
    const element = <a href="test">test</a>;
    const renderedComponent = mount(renderComponent({ value: element }));

    expect(renderedComponent.find('a').length).toEqual(1);
    expect(
      renderedComponent
        .find('a')
        .at(0)
        .text(),
    ).toEqual('test');
  });
});
