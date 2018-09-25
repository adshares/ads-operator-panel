/**
 *
 * DetailView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import config from 'config';
import { darcula } from 'react-syntax-highlighter/styles/hljs';
import { FormattedMessage } from 'react-intl';
import { FaAlignJustify, FaCode } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  LatestPanelWrapper,
  IconWrapper,
  CopyToClipboardWrapper,
} from './styled';
import ErrorMsg from '../ErrorMsg';
import LoadingIndicator from '../LoadingIndicator';
import messages from './messages';
import { TEST_ENV_ACTIVE } from '../../utils/checkEnv';
import { TabButton } from '../atoms/Button/TabButton';
import List from '../atoms/List';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../molecules/Table/TableElements';
import Button from '../atoms/Button/Button';
import { palette } from '../../styleUtils/variables';
import { ScrollableWrapper } from '../atoms/ScrollableWrapper';
import Container from '../atoms/Container';

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
      <TabButton
        key={`tab_${tab.id}}`}
        className={this.state.selectedTabId === tab.id ? 'active' : ''}
        onClick={() => this.handleTabSelection(tab.id)}
      >
        {this.renderIcon(tab.icon)}
        <FormattedMessage {...messages[tab.id]} />
      </TabButton>
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
        <Container
          padding="16px"
          bgcolor={palette.white}
          borderTop={palette.lightgray}
          key="highlight_code"
          style={{ background: TEST_ENV_ACTIVE && 'rgba(255, 255, 255, .4)' }}
        >
          <SyntaxHighlighter language="json" style={darcula}>
            {this.getData()}
          </SyntaxHighlighter>
        </Container>
      );
    }

    const rows = [];
    if (this.state.selectedTabId === this.tabs[0].id) {
      Object.entries(this.props.fields).forEach(([columnId, columnValue]) => {
        if (this.props.data[columnId] !== undefined) {
          rows.push(
            <TableRow key={`column_${columnId}`}>
              <TableHeader textalign="left" bgcolor={palette.white} width="25%">
                {columnValue}
              </TableHeader>
              <TableCell
                textalign="left"
                textwrap="break-word"
                whitespace="unset"
              >
                {this.props.data[columnId]}
              </TableCell>
            </TableRow>,
          );
        }
      });
    }

    return (
      <Container
        padding="16px"
        bgcolor={palette.white}
        borderTop={palette.lightgray}
        key="highlight_code"
        style={{ background: TEST_ENV_ACTIVE && 'rgba(255, 255, 255, .4)' }}
      >
        <ScrollableWrapper>
          <Table tableMinWidth={config.tablesMinWidth.tableMd}>
            <TableBody>{rows}</TableBody>
          </Table>
        </ScrollableWrapper>
      </Container>
    );
  }

  getData() {
    return JSON.stringify(this.props.data, null, 2);
  }

  render() {
    const bgColor = this.state.copied ? palette.lightblue : palette.blue;
    return (
      <LatestPanelWrapper>
        <List>{this.renderTabs()}</List>

        {this.renderContent()}
        <CopyToClipboardWrapper>
          <CopyToClipboard
            text={this.getData()}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button padding="8px 24px" bgcolor={bgColor}>
              {this.state.copied ? 'copied' : 'copy'}
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
