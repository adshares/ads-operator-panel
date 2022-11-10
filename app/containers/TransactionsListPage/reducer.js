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
  meta: { count: 0 },
  loading: false,
  error: false,
});

function transactionsListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', initialState.get('data'));
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data))
        .set('meta', fromJS(action.meta));
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', initialState.get('data'))
        .set('meta', initialState.get('meta'));
    default:
      return state;
  }
}

export default transactionsListPageReducer;
