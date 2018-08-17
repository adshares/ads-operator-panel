/*
 *
 * TransactionsListPage actions
 *
 */

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export function loadTransactions(limit, offset, sort, order) {
  return {
    type: LOAD_TRANSACTIONS,
    limit,
    offset,
    sort,
    order,
  };
}

export function transactionsLoaded(data) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    data,
  };
}

export function transactionsLoadingError(error) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error,
  };
}
