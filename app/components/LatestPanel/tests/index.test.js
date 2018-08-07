import React from 'react';
import { mountWrap } from 'testHelper';
import LatestPanel from '../index';

describe('<LatestPanel />', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });

  it('should render empty <div /> when there is no tabs', () => {
    const tabs = [];
    const renderedComponent = mountWrap(
      <LatestPanel tabs={tabs} loading={false} error={false} />,
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
