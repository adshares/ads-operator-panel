/**
 *
 * BlocksListPage
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
import { makeSelectBlocks } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadBlocks } from './actions';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';

/* eslint-disable react/prefer-stateless-function */
export class BlocksListPage extends React.PureComponent {
  render() {
    const columnsMobile = {
      id: <FormattedMessage {...messages.columnId} />,
      message_and_transaction_count: (
        <FormattedMessage {...messages.columnMessageAndTransactionCount} />
      ),
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      votes: <FormattedMessage {...messages.columnVotes} />,
      message_count: <FormattedMessage {...messages.columnMessageCount} />,
      transaction_count: (
        <FormattedMessage {...messages.columnTransactionCount} />
      ),
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const ceilConfiguration = {
      id: value => <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>,
      time: value => <div title={value}> {moment(value).fromNow()} </div>,
    };

    const sortingColumns = ['id'];
    const { match, location, blocks, onPageChange, breakpoint } = this.props;

    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <ListView
          name="blocks"
          urlParams={match.params}
          query={location.search}
          list={blocks}
          columns={isMobile ? columnsMobile : columns}
          sortingColumns={sortingColumns}
          defaultSort="id"
          messages={messages}
          link="/blockexplorer/blocks"
          onPageChange={onPageChange}
          tableMinWidth={config.tablesMinWidth.tableXs}
          ceilConfiguration={ceilConfiguration}
          breakpoint={breakpoint}
        />
      </div>
    );
  }
}

BlocksListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  blocks: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

BlocksListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  breakpoint: state => state.get('breakpoint'),
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
