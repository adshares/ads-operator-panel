import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_MESSAGE, LOAD_TRANSACTIONS } from './constants';
import {
  messageLoaded,
  messageLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from './actions';

import api from '../../api';

export function* getMessage(action) {
  try {
    const message = yield call(api.fetchMessage, action.id);
    yield put(messageLoaded(message));
  } catch (err) {
    yield put(messageLoadingError(err));
  }
}

export function* getTransactions(action) {
  try {
    const transactions = yield call(
      api.fetchTransactionsByMessageId,
      action.messageId,
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
  yield takeLatest(LOAD_MESSAGE, getMessage);
  yield takeLatest(LOAD_TRANSACTIONS, getTransactions);
}
