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
        nextPage={false}
        link="/api"
        onPageChange={() => {}}
      />,
    );

    expect(renderedComponent.find('ul').length).toEqual(1);
    expect(renderedComponent.find('ul').hasClass('pagination')).toEqual(true);
  });

  it('should render previous, next and 1,2 buttons', () => {
    const renderedComponent = shallowIntlWrap(
      <Pagination
        page={2}
        sort="id"
        order="desc"
        nextPage={false}
        link="/api"
        onPageChange={() => {}}
        maxPages={10}
      />,
    );

    expect(renderedComponent.find('ul').length).toEqual(1);
    expect(renderedComponent.find('ul').hasClass('pagination')).toEqual(true);

    expect(renderedComponent.find('Item').length).toEqual(4);
  });

  it('should render previous, next and 1,2, ..., 3, 4 buttons', () => {
    const renderedComponent = shallowIntlWrap(
      <Pagination
        page={4}
        sort="id"
        order="desc"
        nextPage={false}
        link="/api"
        onPageChange={() => {}}
        maxPages={3}
      />,
    );

    expect(renderedComponent.find('ul').length).toEqual(1);
    expect(renderedComponent.find('ul').hasClass('pagination')).toEqual(true);

    expect(renderedComponent.find('Item').length).toEqual(7);
  });
});
