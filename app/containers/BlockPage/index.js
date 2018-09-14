/**
 *
 * BlockPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBlockPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class BlockPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>BlockPage</title>
          <meta name="description" content="Description of BlockPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

BlockPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blockpage: makeSelectBlockPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'blockPage', reducer });
const withSaga = injectSaga({ key: 'blockPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlockPage);
