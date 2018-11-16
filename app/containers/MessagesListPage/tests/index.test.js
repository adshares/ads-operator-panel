import React from 'react';
import { shallowIntlWrap } from 'testHelper';
import { MessagesListPage } from '../index';
import { breakpoints } from '../../../utils/breakpoints';
const breakpoint = {
  name: 'DesktopLg',
  size: breakpoints.desktopLg,
};

describe('<MessagesListPage />', () => {
  const location = { search: '' };

  it('should render h3 and ListView element', () => {
    const match = {
      params: {},
    };

    const dispatch = () => {};
    const messages = {};

    const renderedComponent = shallowIntlWrap(
      <MessagesListPage
        match={match}
        location={location}
        dispatch={dispatch}
        messages={messages}
        breakpoint={breakpoint}
      />,
    );
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('ListView').length).toEqual(1);
  });
});
