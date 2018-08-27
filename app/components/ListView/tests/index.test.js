import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import messages from 'containers/BlocksListPage/messages';
import ListView from '../index';

describe('<ListView />', () => {
  it('should render <ErrorMsg> when sorting column is wrong', () => {
    const urlParms = {
      sort: 'asd',
      order: 'asc',
    };
    const availableColumns = ['id', 'title'];
    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        urlParams={urlParms}
        list={{}}
        columns={{}}
        sortingColumns={availableColumns}
        messages={messages}
        link="/blocks"
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(1);
  });

  it('should render <ErrorMsg> when order value is wrong', () => {
    const urlParms = {
      sort: 'id',
      order: 'none',
    };
    const availableColumns = ['id', 'title'];
    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        urlParams={urlParms}
        list={{}}
        columns={{}}
        sortingColumns={availableColumns}
        messages={messages}
        link="/blocks"
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(1);
  });

  it('should render <ListViewWrapper> when sort and order values are valid', () => {
    const sortingColumns = ['id', 'title'];
    const columns = {
      id: 'id',
      title: 'title',
    };

    const urlParams = {
      sort: 'id',
      order: 'desc',
    };
    const list = {
      loading: false,
      error: false,
      data: [],
    };

    const onPageChange = () => {};
    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        urlParams={urlParams}
        list={list}
        columns={columns}
        sortingColumns={sortingColumns}
        messages={messages}
        link="/blocks"
        onPageChange={onPageChange}
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(0);
    expect(renderedComponent.find('ListViewWrapper').length).toEqual(1);
    expect(renderedComponent.find('TableDataSet').length).toEqual(1);
  });

  it('should assign default sort and order', () => {
    const sortingColumns = ['id', 'title'];
    const columns = {
      id: 'id',
      title: 'title',
    };

    const urlParams = {};
    const list = {
      loading: false,
      error: false,
      data: [],
    };
    const onPageChange = sinon.spy();

    shallowIntlWrap(
      <ListView
        name="name"
        urlParams={urlParams}
        list={list}
        columns={columns}
        sortingColumns={sortingColumns}
        messages={messages}
        link="/blocks"
        onPageChange={onPageChange}
      />,
    );

    expect(onPageChange.callCount).toEqual(1);
  });

  it('should be invoked onPageChange on componentDidUpdate event', () => {
    const sortingColumns = ['id', 'title'];
    const columns = {
      id: 'id',
      title: 'title',
    };

    const urlParams = {
      sort: 'id',
      order: 'desc',
    };
    const list = {
      loading: false,
      error: false,
      data: [],
    };
    const onPageChange = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        urlParams={urlParams}
        list={list}
        columns={columns}
        sortingColumns={sortingColumns}
        messages={messages}
        link="/blocks"
        onPageChange={onPageChange}
      />,
    );
    const newUrlParams = {
      sort: 'id',
      order: 'asc',
    };

    renderedComponent.setProps({ urlParams: newUrlParams });
    expect(onPageChange.callCount).toEqual(2);
  });
});
