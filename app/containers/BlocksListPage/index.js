/**
 *
 * BlocksListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import TableDataSet from 'components/TableDataSet';
import Pagination from 'components/Pagination/Loadable';
import ErrorMsg from 'components/ErrorMsg';
import { makeSelectBlocks } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadBlocks } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class BlocksListPage extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    const page = params.page || 1;

    this.props.dispatch(
      loadBlocks(
        config.limit + 1,
        (page - 1) * config.limit,
        params.sort || 'id',
        params.order || 'desc',
      ),
    );
  }

  componentDidUpdate(nextProps) {
    const {
      match: { params },
    } = nextProps;

    const paramsFromProps = this.props.match.params;

    if (
      paramsFromProps.page !== params.page ||
      paramsFromProps.sort !== params.sort ||
      paramsFromProps.order !== params.order
    ) {
      this.props.onPageChange(
        paramsFromProps.page || 1,
        paramsFromProps.sort,
        paramsFromProps.order,
      );
    }
  }
  render() {
    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      message_count: <FormattedMessage {...messages.columnMessageCount} />,
      node_count: <FormattedMessage {...messages.columnNodeCount} />,
      transaction_count: (
        <FormattedMessage {...messages.columnTransactionCount} />
      ),
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const link = '/blockexplorer/blocks';
    const sortingColumns = [
      'id',
      'time',
      'message_count',
      'node_count',
      'transaction_count',
    ];
    const ceilConfiguration = {
      id: value => <Link to={`${link}/${value}`}>{value}</Link>,
    };

    const {
      match: { params },
    } = this.props;

    const page = parseInt(params.page || 1, 10);
    const sort = params.sort || 'id';
    const order = params.order || 'desc';
    const availableSortingFields = [
      'id',
      'time',
      'node_count',
      'message_count',
      'transaction_count',
    ];

    if (!availableSortingFields.includes(sort)) {
      return (
        <ErrorMsg error={this.context.intl.formatMessage(messages.sorting)} />
      );
    }

    if (order !== 'desc' && order !== 'asc') {
      return (
        <ErrorMsg error={this.context.intl.formatMessage(messages.ordering)} />
      );
    }
    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <h3>
          <FormattedMessage {...messages.header} />
        </h3>
        <TableDataSet
          name="blocks"
          columns={columns}
          link={link}
          sortingColumns={sortingColumns}
          sortBy={sort}
          orderBy={order}
          ceilConfiguration={ceilConfiguration}
          data={
            this.props.blocks.data.length > config.limit
              ? this.props.blocks.data.slice(0, -1)
              : this.props.blocks.data
          }
          loading={this.props.blocks.loading}
          error={this.props.blocks.error}
        />
        <Pagination
          link={link}
          page={page}
          sort={sort}
          order={order}
          nextPage={this.props.blocks.data.length > config.limit}
        />
      </div>
    );
  }
}

BlocksListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  blocks: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

BlocksListPage.contextTypes = {
  intl: intlShape,
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
