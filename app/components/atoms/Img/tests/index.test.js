/* eslint-disable no-console */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Img from '../index';

const src = 'test.png';
const alt = 'test';
const component = (props = { height: '10px', margin: '20px' }) => (
  <Img src={src} alt={alt} {...props} />
);

describe('<Img />', () => {
  let renderedComponent;
  beforeAll(() => {
    renderedComponent = shallow(component());
  });

  it('Renders correctly', () => {
    const tree = renderer.create(component()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have an src attribute', () => {
    expect(renderedComponent.prop('src')).toEqual(src);
  });

  it('should have an alt attribute', () => {
    expect(renderedComponent.prop('alt')).toEqual(alt);
  });

  it('should not have a className attribute', () => {
    expect(renderedComponent.prop('className')).toBeUndefined();
  });

  it('should not adopt a srcset attribute', () => {
    expect(renderedComponent.prop('srcset')).toBeUndefined();
  });
});
