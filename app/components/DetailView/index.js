/**
 *
 * DetailView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/styles/hljs';
import { FaAlignJustify, FaCode } from 'react-icons/fa';
import {
  Button,
  LatestPanelWrapper,
  List,
  ListItem,
  IconWrapper,
} from './styled';
import ErrorMsg from '../ErrorMsg';
import LoadingIndicator from '../LoadingIndicator';

/* eslint-disable react/prefer-stateless-function */
class DetailView extends React.PureComponent {
  tabs = [
    {
      id: 'table',
      name: 'Table',
      icon: <FaAlignJustify />,
    },
    {
      id: 'code',
      name: 'Code',
      icon: <FaCode />,
    },
  ];

  constructor(props) {
    super(props);

    this.state = { selectedTabId: this.tabs[0].id };

    this.handleTabSelection = this.handleTabSelection.bind(this);
  }

  handleTabSelection(tabId) {
    const selectedTab = this.getSelectedTab(tabId);

    this.setState({
      selectedTabId: selectedTab.id,
    });
  }

  getSelectedTab(tabId) {
    const tab = this.tabs.filter(item => item.id === tabId);

    return tab[0];
  }

  renderIcon(icon) {
    if (typeof icon === 'object') {
      return <IconWrapper>{icon}</IconWrapper>;
    }

    return null;
  }

  renderTabs() {
    return this.tabs.map(tab => (
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
      return <ErrorMsg error={this.props.error} />;
    }

    if (this.props.loading) {
      return <LoadingIndicator />;
    }

    if (this.state.selectedTabId === this.tabs[1].id) {
      return (
        <div key="highlight_code" className="list-group-item row">
          <SyntaxHighlighter language="json" style={darcula}>
            {JSON.stringify(this.props.data, null, 2)}
          </SyntaxHighlighter>
        </div>
      );
    }

    const rows = [];
    if (this.state.selectedTabId === this.tabs[0].id) {
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

    return <ul className="list-group">{rows}</ul>;
  }

  render() {
    return (
      <LatestPanelWrapper className="row">
        <List className="nav">{this.renderTabs()}</List>
        <div className="col-md-12">{this.renderContent()}</div>
      </LatestPanelWrapper>
    );
  }
}

DetailView.propTypes = {
  data: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default DetailView;
