/*
 *
 * NodePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_NODE,
  LOAD_NODE_SUCCESS,
  LOAD_NODE_ERROR,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  node: {
    loading: false,
    error: false,
    data: {},
  },
  accounts: {
    loading: false,
    error: false,
    data: [],
    meta: { count: 0 },
  },
  messages: {
    loading: false,
    error: false,
    data: [],
    meta: { count: 0 },
  },
  transactions: {
    loading: false,
    error: false,
    data: [],
    meta: { count: 0 },
  },
});

function nodePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NODE:
      return state
        .setIn(['node', 'loading'], true)
        .setIn(['node', 'error'], false)
        .setIn(['node', 'data'], initialState.getIn(['node', 'data']))
        .setIn(['accounts', 'meta'], initialState.getIn(['accounts', 'meta']))
        .setIn(['messages', 'meta'], initialState.getIn(['messages', 'meta']))
        .setIn(
          ['transactions', 'meta'],
          initialState.getIn(['transactions', 'meta']),
        );
    case LOAD_NODE_SUCCESS:
      return state
        .setIn(['node', 'loading'], false)
        .setIn(['node', 'error'], false)
        .setIn(['node', 'data'], fromJS(action.data));
    case LOAD_NODE_ERROR:
      return state
        .setIn(['node', 'loading'], false)
        .setIn(['node', 'error'], fromJS(action.error))
        .setIn(['node', 'data'], initialState.getIn(['node', 'data']));
    case LOAD_ACCOUNTS:
      return state
        .setIn(['accounts', 'loading'], true)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], initialState.getIn(['accounts', 'data']));
    case LOAD_ACCOUNTS_SUCCESS:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], fromJS(action.data))
        .setIn(['accounts', 'meta'], fromJS(action.meta));
    case LOAD_ACCOUNTS_ERROR:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], fromJS(action.error))
        .setIn(['accounts', 'data'], initialState.getIn(['accounts', 'data']))
        .setIn(['accounts', 'meta'], initialState.getIn(['accounts', 'meta']));
    case LOAD_MESSAGES:
      return state
        .setIn(['messages', 'loading'], true)
        .setIn(['messages', 'error'], false)
        .setIn(['messages', 'data'], initialState.getIn(['messages', 'data']));
    case LOAD_MESSAGES_SUCCESS:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], false)
        .setIn(['messages', 'data'], fromJS(action.data))
        .setIn(['messages', 'meta'], fromJS(action.meta));
    case LOAD_MESSAGES_ERROR:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], fromJS(action.error))
        .setIn(['messages', 'data'], initialState.getIn(['messages', 'data']))
        .setIn(['messages', 'meta'], initialState.getIn(['messages', 'meta']));
    case LOAD_TRANSACTIONS:
      return state
        .setIn(['transactions', 'loading'], true)
        .setIn(['transactions', 'error'], false)
        .setIn(
          ['transactions', 'data'],
          initialState.getIn(['transactions', 'data']),
        );
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], false)
        .setIn(['transactions', 'data'], fromJS(action.data))
        .setIn(['transactions', 'meta'], fromJS(action.meta));
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], fromJS(action.error))
        .setIn(
          ['transactions', 'data'],
          initialState.getIn(['transactions', 'data']),
        )
        .setIn(
          ['transactions', 'meta'],
          initialState.getIn(['transactions', 'meta']),
        );
    default:
      return state;
  }
}

export default nodePageReducer;
