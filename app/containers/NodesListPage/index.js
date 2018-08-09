/**
 *
 * NodesListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNodesListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadNodes } from './actions';
import TableDataSet from '../../components/TableDataSet';

const LIMIT = 10;

/* eslint-disable react/prefer-stateless-function */
export class NodesListPage extends React.Component {
  constructor(props) {
    super(props);

    const {
      match: { params },
    } = this.props;

    const page = params.page || 1;

    this.props.dispatch(
      loadNodes(
        LIMIT + 1,
        (page - 1) * LIMIT,
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
      id: 'Id',
      account_count: 'Accounts',
      msid: 'Messages count',
      balance: 'Balance',
      status: 'Status',
    };
    const link = '/blockexplorer/nodes';
    const sortingColumns = ['id', 'msid'];
    const ceilConfiguration = {
      id: value => <Link to={`${link}/${value}`}>{value}</Link>,
    };

    const {
      match: { params },
    } = this.props;

    const page = parseInt(params.page || 1, 10);
    const sort = params.sort || 'id';
    const order = params.order || 'desc';

    return (
      <div>
        <Helmet>
          <title>List of nodes</title>
          <meta name="description" content="Blockexplorer nodes list" />
        </Helmet>
        <TableDataSet
          name="nodes"
          columns={columns}
          link={link}
          sortingColumns={sortingColumns}
          sortBy={sort}
          orderBy={order}
          ceilConfiguration={ceilConfiguration}
          data={
            this.props.nodes.data.length > LIMIT
              ? this.props.nodes.data.slice(0, -1)
              : this.props.nodes.data
          }
          loading={this.props.nodes.loading}
          error={this.props.nodes.error}
        />
        <Pagination
          link={link}
          page={page}
          sort={sort}
          order={order}
          nextPage={this.props.nodes.data.length > LIMIT}
        />
      </div>
    );
  }
}

NodesListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  nodes: PropTypes.object,
  onPageChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodesListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * LIMIT;
      return dispatch(loadNodes(LIMIT + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'nodesListPage', reducer });
const withSaga = injectSaga({ key: 'nodesListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NodesListPage);
