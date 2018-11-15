import React from 'react';
import sinon from 'sinon';
import { shallowIntlWrap } from 'testHelper';
import messages from 'containers/BlocksListPage/messages';
import ListView from '../index';
import { breakpoints } from '../../../../utils/breakpoints';

const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<ListView />', () => {
  it('should render <ErrorMsg> when sorting column is wrong', () => {
    const query = '?sort=asd&order=asc';

    const availableColumns = ['id', 'title'];
    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        urlParams={{}}
        query={query}
        list={{}}
        columns={{}}
        sortingColumns={availableColumns}
        messages={messages}
        link="/blocks"
        breakpoint={breakpoint}
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(1);
  });

  it('should render <ErrorMsg> when order value is wrong', () => {
    const query = '?sort=id&order=none';
    const availableColumns = ['id', 'title'];
    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        urlParams={{}}
        query={query}
        list={{}}
        columns={{}}
        sortingColumns={availableColumns}
        messages={messages}
        link="/blocks"
        breakpoint={breakpoint}
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(1);
  });

  it('should render <section> when sort and order values are valid', () => {
    const sortingColumns = ['id', 'title'];
    const columns = {
      id: 'id',
      title: 'title',
    };

    const query = '?sort=id&order=desc';
    const list = {
      loading: false,
      error: false,
      data: [],
    };

    const onPageChange = () => {};
    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        urlParams={{}}
        query={query}
        list={list}
        columns={columns}
        sortingColumns={sortingColumns}
        messages={messages}
        link="/blocks"
        onPageChange={onPageChange}
        breakpoint={breakpoint}
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(0);
    expect(renderedComponent.find('section').length).toEqual(1);
    expect(renderedComponent.find('TableDataSet').length).toEqual(1);
  });

  it('should assign default sort and order', () => {
    const sortingColumns = ['id', 'title'];
    const columns = {
      id: 'id',
      title: 'title',
    };

    const list = {
      loading: false,
      error: false,
      data: [],
    };
    const onPageChange = sinon.spy();

    shallowIntlWrap(
      <ListView
        name="name"
        query=""
        urlParams={{}}
        list={list}
        columns={columns}
        sortingColumns={sortingColumns}
        messages={messages}
        link="/blocks"
        onPageChange={onPageChange}
        breakpoint={breakpoint}
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

    const query = '?sort=id&order=desc';
    const list = {
      loading: false,
      error: false,
      data: [],
    };
    const onPageChange = sinon.spy();

    const renderedComponent = shallowIntlWrap(
      <ListView
        name="name"
        query={query}
        urlParams={{}}
        list={list}
        columns={columns}
        sortingColumns={sortingColumns}
        messages={messages}
        link="/blocks"
        onPageChange={onPageChange}
        breakpoint={breakpoint}
      />,
    );
    const newQuery = '?sort=id&order=asc';

    renderedComponent.setProps({ query: newQuery });
    expect(onPageChange.callCount).toEqual(2);
  });
});
