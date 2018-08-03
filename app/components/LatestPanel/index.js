/**
 *
 * LatestPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TableDataSet from 'components/TableDataSet';

/* eslint-disable react/prefer-stateless-function */
class LatestPanel extends React.PureComponent {
  nodeColumns = {
    id: 'Id',
    account_count: 'Accounts',
    msid: 'Messages',
    balance: 'Balance',
    status: 'Status',
  };

  blockColumns = {
    id: 'Id',
    message_count: 'Messages',
    transaction_count: 'Transactions',
    time: 'Time',
  };

  constructor(props) {
    super(props);

    this.state = {
      name: 'Nodes',
      columns: this.nodeColumns,
    };

    this.handleTabSelection = this.handleTabSelection.bind(this);
  }

  handleTabSelection(type) {
    const handler = this.props.onTabSelection;
    handler(type);
    if (type === 'nodes') {
      this.setState({
        name: 'Nodes',
        columns: this.nodeColumns,
      });

      return;
    }

    this.setState({
      name: 'Blocks',
      columns: this.blockColumns,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <ul className="nav">
            <li className="nav-item active">
              <button onClick={() => this.handleTabSelection('nodes')}>Nodes</button>
            </li>
            <li className="nav-item">
              <button onClick={() => this.handleTabSelection('blocks')}>Blocks</button>
            </li>
            <li className="nav-item">
              <Link to="/blockexplorer/block">View all</Link>
            </li>
          </ul>
        </div>
        <TableDataSet
          name={this.state.name}
          columns={this.state.columns}
          data={this.props.data}
        />
      </div>
    );
  }
}

LatestPanel.propTypes = {
  data: PropTypes.any,
  onTabSelection: PropTypes.func.isRequired,
};

export default LatestPanel;
