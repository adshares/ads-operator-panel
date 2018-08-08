/*
 *
 * NodesListPage actions
 *
 */

import { LOAD_NODES, LOAD_NODES_SUCCESS, LOAD_NODES_ERROR } from './constants';

export function loadNodes(limit, offset, sort, order) {
  return {
    type: LOAD_NODES,
    limit,
    offset,
    sort,
    order,
  };
}

export function nodesLoaded(data) {
  return {
    type: LOAD_NODES_SUCCESS,
    data,
  };
}

export function nodesLoadingError(error) {
  return {
    type: LOAD_NODES_ERROR,
    error,
  };
}
