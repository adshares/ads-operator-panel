/**
 *
 * LatestPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LatestPanelWrapper, ListItem, LatestPanelList } from './styled';
import TableDataSet from '../TableDataSet/index';
import Tabs from '../../molecules/Tabs/Tabs';

/* eslint-disable react/prefer-stateless-function */
class LatestPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    const defaultTab = this.props.tabs[0];

    if (defaultTab) {
      this.state = {
        selectedTabId: defaultTab.id,
      };
    }
  }

  handleTabSelection = tabId => {
    const selectedTab = this.getSelectedTab(tabId);

    this.setState({
      selectedTabId: selectedTab.id,
    });
  };

  renderViewAll(link) {
    if (link && link.length > 0) {
      return (
        <ListItem>
          <Link to={link}>View all</Link>
        </ListItem>
      );
    }

    return null;
  }

  getSelectedTab(tabId) {
    const tab = this.props.tabs.filter(item => item.id === tabId);

    return tab[0] || this.props.tabs[0];
  }

  render() {
    if (!this.props.tabs || this.props.tabs.length === 0) {
      return <div />;
    }
    const currentTab = this.getSelectedTab(this.state.selectedTabId);
    const { gridArea, loading, error, tableMinWidth } = this.props;

    return (
      <LatestPanelWrapper gridArea={gridArea}>
        <LatestPanelList>
          <Tabs
            tabs={this.props.tabs}
            selectedTabId={this.state.selectedTabId}
            handleClick={id => this.handleTabSelection(id)}
          />
          {this.renderViewAll(currentTab.link)}
        </LatestPanelList>
        <TableDataSet
          name={currentTab.name}
          columns={currentTab.columns}
          data={currentTab.data}
          ceilConfiguration={currentTab.ceilConfiguration || null}
          loading={loading}
          error={error}
          tableMinWidth={tableMinWidth}
        />
      </LatestPanelWrapper>
    );
  }
}

LatestPanel.propTypes = {
  tabs: PropTypes.array,
  gridArea: PropTypes.string,
  tableMinWidth: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default LatestPanel;
