import React from 'react';
import { mountWrap } from 'testHelper';
import LatestPanel from '../index';

describe('<LatestPanel />', () => {
  it('should render empty <div /> when there is no tabs', () => {
    const renderedComponent = mountWrap(
      <LatestPanel tabs={[]} loading={false} error={false} />,
    );

    expect(renderedComponent.find('div').length).toEqual(1);
    expect(renderedComponent.find('LatestPanelWrapper').length).toEqual(0);
  });

  it('should render <ul> and <li> when at least one tab exists', () => {
    const tabs = [
      {
        id: 'block1',
        name: 'Blocks',
        link: '/blockexplorer/blocks',
        data: [],
        columns: {},
      },
      {
        id: 'block2',
        name: 'Blocks',
        link: '/blockexplorer/blocks',
        data: [],
        columns: {},
      },
    ];

    const renderedComponent = mountWrap(
      <LatestPanel tabs={tabs} loading={false} error={false} />,
    );

    expect(renderedComponent.find('ul').length).toEqual(1);
    expect(renderedComponent.find('li').length).toEqual(3);
  });

  it('should render <LatestPanelWrapper> when at least one tab exists', () => {
    const tabs = [
      {
        id: 'block',
        name: 'Blocks',
        link: '/blockexplorer/blocks',
        data: [],
        columns: {},
      },
    ];

    const renderedComponent = mountWrap(
      <LatestPanel tabs={tabs} loading={false} error={false} />,
    );

    expect(renderedComponent.find('ul').length).toEqual(1);
    expect(renderedComponent.find('li').length).toEqual(2);
  });
});
