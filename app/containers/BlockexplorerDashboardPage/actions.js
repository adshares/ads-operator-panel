/*
 *
 * BlockExplorerPage actions
 *
 */

import {
  LOAD_TOP_NODES,
  LOAD_TOP_NODES_SUCCESS,
  LOAD_TOP_NODES_ERROR,
  LOAD_TOP_ACCOUNTS,
  LOAD_TOP_ACCOUNTS_SUCCESS,
  LOAD_TOP_ACCOUNTS_ERROR,
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_BLOCKS_SUCCESS,
  LOAD_LATEST_BLOCKS_ERROR,
  LOAD_LATEST_MESSAGES,
  LOAD_LATEST_MESSAGES_SUCCESS,
  LOAD_LATEST_MESSAGES_ERROR,
  LOAD_LATEST_TRANSACTIONS,
  LOAD_LATEST_TRANSACTIONS_SUCCESS,
  LOAD_LATEST_TRANSACTIONS_ERROR,
} from './constants';

export function loadTopNodes() {
  return {
    type: LOAD_TOP_NODES,
  };
}

export function topNodesLoaded(nodes) {
  return {
    type: LOAD_TOP_NODES_SUCCESS,
    nodes,
  };
}

export function topNodesLoadingError(error) {
  return {
    type: LOAD_TOP_NODES_ERROR,
    error,
  };
}

export function loadTopAccounts() {
  return {
    type: LOAD_TOP_ACCOUNTS,
  };
}

export function topAccountsLoaded(accounts) {
  return {
    type: LOAD_TOP_ACCOUNTS_SUCCESS,
    accounts,
  };
}

export function topAccountsLoadingError(error) {
  return {
    type: LOAD_TOP_ACCOUNTS_ERROR,
    error,
  };
}

export function loadLatestBlocks() {
  return {
    type: LOAD_LATEST_BLOCKS,
  };
}

export function latestBlocksLoaded(blocks) {
  return {
    type: LOAD_LATEST_BLOCKS_SUCCESS,
    blocks,
  };
}

export function latestBlocksLoadingError(error) {
  return {
    type: LOAD_LATEST_BLOCKS_ERROR,
    error,
  };
}

export function loadLatestsMessages() {
  return {
    type: LOAD_LATEST_MESSAGES,
  };
}

export function latestMessagesLoaded(messages) {
  return {
    type: LOAD_LATEST_MESSAGES_SUCCESS,
    messages,
  };
}

export function latestMessagesLoadingError(error) {
  return {
    type: LOAD_LATEST_MESSAGES_ERROR,
    error,
  };
}

export function loadLatestsTransactions() {
  return {
    type: LOAD_LATEST_TRANSACTIONS,
  };
}

export function latestTransactionsLoaded(transactions) {
  return {
    type: LOAD_LATEST_TRANSACTIONS_SUCCESS,
    transactions,
  };
}

export function latestTransactionsLoadingError(error) {
  return {
    type: LOAD_LATEST_TRANSACTIONS_ERROR,
    error,
  };
}
