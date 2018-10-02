import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowWrap } from 'testHelper';
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

  it('should render an <Table> tag and th when columns exist and data is not empty', () => {
    const renderedComponent = shallow(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id' }}
        data={[{ id: 1 }]}
        loading={false}
        error={false}
      />,
    );

    expect(renderedComponent.find('Table').length).toEqual(1);
    expect(renderedComponent.find('TableHeader').length).toEqual(1);
  });

  it('should render rows if data are not empty', () => {
    const renderedComponent = shallow(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id', name: 'Name' }}
        data={[{ id: '0001', name: 'name-1' }, { id: '0002', name: 'name-2' }]}
        loading={false}
        error={false}
      />,
    );
    expect(renderedComponent.find('Table').length).toEqual(1);
    expect(renderedComponent.find('TableBody TableRow').length).toEqual(2);
    expect(renderedComponent.find('TableCell').length).toEqual(4);
  });

  it('should render ceil only if column header exists', () => {
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
    const renderedComponent = shallow(
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

  it('should render headers including sorting fields', () => {
    const renderedComponent = shallowWrap(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id', title: 'Title' }}
        sortingColumns={['id']}
        sortBy="id"
        orderBy="desc"
        data={[{ id: '0001', name: 'name-1' }, { id: '0002', name: '2' }]}
        loading={false}
        error={false}
      />,
    );

    expect(renderedComponent.find('Link').length).toEqual(1);
  });

  it('should render headers including sorting fields', () => {
    const ceilConfiguration = {
      id: value => <p>{value}</p>,
    };
    const renderedComponent = mount(
      <TableDataSet
        name="table-test"
        columns={{ id: 'Id' }}
        data={[{ id: '0001', name: 'name-1' }, { id: '0002', name: '2' }]}
        ceilConfiguration={ceilConfiguration}
        loading={false}
        error={false}
      />,
    );

    expect(renderedComponent.find('p').length).toEqual(2);
    expect(
      renderedComponent
        .find('p')
        .at(0)
        .text(),
    ).toEqual('0001');

    expect(
      renderedComponent
        .find('p')
        .at(1)
        .text(),
    ).toEqual('0002');
  });
});
