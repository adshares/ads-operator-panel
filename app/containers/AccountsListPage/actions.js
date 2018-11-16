/*
 *
 * AccountsListPage actions
 *
 */

import {
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
} from './constants';

export function loadAccounts(limit, offset, sort, order) {
  return {
    type: LOAD_ACCOUNTS,
    limit,
    offset,
    sort,
    order,
  };
}

export function accountsLoaded(data) {
  return {
    type: LOAD_ACCOUNTS_SUCCESS,
    data,
  };
}

export function accountsLoadingError(error) {
  return {
    type: LOAD_ACCOUNTS_ERROR,
    error,
  };
}
