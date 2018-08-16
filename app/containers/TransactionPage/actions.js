/*
 *
 * TransactionPage actions
 *
 */

import {
  LOAD_TRANSACTION,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTION_ERROR,
} from './constants';

export function loadTransaction(id) {
  return {
    type: LOAD_TRANSACTION,
    id,
  };
}

export function transactionLoaded(data) {
  return {
    type: LOAD_TRANSACTION_SUCCESS,
    data,
  };
}

export function tranasctionLoadingError(error) {
  return {
    type: LOAD_TRANSACTION_ERROR,
    error,
  };
}
