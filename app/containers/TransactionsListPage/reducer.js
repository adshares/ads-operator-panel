/*
 *
 * TransactionsListPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export const initialState = fromJS({
  data: [],
  loading: false,
  error: false,
});

function transactionsListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', fromJS([]));
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default transactionsListPageReducer;
