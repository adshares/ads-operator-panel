import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_BLOCK, LOAD_MESSAGES, LOAD_TRANSACTIONS } from './constants';
import {
  blockLoaded,
  blockLoadingError,
  messagesLoaded,
  messagesLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from './actions';

import api from '../../api';

export function* getBlock(action) {
  try {
    const block = yield call(api.fetchBlock, action.id);
    yield put(blockLoaded(block));
  } catch (err) {
    yield put(blockLoadingError(err));
  }
}

export function* getMessages(action) {
  try {
    const messages = yield call(
      api.fetchMessagesByBlockId,
      action.blockId,
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
      api.fetchTransactionsByBlockId,
      action.blockId,
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
  yield takeLatest(LOAD_BLOCK, getBlock);
  yield takeLatest(LOAD_MESSAGES, getMessages);
  yield takeLatest(LOAD_TRANSACTIONS, getTransactions);
}
