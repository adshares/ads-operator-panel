/**
 *
 * TransactionsListPage
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
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import config from 'config';
import TableDataSet from 'components/TableDataSet';
import Pagination from 'components/Pagination/Loadable';
import { makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadTransactions } from './actions';
import ErrorMsg from '../../components/ErrorMsg';

/* eslint-disable react/prefer-stateless-function */
export class TransactionsListPage extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    const page = params.page || 1;

    this.props.dispatch(
      loadTransactions(
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
        paramsFromProps.page,
        paramsFromProps.sort,
        paramsFromProps.order,
      );
    }
  }

  render() {
    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      block_id: <FormattedMessage {...messages.columnBlockId} />,
      message_id: <FormattedMessage {...messages.columnMessageId} />,
      sender_address: <FormattedMessage {...messages.columnSenderAddress} />,
      target_address: <FormattedMessage {...messages.columnTargetAddress} />,
      sender_fee: <FormattedMessage {...messages.columnSenderFee} />,
      size: <FormattedMessage {...messages.columnSize} />,
      type: <FormattedMessage {...messages.columnType} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const link = '/blockexplorer/transactions';
    const sortingColumns = ['id', 'block_id', 'type'];
    const ceilConfiguration = {
      id: value => <Link to={`${link}/${value}`}>{value}</Link>,
    };

    const {
      match: { params },
    } = this.props;

    const page = parseInt(params.page || 1, 10);
    const sort = params.sort || 'block_id';
    const order = params.order || 'desc';

    if (sort !== 'id' && sort !== 'block_id' && sort !== 'type') {
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
          name="nodes"
          columns={columns}
          link={link}
          sortingColumns={sortingColumns}
          sortBy={sort}
          orderBy={order}
          ceilConfiguration={ceilConfiguration}
          data={
            this.props.transactions.data.length > config.limit
              ? this.props.transactions.data.slice(0, -1)
              : this.props.transactions.data
          }
          loading={this.props.transactions.loading}
          error={this.props.transactions.error}
        />
        <Pagination
          link={link}
          page={page}
          sort={sort}
          order={order}
          nextPage={this.props.transactions.data.length > config.limit}
        />
      </div>
    );
  }
}

TransactionsListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  transactions: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

TransactionsListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadTransactions(config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'transactionsListPage', reducer });
const withSaga = injectSaga({ key: 'transactionsListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionsListPage);
