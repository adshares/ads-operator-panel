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
    meta: { count: 0 },
  },
  transactions: {
    loading: false,
    error: false,
    data: [],
    meta: { count: 0 },
  },
});

function blockPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCK:
      return state
        .setIn(['block', 'loading'], true)
        .setIn(['block', 'error'], false)
        .setIn(['block', 'data'], initialState.getIn(['block', 'data']))
        .setIn(['messages', 'meta'], initialState.getIn(['messages', 'meta']))
        .setIn(
          ['transactions', 'meta'],
          initialState.getIn(['transactions', 'meta']),
        );
    case LOAD_BLOCK_SUCCESS:
      return state
        .setIn(['block', 'loading'], false)
        .setIn(['block', 'error'], false)
        .setIn(['block', 'data'], fromJS(action.data));
    case LOAD_BLOCK_ERROR:
      return state
        .setIn(['block', 'loading'], false)
        .setIn(['block', 'error'], fromJS(action.error))
        .setIn(['block', 'data'], initialState.getIn(['block', 'data']));
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

export default blockPageReducer;
