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
import { FaAlignJustify, FaCode } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LatestPanelWrapper, CopyToClipboardWrapper } from './styled';
import ErrorMsg from '../../molecules/ErrorMsg/index';
import LoadingIndicator from '../../LoadingIndicator/index';
import messages from './messages';
import { TEST_ENV_ACTIVE } from '../../../utils/checkEnv';
import {
  Table,
  TableBody,
  TableCellStyled,
  TableHeader,
  TableRow,
} from '../../molecules/Table/TableElements';
import Button from '../../atoms/Button/Button';
import { palette } from '../../../styleUtils/variables';
import { ScrollableWrapper } from '../../atoms/ScrollableWrapper';
import Container from '../../atoms/Container';
import Tabs from '../../molecules/Tabs/Tabs';

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
  }

  handleTabSelection = tabId => {
    const selectedTab = this.getSelectedTab(tabId);
    this.setState({
      selectedTabId: selectedTab.id,
    });
  };

  getSelectedTab(tabId) {
    const tab = this.tabs.filter(item => item.id === tabId);
    return tab[0];
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
          bgColor={palette.white}
          borderTop={palette.lightgray}
          minHeight="400px"
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
              <TableCellStyled
                textalign="left"
                textwrap="break-word"
                whitespace="unset"
              >
                {this.props.data[columnId]}
              </TableCellStyled>
            </TableRow>,
          );
        }
      });
    }

    return (
      <Container
        padding="16px"
        bgColor={palette.white}
        borderTop={palette.lightgray}
        minHeight="400px"
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
        <Tabs
          tabs={this.tabs}
          messages={messages}
          selectedTabId={this.state.selectedTabId}
          handleClick={id => this.handleTabSelection(id)}
        />

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
