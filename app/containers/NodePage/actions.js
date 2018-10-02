/*
 *
 * NodePage actions
 *
 */

import {
  LOAD_NODE,
  LOAD_NODE_SUCCESS,
  LOAD_NODE_ERROR,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
} from './constants';

export function loadNode(id) {
  return {
    type: LOAD_NODE,
    id,
  };
}

export function nodeLoaded(data) {
  return {
    type: LOAD_NODE_SUCCESS,
    data,
  };
}

export function nodeLoadingError(error) {
  return {
    type: LOAD_NODE_ERROR,
    error,
  };
}

export function loadAccounts(nodeId, limit, offset, sort, order) {
  return {
    type: LOAD_ACCOUNTS,
    nodeId,
    limit,
    offset,
    sort,
    order,
  };
}

export function accountsLoaded(data) {
  return {
    type: LOAD_ACCOUNTS_SUCCESS,
    data,
  };
}

export function accountsLoadingError(error) {
  return {
    type: LOAD_ACCOUNTS_ERROR,
    error,
  };
}
