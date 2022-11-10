/*
 *
 * MessagePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MESSAGE,
  LOAD_MESSAGE_ERROR,
  LOAD_MESSAGE_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  message: {
    loading: false,
    error: false,
    data: {},
  },
  transactions: {
    loading: false,
    error: false,
    data: [],
    meta: { count: 0 },
  },
});

function messagePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGE:
      return state
        .setIn(['message', 'loading'], true)
        .setIn(['message', 'error'], false)
        .setIn(['message', 'data'], initialState.getIn(['message', 'data']))
        .setIn(
          ['transactions', 'meta'],
          initialState.getIn(['transactions', 'meta']),
        );
    case LOAD_MESSAGE_SUCCESS:
      return state
        .setIn(['message', 'loading'], false)
        .setIn(['message', 'error'], false)
        .setIn(['message', 'data'], fromJS(action.data));
    case LOAD_MESSAGE_ERROR:
      return state
        .setIn(['message', 'loading'], false)
        .setIn(['message', 'error'], fromJS(action.error))
        .setIn(['message', 'data'], initialState.getIn(['message', 'data']));
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

export default messagePageReducer;
