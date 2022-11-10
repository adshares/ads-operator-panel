import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_TOP_NODES,
  LOAD_TOP_ACCOUNTS,
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_MESSAGES,
  LOAD_LATEST_TRANSACTIONS,
} from './constants';
import {
  topNodesLoaded,
  topNodesLoadingError,
  topAccountsLoaded,
  topAccountsLoadingError,
  latestBlocksLoaded,
  latestBlocksLoadingError,
  latestMessagesLoaded,
  latestMessagesLoadingError,
  latestTransactionsLoaded,
  latestTransactionsLoadingError,
} from './actions';

import api from '../../api';

export function* getNodes() {
  try {
    const nodes = yield call(api.fetchNodes, 20, 0, 'balance');
    yield put(topNodesLoaded(nodes.data));
  } catch (err) {
    yield put(topNodesLoadingError(err));
  }
}

export function* getAccounts() {
  try {
    const accounts = yield call(api.fetchAccounts, 20, 0, 'balance');
    yield put(topAccountsLoaded(accounts.data));
  } catch (err) {
    yield put(topAccountsLoadingError(err));
  }
}

export function* getBlocks() {
  try {
    const blocks = yield call(api.fetchBlocks, 20, 0, 'time');
    yield put(latestBlocksLoaded(blocks.data));
  } catch (err) {
    yield put(latestBlocksLoadingError(err));
  }
}

export function* getMessages() {
  try {
    const messages = yield call(api.fetchMessages, 20, 0, 'time');
    yield put(latestMessagesLoaded(messages.data));
  } catch (err) {
    yield put(latestMessagesLoadingError(err));
  }
}

export function* getTransactions() {
  try {
    const transactions = yield call(api.fetchTransactions, 20, 0, 'time');
    yield put(latestTransactionsLoaded(transactions.data));
  } catch (err) {
    yield put(latestTransactionsLoadingError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_TOP_NODES, getNodes);
  yield takeLatest(LOAD_TOP_ACCOUNTS, getAccounts);
  yield takeLatest(LOAD_LATEST_BLOCKS, getBlocks);
  yield takeLatest(LOAD_LATEST_MESSAGES, getMessages);
  yield takeLatest(LOAD_LATEST_TRANSACTIONS, getTransactions);
}
