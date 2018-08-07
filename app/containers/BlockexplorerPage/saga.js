// // import { take, call, put, select } from 'redux-saga/effects';
//
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_LATEST_NODES,
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_TRANSACTIONS,
} from './constants';
import {
  latestNodesLoaded,
  latestNodesLoadingError,
  latestBlocksLoaded,
  latestBlocksLoadingError,
  latestTransactionsLoaded,
  latestTransactionsLoadingError,
} from './actions';

import api from '../../api';

export function* getNodes() {
  try {
    const nodes = yield call(api.fetchNodes);
    yield put(latestNodesLoaded(nodes));
  } catch (err) {
    yield put(latestNodesLoadingError(err));
  }
}

export function* getBlocks() {
  try {
    const blocks = yield call(api.fetchBlocks);
    yield put(latestBlocksLoaded(blocks));
  } catch (err) {
    yield put(latestBlocksLoadingError(err));
  }
}

export function* getTransactions() {
  try {
    const transactions = yield call(api.fetchTransactions);
    yield put(latestTransactionsLoaded(transactions));
  } catch (err) {
    yield put(latestTransactionsLoadingError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_LATEST_NODES, getNodes);
  yield takeLatest(LOAD_LATEST_BLOCKS, getBlocks);
  yield takeLatest(LOAD_LATEST_TRANSACTIONS, getTransactions);
}
