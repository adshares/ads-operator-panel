/*
 *
 * BlockExplorerPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_LATEST_NODE,
  LOAD_LATEST_NODE_SUCCESS,
  LOAD_LATEST_NODE_ERROR,
  LOAD_LATEST_BLOCK,
  LOAD_LATEST_BLOCK_SUCCESS,
  LOAD_LATEST_BLOCK_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadLatestNode() {
  return {
    type: LOAD_LATEST_NODE,
  };
}

export function latestNodeLoaded(nodes) {
  return {
    type: LOAD_LATEST_NODE_SUCCESS,
    nodes,
  };
}

export function latestNodeLoadingError(error) {
  return {
    type: LOAD_LATEST_NODE_ERROR,
    error,
  };
}

export function loadLatestBlock() {
  return {
    type: LOAD_LATEST_BLOCK,
  };
}

export function latestBlockLoaded(blocks) {
  return {
    type: LOAD_LATEST_BLOCK_SUCCESS,
    blocks,
  };
}

export function latestBlockLoadingError(error) {
  return {
    type: LOAD_LATEST_BLOCK_ERROR,
    error,
  };
}
