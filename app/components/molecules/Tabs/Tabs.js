/**
 *
 * Tabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TabButton } from '../../atoms/Button/TabButton';
import List from '../../atoms/List';
import { IconWrapper } from '../../atoms/IconWrapper';

const Tabs = props => (
  <List>
    {props.tabs.map(tab => (
      <TabButton
        key={`tab_${tab.id}}`}
        active={props.selectedTabId === tab.id}
        onClick={() => props.handleClick(tab.id)}
      >
        {typeof tab.icon === 'object' && (
          <IconWrapper active={props.selectedTabId === tab.id}>
            {tab.icon}
          </IconWrapper>
        )}
        {props.messages ? (
          <FormattedMessage {...props.messages[tab.id]} />
        ) : (
          tab.name
        )}
      </TabButton>
    ))}
  </List>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object.isRequired),
  messages: PropTypes.object,
  selectedTabId: PropTypes.oneOf(
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ),
};

export default Tabs;
