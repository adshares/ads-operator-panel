import React from 'react';
import { shallow } from 'enzyme';
import DetailView from '../index';

describe('<DetailView />', () => {
  it('should render <LatestPanelWrapper>', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading={false} error={false} />,
    );

    expect(renderedComponent.find('LatestPanelWrapper').length).toEqual(1);
  });

  it('should render two tabs for table and code', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading={false} error={false} />,
    );

    expect(renderedComponent.find('LatestPanelWrapper').length).toEqual(1);
    expect(renderedComponent.find('ListItem').length).toEqual(2);
    expect(renderedComponent.find('ListItem Button').length).toEqual(2);
  });

  it('should render <LoadingIndicator /> when fetching data is in progress', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading error={false} />,
    );

    expect(renderedComponent.find('LoadingIndicator').length).toEqual(1);
  });

  it('should render <ErrorMsg /> when error occurs', () => {
    const renderedComponent = shallow(
      <DetailView
        data={{}}
        fields={{}}
        loading={false}
        error={{ message: 'some error' }}
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(1);
  });

  it('should render <ErrorMsg /> when error occurs', () => {
    const renderedComponent = shallow(
      <DetailView
        data={{}}
        fields={{}}
        loading={false}
        error={{ message: 'some error' }}
      />,
    );

    expect(renderedComponent.find('ErrorMsg').length).toEqual(1);
  });

  it('should render code view when code tab is selected', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading={false} error={false} />,
    );

    renderedComponent.setState({ selectedTabId: 'code' });
    expect(renderedComponent.find('SyntaxHighlighter').length).toEqual(1);
  });

  it('should render table view when table tab is selected', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading={false} error={false} />,
    );

    renderedComponent.setState({ selectedTabId: 'table' });
    expect(renderedComponent.find('SyntaxHighlighter').length).toEqual(0);
    expect(renderedComponent.find('ul').length).toEqual(1);
  });

  it('should assign `active` class to clicked element', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading={false} error={false} />,
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
});
