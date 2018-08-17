/*
 *
 * TransactionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_TRANSACTION,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTION_ERROR,
} from './constants';

export const initialState = fromJS({
  data: {},
  loading: false,
  error: false,
});

function transactionPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTION:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', fromJS({}));
    case LOAD_TRANSACTION_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case LOAD_TRANSACTION_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', fromJS({}));
    default:
      return state;
  }
}

export default transactionPageReducer;
