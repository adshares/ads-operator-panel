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

const LIMIT = 1;

/* eslint-disable react/prefer-stateless-function */
export class NodesListPage extends React.Component {
  constructor(props) {
    super(props);

    const {
      match: { params },
    } = this.props;

    const page = params.page || 1;

    this.state = {
      page,
      offset: (page - 1) * LIMIT,
      sort: params.sort || 'id',
      order: params.order || 'desc',
      nextPage: this.props.nodes.data.length > LIMIT,
    };

    this.props.dispatch(
      loadNodes(
        LIMIT + 1,
        this.state.offset,
        this.state.sort,
        this.state.order,
      ),
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
    } = nextProps;

    const paramsOld = this.props.match.params;

    if (params.page && params.sort && params.order) {
      this.setState({
        page: params.page,
        sort: params.sort,
        order: params.order,
      });
    }

    this.setState({
      nextPage: nextProps.nodes.data.length > LIMIT,
    });

    if (
      paramsOld.page !== params.page ||
      paramsOld.sort !== params.sort ||
      paramsOld.order !== params.order
    ) {
      this.props.onPageChange(params.page, params.sort, params.order);
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
          sortBy={this.state.sort}
          orderBy={this.state.order}
          ceilConfiguration={ceilConfiguration}
          data={
            this.props.nodes.data.length > LIMIT
              ? this.props.nodes.data.slice(0, -1)
              : this.props.nodes.data
          }
          loading={this.props.nodes.loading}
          error={this.props.nodes.error}
          onChange={this.props.onPageChange}
        />
        <Pagination
          link={link}
          page={parseInt(this.state.page, 10)}
          sort={this.state.sort}
          order={this.state.order}
          nextPage={this.state.nextPage}
          onPageChange={this.props.onPageChange}
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
