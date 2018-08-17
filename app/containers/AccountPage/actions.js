/*
 *
 * AccountPage actions
 *
 */

import {
  LOAD_ACCOUNT,
  LOAD_ACCOUNT_SUCCESS,
  LOAD_ACCOUNT_ERROR,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export function loadAccount(id) {
  return {
    type: LOAD_ACCOUNT,
    id,
  };
}

export function accountLoaded(data) {
  return {
    type: LOAD_ACCOUNT_SUCCESS,
    data,
  };
}

export function accountLoadingError(error) {
  return {
    type: LOAD_ACCOUNT_ERROR,
    error,
  };
}

export function loadTransactions(accountId) {
  return {
    type: LOAD_TRANSACTIONS,
    accountId,
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
