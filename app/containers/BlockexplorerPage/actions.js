/*
 *
 * BlockExplorerPage actions
 *
 */

import {
  LOAD_LATEST_NODES,
  LOAD_LATEST_NODES_SUCCESS,
  LOAD_LATEST_NODES_ERROR,
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_BLOCKS_SUCCESS,
  LOAD_LATEST_BLOCKS_ERROR,
  LOAD_LATEST_TRANSACTIONS,
  LOAD_LATEST_TRANSACTIONS_SUCCESS,
  LOAD_LATEST_TRANSACTIONS_ERROR,
} from './constants';

export function loadLatestNode() {
  return {
    type: LOAD_LATEST_NODES,
  };
}

export function latestNodesLoaded(nodes) {
  return {
    type: LOAD_LATEST_NODES_SUCCESS,
    nodes,
  };
}

export function latestNodesLoadingError(error) {
  return {
    type: LOAD_LATEST_NODES_ERROR,
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
