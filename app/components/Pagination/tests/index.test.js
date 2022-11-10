import React from 'react';
import { shallowIntlWrap } from 'testHelper';

import Pagination from '../index';

describe('<Pagination />', () => {
  it('should render <ul> pagination element', () => {
    const renderedComponent = shallowIntlWrap(
      <Pagination
        page={4}
        sort="id"
        order="desc"
        link="/api"
        limit={10}
        count={10}
        onPageChange={() => {}}
      />,
    );

    expect(renderedComponent.find('ul').length).toEqual(1);
    expect(renderedComponent.find('ul').hasClass('pagination')).toEqual(true);
  });

  it('should render first, previous, current, next and last buttons', () => {
    const renderedComponent = shallowIntlWrap(
      <Pagination
        page={2}
        sort="id"
        order="desc"
        limit={10}
        count={1000}
        link="/api"
        onPageChange={() => {}}
      />,
    );

    expect(renderedComponent.find('ul').length).toEqual(1);
    expect(renderedComponent.find('ul').hasClass('pagination')).toEqual(true);

    expect(renderedComponent.find('Item').length).toEqual(7);
  });
});
