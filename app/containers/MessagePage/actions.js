/*
 *
 * MessagePage actions
 *
 */

import {
  LOAD_MESSAGE,
  LOAD_MESSAGE_SUCCESS,
  LOAD_MESSAGE_ERROR,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from './constants';

export function loadMessage(id) {
  return {
    type: LOAD_MESSAGE,
    id,
  };
}

export function messageLoaded(data) {
  return {
    type: LOAD_MESSAGE_SUCCESS,
    data,
  };
}

export function messageLoadingError(error) {
  return {
    type: LOAD_MESSAGE_ERROR,
    error,
  };
}

export function loadTransactions(messageId) {
  return {
    type: LOAD_TRANSACTIONS,
    messageId,
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
