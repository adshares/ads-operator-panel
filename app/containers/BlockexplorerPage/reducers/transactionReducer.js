/*
 *
 * BlockExplorerPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_LATEST_TRANSACTIONS,
  LOAD_LATEST_TRANSACTIONS_SUCCESS,
  LOAD_LATEST_TRANSACTIONS_ERROR,
} from './../constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  transactions: [],
});

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LATEST_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('transactions', []);
    case LOAD_LATEST_TRANSACTIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('transactions', action.transactions);
    case LOAD_LATEST_TRANSACTIONS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
};

export default transactionReducer;
