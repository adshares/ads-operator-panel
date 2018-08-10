/**
 *
 * DetailView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/styles/hljs';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Button, LatestPanelWrapper, List, ListItem, IconWrapper } from './styled';

import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class DetailView extends React.PureComponent {
  constructor(props) {
    super(props);

    const defaultTab = this.props.tabs[0];

    if (defaultTab) {
      this.state = {
        selectedTabId: defaultTab.id,
      };
    }

    this.handleTabSelection = this.handleTabSelection.bind(this);
  }

  handleTabSelection(tabId) {
    const selectedTab = this.getSelectedTab(tabId);

    this.setState({
      selectedTabId: selectedTab.id,
    });
  }

  getSelectedTab(tabId) {
    const tab = this.props.tabs.filter(item => item.id === tabId);

    return tab[0] || this.props.tabs[0];
  }

  renderIcon(icon) {
    if (typeof icon === 'object') {
      return <IconWrapper>{icon}</IconWrapper>;
    }

    return null;
  }

  renderTabs() {
    return this.props.tabs.map(tab => (
      <ListItem className="nav-item" key={`tab_${tab.id}}`}>
        <Button
          className={this.state.selectedTabId === tab.id ? 'active' : ''}
          key={`button_${tab.id}`}
          onClick={() => this.handleTabSelection(tab.id)}
        >
          {this.renderIcon(tab.icon)}
          {tab.name}
        </Button>
      </ListItem>
    ));
  }

  renderContent() {
    if (this.props.error) {

    }

    if (this.props.loading) {

    }

    if (this.state.selectedTabId === 'code') {
      return (
        <div key="highlight_code" className="list-group-item row">
          <SyntaxHighlighter language="json" style={darcula}>
            {JSON.stringify(this.props.data, null, 2)}
          </SyntaxHighlighter>
        </div>
      );
    }

    const rows = [];
    if (this.state.selectedTabId === 'table') {
      Object.entries(this.props.data).forEach(([columnId, columnValue]) => {
        if (this.props.fields[columnId] !== undefined) {
          rows.push(
            <li key={`column_${columnId}`} className="list-group-item row">
              <span className="col-md-3">{this.props.fields[columnId]}</span>
              <span className="col-md-9">{columnValue}</span>
            </li>,
          );
        }
      });
    }

    return <ul className="list-group">{rows}</ul>
  }

  render() {
    return (
      <LatestPanelWrapper className="row">
        <List className="nav">
          {this.renderTabs()}
          <ListItem className="nav-item">
          </ListItem>
        </List>
        <div className="col-md-12">
          {this.renderContent()}
        </div>
      </LatestPanelWrapper>
    );
  }
}

DetailView.propTypes = {
  tabs: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default DetailView;
