import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { BlocksListPage } from '../index';

describe('<BlocksListPage />', () => {
  const location = { search: '' };

  it('should render h3 and ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const blocks = {};

    const renderedComponent = shallowIntlWrap(
      <BlocksListPage
        match={match}
        location={location}
        dispatch={dispatch}
        blocks={blocks}
      />,
    );
    expect(renderedComponent.find('Title').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
