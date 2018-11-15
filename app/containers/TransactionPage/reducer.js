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
  transaction: {
    loading: false,
    error: false,
    data: {},
  },
});

function transactionPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTION:
      return state
        .setIn(['transaction', 'loading'], true)
        .setIn(['transaction', 'error'], false)
        .setIn(['transaction', 'data'], fromJS({}));
    case LOAD_TRANSACTION_SUCCESS:
      return state
        .setIn(['transaction', 'loading'], false)
        .setIn(['transaction', 'error'], false)
        .setIn(['transaction', 'data'], fromJS(action.data));
    case LOAD_TRANSACTION_ERROR:
      return state
        .setIn(['transaction', 'loading'], false)
        .setIn(['transaction', 'error'], fromJS(action.error))
        .setIn(['transaction', 'data'], fromJS({}));
    default:
      return state;
  }
}

export default transactionPageReducer;
