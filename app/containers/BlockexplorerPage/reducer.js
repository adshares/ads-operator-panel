/*
 *
 * BlockExplorerPage reducer
 *
 */

import { fromJS } from 'immutable';

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

export const initialState = fromJS({
  nodes: {
    loading: false,
    error: false,
    data: [],
  },
  blocks: {
    loading: false,
    error: false,
    data: [],
  },
  transactions: {
    loading: false,
    error: false,
    data: [],
  },
});

const blockexplorerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LATEST_NODES:
      return state
        .setIn(['nodes', 'loading'], true)
        .setIn(['nodes', 'error'], false)
        .setIn(['nodes', 'data'], []);
    case LOAD_LATEST_NODES_SUCCESS:
      return state
        .setIn(['nodes', 'loading'], false)
        .setIn(['nodes', 'error'], false)
        .setIn(['nodes', 'data'], fromJS(action.nodes));
    case LOAD_LATEST_NODES_ERROR:
      return state
        .setIn(['nodes', 'loading'], false)
        .setIn(['nodes', 'error'], fromJS(action.error))
        .setIn(['nodes', 'data'], []);
    case LOAD_LATEST_BLOCKS:
      return state
        .setIn(['blocks', 'loading'], true)
        .setIn(['blocks', 'error'], false)
        .setIn(['blocks', 'data'], []);
    case LOAD_LATEST_BLOCKS_SUCCESS:
      return state
        .setIn(['blocks', 'loading'], false)
        .setIn(['blocks', 'error'], false)
        .setIn(['blocks', 'data'], fromJS(action.blocks));
    case LOAD_LATEST_BLOCKS_ERROR:
      return state
        .setIn(['blocks', 'loading'], false)
        .setIn(['blocks', 'error'], fromJS(action.error))
        .setIn(['blocks', 'data'], []);
    case LOAD_LATEST_TRANSACTIONS:
      return state
        .setIn(['transactions', 'loading'], true)
        .setIn(['transactions', 'error'], false)
        .setIn(['transactions', 'data'], []);
    case LOAD_LATEST_TRANSACTIONS_SUCCESS:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], false)
        .setIn(['transactions', 'data'], fromJS(action.transactions));
    case LOAD_LATEST_TRANSACTIONS_ERROR:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], fromJS(action.error))
        .setIn(['transactions', 'data'], []);
    default:
      return state;
  }
};
export default blockexplorerReducer;
