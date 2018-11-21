import { takeLatest, call, put } from 'redux-saga/effects';

import {
  LOAD_NODE,
  LOAD_ACCOUNTS,
  LOAD_MESSAGES,
  LOAD_TRANSACTIONS,
} from './constants';

import {
  nodeLoaded,
  nodeLoadingError,
  accountsLoaded,
  accountsLoadingError,
  messagesLoaded,
  messagesLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from './actions';

import api from '../../api';

export function* getNode(action) {
  try {
    const nodes = yield call(api.fetchNode, action.id);
    yield put(nodeLoaded(nodes));
  } catch (err) {
    yield put(nodeLoadingError(err));
  }
}

export function* getAccounts(action) {
  try {
    const accounts = yield call(
      api.fetchAccountsByNodeId,
      action.nodeId,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(accountsLoaded(accounts));
  } catch (err) {
    yield put(accountsLoadingError(err));
  }
}

export function* getMessages(action) {
  try {
    const messages = yield call(
      api.fetchMessagesByNodeId,
      action.nodeId,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(messagesLoaded(messages));
  } catch (err) {
    yield put(messagesLoadingError(err));
  }
}

export function* getTransactions(action) {
  try {
    const transactions = yield call(
      api.fetchTransactionsByNodeId,
      action.nodeId,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(transactionsLoaded(transactions));
  } catch (err) {
    yield put(transactionsLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_NODE, getNode);
  yield takeLatest(LOAD_ACCOUNTS, getAccounts);
  yield takeLatest(LOAD_MESSAGES, getMessages);
  yield takeLatest(LOAD_TRANSACTIONS, getTransactions);
}
