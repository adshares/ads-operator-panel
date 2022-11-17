/*
 *
 * SnapshotPage actions
 *
 */

import {
  LOAD_SNAPSHOT,
  LOAD_SNAPSHOT_SUCCESS,
  LOAD_SNAPSHOT_ERROR,
  LOAD_NODES,
  LOAD_NODES_SUCCESS,
  LOAD_NODES_ERROR,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
} from './constants';

export function loadSnapshot(id) {
  return {
    type: LOAD_SNAPSHOT,
    id,
  };
}

export function snapshotLoaded(data) {
  return {
    type: LOAD_SNAPSHOT_SUCCESS,
    data,
  };
}

export function snapshotLoadingError(error) {
  return {
    type: LOAD_SNAPSHOT_ERROR,
    error,
  };
}

export function loadNodes(snapshotId, limit, offset, sort, order) {
  return {
    type: LOAD_NODES,
    snapshotId,
    limit,
    offset,
    sort,
    order,
  };
}

export function nodesLoaded(data) {
  return {
    type: LOAD_NODES_SUCCESS,
    ...data,
  };
}

export function nodesLoadingError(error) {
  return {
    type: LOAD_NODES_ERROR,
    error,
  };
}

export function loadAccounts(snapshotId, limit, offset, sort, order) {
  return {
    type: LOAD_ACCOUNTS,
    snapshotId,
    limit,
    offset,
    sort,
    order,
  };
}

export function accountsLoaded(data) {
  return {
    type: LOAD_ACCOUNTS_SUCCESS,
    ...data,
  };
}

export function accountsLoadingError(error) {
  return {
    type: LOAD_ACCOUNTS_ERROR,
    error,
  };
}
