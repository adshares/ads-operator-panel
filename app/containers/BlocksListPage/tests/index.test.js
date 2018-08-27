import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { BlocksListPage } from '../index';

describe('<BlocksListPage />', () => {
  it('should render h3 and ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const blocks = {};

    const renderedComponent = shallowIntlWrap(
      <BlocksListPage match={match} dispatch={dispatch} blocks={blocks} />,
    );
    expect(renderedComponent.find('h3').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
