import React from 'react';
import { shallow } from 'enzyme';

import Search from '../index';

describe('<Search />', () => {
  it('should render <SearchWrapper>, form and input elements', () => {
    const renderedComponent = shallow(<Search history={{}} />);

    expect(renderedComponent.find('SearchWrapper').length).toEqual(1);
    expect(renderedComponent.find('form').length).toEqual(1);
    expect(renderedComponent.find('input').length).toEqual(1);
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
    const renderedComponent = shallow(<Search history={history} />);
    renderedComponent.setState({ value: '0001' });

    const form = renderedComponent.find('form');
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
    const renderedComponent = shallow(<Search history={history} />);
    renderedComponent.setState({ value: 'FF112233' });

    const form = renderedComponent.find('form');
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
    const renderedComponent = shallow(<Search history={history} />);
    renderedComponent.setState({ value: '0001:00000001' });

    const form = renderedComponent.find('form');
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
    const renderedComponent = shallow(<Search history={history} />);
    renderedComponent.setState({ value: '0001-00000000-9B6F' });

    const form = renderedComponent.find('form');
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
    const renderedComponent = shallow(<Search history={history} />);
    renderedComponent.setState({ value: '0001:00000001:0001' });

    const form = renderedComponent.find('form');
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
    const renderedComponent = shallow(<Search history={history} />);
    renderedComponent.setState({ value: '01:001:01' });

    const form = renderedComponent.find('form');
    form.simulate('submit', fakeEvent);

    expect(history.value).toEqual(null);
  });
});
