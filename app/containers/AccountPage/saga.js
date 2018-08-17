import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_ACCOUNT, LOAD_TRANSACTIONS } from './constants';
import {
  accountLoaded,
  accountLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from './actions';

import api from '../../api';

export function* getAccount(action) {
  try {
    const account = yield call(api.fetchAccountsById, action.id);
    yield put(accountLoaded(account));
  } catch (err) {
    yield put(accountLoadingError(err));
  }
}

export function* getTransactions(action) {
  try {
    const transactions = yield call(
      api.fetchTransactionsByAccountId,
      action.accountId,
    );
    yield put(transactionsLoaded(transactions));
  } catch (err) {
    yield put(transactionsLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_ACCOUNT, getAccount);
  yield takeLatest(LOAD_TRANSACTIONS, getTransactions);
}
