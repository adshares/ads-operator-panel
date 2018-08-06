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
  constructor(props) {
    super(props);

    const defaultTab = this.props.tabs[0];
    this.state = {
      selectedTabId: defaultTab.id,
    };

    this.handleTabSelection = this.handleTabSelection.bind(this);
  }

  handleTabSelection(tabId) {
    const selectedTab = this.getSelectedTab(tabId);

    this.setState({
      selectedTabId: selectedTab.id,
    });
  }

  generateHeader() {
    return this.props.tabs.map(tab => (
      <li className="nav-item" key={`tab_${tab.id}}`}>
        <button
          key={`button_${tab.id}`}
          onClick={() => this.handleTabSelection(tab.id)}
        >
          {tab.name}
        </button>
      </li>
    ));
  }

  getSelectedTab(tabId) {
    const tab = this.props.tabs.filter(item => item.id === tabId);

    return tab[0] || this.props.tabs[0];
  }

  render() {
    if (!this.props.tabs) {
      return <div />;
    }

    const currentTab = this.getSelectedTab(this.state.selectedTabId);

    return (
      <div>
        <div className="row">
          <ul className="nav">
            {this.generateHeader()}
            <li className="nav-item">
              <Link to={currentTab.link}>View all</Link>
            </li>
          </ul>
        </div>
        <TableDataSet
          name={currentTab.name}
          columns={currentTab.columns}
          data={currentTab.data}
          loading={this.props.loading}
          error={this.props.error}
        />
      </div>
    );
  }
}

LatestPanel.propTypes = {
  tabs: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default LatestPanel;
