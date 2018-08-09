import React from 'react';
import { mount } from 'enzyme';
import TableDataSet from '../index';

describe('<TableDataSet />', () => {
  it('should render <strong> element when data is empty', () => {
    const renderedComponent = mount(
      <TableDataSet
        name="table-test"
        columns={{}}
        data={[]}
        loading={false}
        error={false}
        messageNoData="no data"
      />,
    );

    expect(renderedComponent.find('div').length).toEqual(1);
    expect(renderedComponent.find('strong').length).toEqual(1);
    expect(renderedComponent.find('strong').text()).toEqual('no data');
  });

  it('should render an <table> tag and th when columns exist and data is not empty', () => {
    const renderedComponent = mount(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id' }}
        data={[{ id: 1 }]}
        loading={false}
        error={false}
      />,
    );

    expect(renderedComponent.find('table').length).toEqual(1);
    expect(renderedComponent.find('th').length).toEqual(1);
  });

  it('should render rows if data are not empty', () => {
    const renderedComponent = mount(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id', name: 'Name' }}
        data={[{ id: '0001', name: 'name-1' }, { id: '0002', name: 'name-2' }]}
        loading={false}
        error={false}
      />,
    );

    expect(renderedComponent.find('table').length).toEqual(1);
    expect(renderedComponent.find('tbody tr').length).toEqual(2);
    expect(renderedComponent.find('tbody td').length).toEqual(4);
  });

  it('should render cell only if column header exists', () => {
    const renderedComponent = mount(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id' }}
        data={[{ id: '0001', name: 'name-1' }, { id: '0002', name: '2' }]}
        loading={false}
        error={false}
      />,
    );

    expect(renderedComponent.find('table').length).toEqual(1);
    expect(renderedComponent.find('tbody tr').length).toEqual(2);
    expect(renderedComponent.find('tbody td').length).toEqual(2);
  });

  it('should render <LoadingIndicator> element when loading is in progress', () => {
    const renderedComponent = mount(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id' }}
        data={[{ id: '0001', name: 'name-1' }, { id: '0002', name: '2' }]}
        loading
        error={false}
      />,
    );

    expect(renderedComponent.find('LoadingIndicator').length).toEqual(1);
  });

  it('should render <ErrorMsg> element when error occurs', () => {
    const renderedComponent = mount(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id' }}
        data={[{ id: '0001', name: 'name-1' }, { id: '0002', name: '2' }]}
        loading={false}
        error={{ message: 'test' }}
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(1);
  });
});
