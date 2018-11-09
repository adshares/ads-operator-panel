/*
 *
 * BlockExplorerPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_TOP_NODES,
  LOAD_TOP_NODES_SUCCESS,
  LOAD_TOP_NODES_ERROR,
  LOAD_TOP_ACCOUNTS,
  LOAD_TOP_ACCOUNTS_ERROR,
  LOAD_TOP_ACCOUNTS_SUCCESS,
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

export const initialState = fromJS({
  nodes: {
    loading: false,
    error: false,
    data: [],
  },
  accounts: {
    loading: false,
    error: false,
    data: [],
  },
  blocks: {
    loading: false,
    error: false,
    data: [],
  },
  messages: {
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

const blockexplorerDashboardPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOP_NODES:
      return state
        .setIn(['nodes', 'loading'], true)
        .setIn(['nodes', 'error'], false)
        .setIn(['nodes', 'data'], fromJS([]));
    case LOAD_TOP_NODES_SUCCESS:
      return state
        .setIn(['nodes', 'loading'], false)
        .setIn(['nodes', 'error'], false)
        .setIn(['nodes', 'data'], fromJS(action.nodes));
    case LOAD_TOP_NODES_ERROR:
      return state
        .setIn(['nodes', 'loading'], false)
        .setIn(['nodes', 'error'], fromJS(action.error))
        .setIn(['nodes', 'data'], fromJS([]));
    case LOAD_TOP_ACCOUNTS:
      return state
        .setIn(['accounts', 'loading'], true)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], fromJS([]));
    case LOAD_TOP_ACCOUNTS_SUCCESS:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], fromJS(action.accounts));
    case LOAD_TOP_ACCOUNTS_ERROR:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], fromJS(action.error))
        .setIn(['accounts', 'data'], fromJS([]));
    case LOAD_LATEST_BLOCKS:
      return state
        .setIn(['blocks', 'loading'], true)
        .setIn(['blocks', 'error'], false)
        .setIn(['blocks', 'data'], fromJS([]));
    case LOAD_LATEST_BLOCKS_SUCCESS:
      return state
        .setIn(['blocks', 'loading'], false)
        .setIn(['blocks', 'error'], false)
        .setIn(['blocks', 'data'], fromJS(action.blocks));
    case LOAD_LATEST_BLOCKS_ERROR:
      return state
        .setIn(['blocks', 'loading'], false)
        .setIn(['blocks', 'error'], fromJS(action.error))
        .setIn(['blocks', 'data'], fromJS([]));
    case LOAD_LATEST_MESSAGES:
      return state
        .setIn(['messages', 'loading'], true)
        .setIn(['accounts', 'error'], false)
        .setIn(['messages', 'data'], fromJS([]));
    case LOAD_LATEST_MESSAGES_SUCCESS:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], false)
        .setIn(['messages', 'data'], fromJS(action.messages));
    case LOAD_LATEST_MESSAGES_ERROR:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], fromJS(action.error))
        .setIn(['messages', 'data'], fromJS([]));
    case LOAD_LATEST_TRANSACTIONS:
      return state
        .setIn(['transactions', 'loading'], true)
        .setIn(['transactions', 'error'], false)
        .setIn(['transactions', 'data'], fromJS([]));
    case LOAD_LATEST_TRANSACTIONS_SUCCESS:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], false)
        .setIn(['transactions', 'data'], fromJS(action.transactions));
    case LOAD_LATEST_TRANSACTIONS_ERROR:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], fromJS(action.error))
        .setIn(['transactions', 'data'], fromJS([]));
    default:
      return state;
  }
};
export default blockexplorerDashboardPageReducer;
