/**
 *
 * Card
 *
 */

import React from 'react';
import styled from 'styled-components';

export const CardWrapper = styled.div`
  margin: 2px 4px 10px;
`;

/* eslint-disable react/prefer-stateless-function */
class Card extends React.PureComponent {
  render() {
    return (
      <CardWrapper className="card col-md-5 col-xs-2">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card
          </p>
        </div>
      </CardWrapper>
    );
  }
}

Card.propTypes = {};

export default Card;
