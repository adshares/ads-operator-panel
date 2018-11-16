/**
 *
 * MessagesListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { Link } from 'react-router-dom';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ListView from 'components/organisms/ListView';
import { makeSelectMessages } from './selectors';
import reducer from './reducer';
import saga from './saga';
import msg from './messages';
import { loadMessages } from './actions';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';

/* eslint-disable react/prefer-stateless-function */
export class MessagesListPage extends React.PureComponent {
  render() {
    const columnsMobile = {
      id: <FormattedMessage {...msg.columnId} />,
      transaction_count: <FormattedMessage {...msg.columnTransactionCount} />,
      time: <FormattedMessage {...msg.columnTime} />,
    };

    const columns = {
      id: <FormattedMessage {...msg.columnId} />,
      hash: <FormattedMessage {...msg.columnHash} />,
      node_id: <FormattedMessage {...msg.columnNodeId} />,
      block_id: <FormattedMessage {...msg.columnBlockId} />,
      transaction_count: <FormattedMessage {...msg.columnTransactionCount} />,
      time: <FormattedMessage {...msg.columnTime} />,
    };

    const ceilConfiguration = {
      id: value => <Link to={`/blockexplorer/messages/${value}`}>{value}</Link>,
      time: value => <div title={value}> {moment(value).fromNow()} </div>,
      node_id: value => (
        <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>
      ),
      block_id: value => (
        <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
      ),
    };

    const sortingColumns = [
      'id',
      'node_id',
      'block_id',
      'transaction_count',
      'time',
    ];
    const { match, location, messages, onPageChange, breakpoint } = this.props;

    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(msg.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(msg.metaDescription)}
          />
        </Helmet>
        <h1>
          <FormattedMessage {...msg.header} />
        </h1>
        <ListView
          name="messages"
          urlParams={match.params}
          query={location.search}
          list={messages}
          columns={isMobile ? columnsMobile : columns}
          sortingColumns={sortingColumns}
          defaultSort="time"
          messages={messages}
          link="/blockexplorer/messages"
          onPageChange={onPageChange}
          tableMinWidth={config.tablesMinWidth.tableXs}
          ceilConfiguration={ceilConfiguration}
          breakpoint={breakpoint}
        />
      </div>
    );
  }
}

MessagesListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  messages: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

MessagesListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadMessages(config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'messagesListPage', reducer });
const withSaga = injectSaga({ key: 'messagesListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MessagesListPage);
