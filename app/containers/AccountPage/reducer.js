/*
 *
 * AccountPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ACCOUNT,
  LOAD_ACCOUNT_ERROR,
  LOAD_ACCOUNT_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  account: {
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

function accountPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACCOUNT:
      return state
        .setIn(['account', 'loading'], true)
        .setIn(['account', 'error'], false)
        .setIn(['account', 'data'], initialState.getIn(['account', 'data']))
        .setIn(
          ['transactions', 'meta'],
          initialState.getIn(['transactions', 'meta']),
        );
    case LOAD_ACCOUNT_SUCCESS:
      return state
        .setIn(['account', 'loading'], false)
        .setIn(['account', 'error'], false)
        .setIn(['account', 'data'], fromJS(action.data));
    case LOAD_ACCOUNT_ERROR:
      return state
        .setIn(['account', 'loading'], false)
        .setIn(['account', 'error'], fromJS(action.error))
        .setIn(['account', 'data'], initialState.getIn(['account', 'data']));
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

export default accountPageReducer;
