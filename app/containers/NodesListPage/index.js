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
export class NodesListPage extends React.PureComponent {
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
  }

  componentDidMount() {
    this.props.dispatch(loadNodes(LIMIT + 1, this.state.offset, this.state.sort, this.state.order));
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
    } = nextProps;

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
  }

  render() {
    const columns = {
      id: 'Id',
      account_count: 'Accounts',
      msid: 'Messages count',
      balance: 'Balance',
      status: 'Status',
    };

    return (
      <div>
        <Helmet>
          <title>NodesListPage</title>
          <meta name="description" content="Description of NodesListPage" />
        </Helmet>
        <TableDataSet
          name="nodes"
          columns={columns}
          data={this.props.nodes.data.length > LIMIT ? this.props.nodes.data.slice(0, -1) : this.props.nodes.data}
          loading={this.props.nodes.loading}
          error={this.props.nodes.error}
        />
        <Pagination
          link="/blockexplorer/nodes"
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
