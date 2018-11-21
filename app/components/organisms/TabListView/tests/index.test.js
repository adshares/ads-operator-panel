import React from 'react';
import { mountIntlWrap } from 'testHelper';
import TabListView from '../index';
import { breakpoints } from '../../../../utils/breakpoints';

const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<TabListView />', () => {
  it('should render empty <div /> when there is no tabs', () => {
    const renderedComponent = mountIntlWrap(
      <TabListView
        tabs={[]}
        reakpoint={breakpoint}
        urlParams={{}}
        query="?sort=id"
        history={{}}
      />,
    );

    expect(renderedComponent.find('div').length).toEqual(1);
    expect(renderedComponent.find('TabListViewWrapper').length).toEqual(0);
  });

  it('should render <Tabs/> when at least one tab exists', () => {
    const list = {
      loading: false,
      error: false,
      data: [],
    };

    const tabs = [
      {
        id: 'messages',
        name: 'messages',
        list: { ...list },
        link: `/blockexplorer/nodes/01/messages`,
        columns: {},
        sortingColumns: ['id', 'node_id'],
      },
      {
        id: 'accounts',
        name: 'accounts',
        list: { ...list },
        link: `/blockexplorer/nodes/01/accounts`,
        columns: {},
        sortingColumns: ['id', 'node_id'],
      },
    ];

    const renderedComponent = mountIntlWrap(
      <TabListView
        tabs={tabs}
        breakpoint={breakpoint}
        urlParams={{}}
        query="?sort=id"
        history={{}}
      />,
    );
    expect(renderedComponent.find('Tabs').length).toEqual(1);
    expect(renderedComponent.find('TabButton').length).toEqual(2);
  });

  it('should render <TabListViewWrapper> when at least one tab exists', () => {
    const list = {
      loading: false,
      error: false,
      data: [],
    };

    const tabs = [
      {
        id: 'messages',
        name: 'messages',
        list: { ...list },
        link: `/blockexplorer/nodes/01/messages`,
        columns: {},
        sortingColumns: ['id', 'node_id'],
      },
    ];

    const renderedComponent = mountIntlWrap(
      <TabListView
        tabs={tabs}
        breakpoint={breakpoint}
        urlParams={{}}
        query="?sort=id"
        history={{}}
      />,
    );

    expect(renderedComponent.find('TabListViewWrapper').length).toEqual(1);
    expect(renderedComponent.find('TabListViewList').length).toEqual(1);
  });
});
