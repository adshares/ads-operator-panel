/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';
import Image from './styled';

const Img = props => (
  <Image
    src={props.src}
    alt={props.alt}
    height={props.height}
    margin={props.margin}
  />
);

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
  margin: PropTypes.string,
};

export default Img;
