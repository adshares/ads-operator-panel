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
import { FaAlignJustify, FaCode } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  LatestPanelWrapper,
  List,
  ListItem,
  IconWrapper,
  CopyToClipboardWrapper,
} from './styled';
import ErrorMsg from '../ErrorMsg';
import LoadingIndicator from '../LoadingIndicator';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class DetailView extends React.PureComponent {
  tabs = [
    {
      id: 'table',
      icon: <FaAlignJustify />,
    },
    {
      id: 'code',
      icon: <FaCode />,
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      selectedTabId: this.tabs[0].id,
      copied: false,
    };

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
          <FormattedMessage {...messages[tab.id]} />
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
            {this.getData()}
          </SyntaxHighlighter>
        </div>
      );
    }

    const rows = [];
    if (this.state.selectedTabId === this.tabs[0].id) {
      Object.entries(this.props.fields).forEach(([columnId, columnValue]) => {
        if (this.props.data[columnId] !== undefined) {
          rows.push(
            <li key={`column_${columnId}`} className="list-group-item row">
              <span className="col-md-3">{columnValue}</span>
              <span className="col-md-9">{this.props.data[columnId]}</span>
            </li>,
          );
        }
      });
    }

    return <ul className="list-group">{rows}</ul>;
  }

  getData() {
    return JSON.stringify(this.props.data, null, 2);
  }

  render() {
    const buttonClassName = this.state.copied ? 'btn-secondary' : 'btn-primary';

    return (
      <LatestPanelWrapper className="row">
        <List className="nav">{this.renderTabs()}</List>
        <div className="col-md-12">{this.renderContent()}</div>
        <CopyToClipboardWrapper>
          <CopyToClipboard
            text={this.getData()}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button type="button" className={`btn ${buttonClassName}`}>
              Copy
            </Button>
          </CopyToClipboard>
        </CopyToClipboardWrapper>
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
