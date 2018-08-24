/**
 *
 * BlocksListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ListView from 'components/ListView';

import { makeSelectBlocks } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadBlocks } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class BlocksListPage extends React.PureComponent {
  render() {
    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      votes: <FormattedMessage {...messages.columnVotes} />,
      message_count: <FormattedMessage {...messages.columnMessageCount} />,
      transaction_count: (
        <FormattedMessage {...messages.columnTransactionCount} />
      ),
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const sortingColumns = ['id'];

    return (
      <ListView
        name="blocks"
        urlParams={this.props.match.params}
        list={this.props.blocks}
        columns={columns}
        sortingColumns={sortingColumns}
        defaultSort="id"
        messages={messages}
        link="/blockexplorer/blocks"
        onPageChange={this.props.onPageChange}
      />
    );
  }
}

BlocksListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  blocks: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadBlocks(config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'blocksListPage', reducer });
const withSaga = injectSaga({ key: 'blocksListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlocksListPage);
