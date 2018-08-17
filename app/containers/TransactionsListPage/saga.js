import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_TRANSACTIONS } from './constants';
import { transactionsLoaded, transactionsLoadingError } from './actions';

import api from '../../api';

export function* getTransactions(action) {
  try {
    const nodes = yield call(
      api.fetchTransactions,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(transactionsLoaded(nodes));
  } catch (err) {
    yield put(transactionsLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_TRANSACTIONS, getTransactions);
}
