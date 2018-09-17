import React from 'react';
import { shallow } from 'enzyme';

import Search from '../index';
import { breakpoints } from '../../../../utils/breakpoints';

const breakpoint = {
  name: 'desktopSm',
  size: breakpoints.desktopSm,
};

describe('<Search />', () => {
  it('should render proper mobile view - <SearchWrapper> and <Button/>', () => {
    const breakpointSmall = {
      name: 'tabletSm',
      size: breakpoints.tabletSm,
    };
    const renderedComponent = shallow(
      <Search history={{}} breakpoint={breakpointSmall} />,
    );

    expect(renderedComponent.find('SearchWrapper').length).toEqual(1);
    expect(renderedComponent.find('Button').length).toEqual(1);
  });

  it('should show <Form/> after <Button/> click', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const renderedComponent = shallow(
      <Search history={{}} breakpoint={breakpoint} />,
    );
    const button = renderedComponent.find('Button');
    button.simulate('click', fakeEvent);
    expect(renderedComponent.find('Form').length).toEqual(1);
    expect(renderedComponent.find('Input').length).toEqual(1);
  });

  it('should render proper desktop view - <SearchWrapper>, <Form/>, <Input/>, <Button/>', () => {
    const renderedComponent = shallow(
      <Search history={{}} breakpoint={breakpoint} />,
    );

    expect(renderedComponent.find('SearchWrapper').length).toEqual(1);
    expect(renderedComponent.find('Form').length).toEqual(1);
    expect(renderedComponent.find('Input').length).toEqual(1);
    expect(renderedComponent.find('Button').length).toEqual(1);
  });

  it('should redirect to node view page when recognized node id', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const history = {
      value: null,
      push: param => {
        history.value = param;
        return null;
      },
    };
    const renderedComponent = shallow(
      <Search history={history} breakpoint={breakpoint} />,
    );
    renderedComponent.setState({ value: '0001' });

    const form = renderedComponent.find('Form');
    form.simulate('submit', fakeEvent);
    expect(history.value).toEqual('/blockexplorer/nodes/0001');
  });

  it('should redirect to block view page when recognized block id', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const history = {
      value: null,
      push: param => {
        history.value = param;
        return null;
      },
    };
    const renderedComponent = shallow(
      <Search history={history} breakpoint={breakpoint} />,
    );
    renderedComponent.setState({ value: 'FF112233' });

    const form = renderedComponent.find('Form');
    form.simulate('submit', fakeEvent);

    expect(history.value).toEqual('/blockexplorer/blocks/FF112233');
  });

  it('should redirect to message view page when recognized message id', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const history = {
      value: null,
      push: param => {
        history.value = param;
        return null;
      },
    };
    const renderedComponent = shallow(
      <Search history={history} breakpoint={breakpoint} />,
    );
    renderedComponent.setState({ value: '0001:00000001' });

    const form = renderedComponent.find('Form');
    form.simulate('submit', fakeEvent);

    expect(history.value).toEqual('/blockexplorer/messages/0001:00000001');
  });

  it('should redirect to account view page when recognized account id', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const history = {
      value: null,
      push: param => {
        history.value = param;
        return null;
      },
    };
    const renderedComponent = shallow(
      <Search history={history} breakpoint={breakpoint} />,
    );
    renderedComponent.setState({ value: '0001-00000000-9B6F' });

    const form = renderedComponent.find('Form');
    form.simulate('submit', fakeEvent);

    expect(history.value).toEqual('/blockexplorer/accounts/0001-00000000-9B6F');
  });

  it('should redirect to transaction view page when recognized transaction id', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const history = {
      value: null,
      push: param => {
        history.value = param;
        return null;
      },
    };
    const renderedComponent = shallow(
      <Search history={history} breakpoint={breakpoint} />,
    );
    renderedComponent.setState({ value: '0001:00000001:0001' });

    const form = renderedComponent.find('Form');
    form.simulate('submit', fakeEvent);

    expect(history.value).toEqual(
      '/blockexplorer/transactions/0001:00000001:0001',
    );
  });

  it('should do nothing when unknown id', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const history = {
      value: null,
      push: param => {
        history.value = param;
        return null;
      },
    };
    const renderedComponent = shallow(
      <Search history={history} breakpoint={breakpoint} />,
    );
    renderedComponent.setState({ value: '01:001:01' });

    const form = renderedComponent.find('Form');
    form.simulate('submit', fakeEvent);

    expect(history.value).toEqual(null);
  });

  it('should change to uppercase', () => {
    const fakeEvent = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };

    const history = {
      value: null,
      push: param => {
        history.value = param;
        return null;
      },
    };
    const renderedComponent = shallow(
      <Search history={history} breakpoint={breakpoint} />,
    );
    renderedComponent.setState({ value: 'abcdef11' });

    const form = renderedComponent.find('Form');
    form.simulate('submit', fakeEvent);

    expect(history.value).toEqual('/blockexplorer/blocks/ABCDEF11');
  });
});
