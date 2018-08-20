/**
 *
 * MessagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/DetailView';
import { makeSelectMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadMessage } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class MessagePage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.dispatch(loadMessage(id));
    }
  }
  render() {
    const { id } = this.props.match.params;

    const fields = {
      id: <FormattedMessage {...messages.fieldId} />,
      node_id: <FormattedMessage {...messages.fieldNodeId} />,
      block_id: <FormattedMessage {...messages.fieldBlockId} />,
      transaction_count: (
        <FormattedMessage {...messages.fieldTransactionCount} />
      ),
      length: <FormattedMessage {...messages.fieldLength} />,
    };

    const metaDescription = this.context.intl.formatMessage(
      messages.metaDescription,
      { id },
    );

    return (
      <div>
        <Helmet>
          <title>
            {this.context.intl.formatMessage(messages.metaTitle, { id })}
          </title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <h3>
          <FormattedMessage {...messages.header} /> #{id}
        </h3>
        <DetailView
          fields={fields}
          data={this.props.message.data}
          loading={this.props.message.loading}
          error={this.props.message.error}
        />
      </div>
    );
  }
}

MessagePage.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

MessagePage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  message: makeSelectMessage(),
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

const withReducer = injectReducer({ key: 'messagePage', reducer });
const withSaga = injectSaga({ key: 'messagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MessagePage);
