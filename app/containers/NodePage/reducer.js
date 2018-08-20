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
  },
});

function nodePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NODE:
      return state
        .setIn(['node', 'loading'], true)
        .setIn(['node', 'error'], false)
        .setIn(['node', 'data'], fromJS({}));
    case LOAD_NODE_SUCCESS:
      return state
        .setIn(['node', 'loading'], false)
        .setIn(['node', 'error'], false)
        .setIn(['node', 'data'], fromJS(action.data));
    case LOAD_NODE_ERROR:
      return state
        .setIn(['node', 'loading'], false)
        .setIn(['node', 'error'], fromJS(action.error))
        .setIn(['node', 'data'], fromJS({}));
    case LOAD_ACCOUNTS:
      return state
        .setIn(['accounts', 'loading'], true)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], fromJS([]));
    case LOAD_ACCOUNTS_SUCCESS:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], fromJS(action.data));
    case LOAD_ACCOUNTS_ERROR:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], fromJS(action.error))
        .setIn(['accounts', 'data'], fromJS([]));
    default:
      return state;
  }
}

export default nodePageReducer;
