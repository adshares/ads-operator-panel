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

  it('should render <Tabs/>', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading={false} error={false} />,
    );
    expect(renderedComponent.find('Tabs').length).toEqual(1);
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
    expect(renderedComponent.find('Table').length).toEqual(0);
  });

  it('should render table view when table tab is selected', () => {
    const renderedComponent = shallow(
      <DetailView data={{}} fields={{}} loading={false} error={false} />,
    );

    renderedComponent.setState({ selectedTabId: 'table' });
    expect(renderedComponent.find('SyntaxHighlighter').length).toEqual(0);
    expect(renderedComponent.find('Table').length).toEqual(1);
  });
});
