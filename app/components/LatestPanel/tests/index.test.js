import React from 'react';
import { shallow } from 'enzyme';
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

  it('should assign `active` class to clicked element', () => {
    const tabs = [
      {
        id: 'block',
        name: 'Blocks',
        link: '/blockexplorer/blocks',
        data: [],
        columns: {},
      },
      {
        id: 'node',
        name: 'Nodes',
        link: '/blockexplorer/nodes',
        data: [],
        columns: {},
      },
    ];

    const renderedComponent = shallow(
      <LatestPanel tabs={tabs} loading={false} error={false} />,
    );

    expect(
      renderedComponent
        .find('ListItem Button')
        .at(0)
        .hasClass('active'),
    ).toEqual(true);
    expect(
      renderedComponent
        .find('ListItem Button')
        .at(1)
        .hasClass('active'),
    ).toEqual(false);

    renderedComponent
      .find('ListItem Button')
      .at(1)
      .simulate('click');
    expect(
      renderedComponent
        .find('ListItem Button')
        .at(0)
        .hasClass('active'),
    ).toEqual(false);
    expect(
      renderedComponent
        .find('ListItem Button')
        .at(1)
        .hasClass('active'),
    ).toEqual(true);

    renderedComponent
      .find('ListItem Button')
      .at(0)
      .simulate('click');
    expect(
      renderedComponent
        .find('ListItem Button')
        .at(0)
        .hasClass('active'),
    ).toEqual(true);
    expect(
      renderedComponent
        .find('ListItem Button')
        .at(1)
        .hasClass('active'),
    ).toEqual(false);
  });

  it('when `link` property is not empty .view-all class should be presented', () => {
    const tabs = [
      {
        id: 'block',
        name: 'Blocks',
        link: '/api/nodes',
        data: [],
        columns: {},
      },
    ];

    const renderedComponent = mountWrap(
      <LatestPanel tabs={tabs} loading={false} error={false} />,
    );

    expect(renderedComponent.find('ListItem').length).toEqual(2);
    expect(
      renderedComponent
        .find('ListItem')
        .at(1)
        .hasClass('view-all'),
    ).toEqual(true);
  });

  it('when `link` property is empty .view-all class should not be presented', () => {
    const tabs = [
      {
        id: 'block',
        name: 'Blocks',
        link: '',
        data: [],
        columns: {},
      },
    ];

    const renderedComponent = mountWrap(
      <LatestPanel tabs={tabs} loading={false} error={false} />,
    );

    expect(renderedComponent.find('ListItem').length).toEqual(1);
  });
});
