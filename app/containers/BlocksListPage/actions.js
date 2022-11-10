/*
 *
 * BlocksListPage actions
 *
 */

import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS_ERROR,
} from './constants';

export function loadBlocks(limit, offset, sort, order) {
  return {
    type: LOAD_BLOCKS,
    limit,
    offset,
    sort,
    order,
  };
}

export function blocksLoaded(data) {
  return {
    type: LOAD_BLOCKS_SUCCESS,
    ...data,
  };
}

export function blocksLoadingError(error) {
  return {
    type: LOAD_BLOCKS_ERROR,
    error,
  };
}
