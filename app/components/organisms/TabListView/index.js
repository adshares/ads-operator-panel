/**
 *
 * TabListView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TabListViewWrapper, TabListViewList } from './styled';
import ListView from '../ListView/index';
import Tabs from '../../molecules/Tabs/Tabs';
import { breakpointIsMobile } from '../../../utils/responsiveHelpers';

/* eslint-disable react/prefer-stateless-function */
class TabListView extends React.PureComponent {
  constructor(props) {
    super(props);

    if (props.defaultTab) {
      this.state = {
        selectedTabId: props.defaultTab,
      };
    } else if (this.props.tabs[0]) {
      this.state = {
        selectedTabId: this.props.tabs[0].id,
      };
    }
  }

  handleTabSelection = tabId => {
    const selectedTab = this.getSelectedTab(tabId);

    this.setState({
      selectedTabId: selectedTab.id,
    });
    this.props.history.push(selectedTab.link);

    if (selectedTab.onPageChange) {
      const { id } = this.props.urlParams;
      if (id) {
        selectedTab.onPageChange(
          id,
          1,
          selectedTab.defaultSort,
          selectedTab.defaultOrder,
        );
        return;
      }
      selectedTab.onPageChange(
        1,
        selectedTab.defaultSort,
        selectedTab.defaultOrder,
      );
    }
  };

  getSelectedTab(tabId) {
    const tab = this.props.tabs.filter(item => item.id === tabId);

    return tab[0] || this.props.tabs[0];
  }

  render() {
    if (!this.props.tabs || this.props.tabs.length === 0) {
      return <div />;
    }

    const isMobile = breakpointIsMobile(this.props.breakpoint.size);
    const currentTab = this.getSelectedTab(this.state.selectedTabId);

    const {
      gridArea,
      tableMinWidth,
      breakpoint,
      tabs,
      query,
      urlParams,
    } = this.props;
    return (
      <TabListViewWrapper gridArea={gridArea}>
        <TabListViewList>
          <Tabs
            tabs={tabs}
            selectedTabId={this.state.selectedTabId}
            handleClick={id => this.handleTabSelection(id)}
          />
        </TabListViewList>
        <ListView
          name={currentTab.id}
          urlParams={urlParams}
          query={query}
          list={currentTab.list}
          columns={isMobile ? currentTab.columnsMobile : currentTab.columns}
          ceilConfiguration={currentTab.ceilConfiguration}
          headerConfiguration={currentTab.headerConfiguration}
          sortingColumns={currentTab.sortingColumns}
          defaultSort={currentTab.defaultSort}
          defaultOrder={currentTab.defaultOrder}
          link={currentTab.link}
          onPageChange={currentTab.onPageChange}
          breakpoint={breakpoint}
          tableMinWidth={tableMinWidth}
        />
      </TabListViewWrapper>
    );
  }
}

TabListView.propTypes = {
  tabs: PropTypes.array,
  urlParams: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  defaultTab: PropTypes.string,
  gridArea: PropTypes.string,
  tableMinWidth: PropTypes.string,
  breakpoint: PropTypes.object,
};

export default TabListView;
