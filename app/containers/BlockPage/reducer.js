/*
 *
 * BlockPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_BLOCK,
  LOAD_BLOCK_SUCCESS,
  LOAD_BLOCK_ERROR,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  block: {
    loading: false,
    error: false,
    data: {},
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

function blockPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCK:
      return state
        .setIn(['block', 'loading'], true)
        .setIn(['block', 'error'], false)
        .setIn(['block', 'data'], fromJS({}));
    case LOAD_BLOCK_SUCCESS:
      return state
        .setIn(['block', 'loading'], false)
        .setIn(['block', 'error'], false)
        .setIn(['block', 'data'], fromJS(action.data));
    case LOAD_BLOCK_ERROR:
      return state
        .setIn(['block', 'loading'], false)
        .setIn(['block', 'error'], fromJS(action.error))
        .setIn(['block', 'data'], fromJS({}));
    case LOAD_MESSAGES:
      return state
        .setIn(['messages', 'loading'], true)
        .setIn(['messages', 'error'], false)
        .setIn(['messages', 'data'], fromJS([]));
    case LOAD_MESSAGES_SUCCESS:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], false)
        .setIn(['messages', 'data'], fromJS(action.data));
    case LOAD_MESSAGES_ERROR:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], fromJS(action.error))
        .setIn(['messages', 'data'], fromJS([]));
    case LOAD_TRANSACTIONS:
      return state
        .setIn(['transactions', 'loading'], true)
        .setIn(['transactions', 'error'], false)
        .setIn(['transactions', 'data'], fromJS([]));
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], false)
        .setIn(['transactions', 'data'], fromJS(action.data));
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], fromJS(action.error))
        .setIn(['transactions', 'data'], fromJS([]));
    default:
      return state;
  }
}

export default blockPageReducer;
