import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_TRANSACTION } from './constants';
import { transactionLoaded, tranasctionLoadingError } from './actions';

import api from '../../api';

export function* getTransaction(action) {
  try {
    const transaction = yield call(api.fetchTransaction, action.id);
    yield put(transactionLoaded(transaction));
  } catch (err) {
    yield put(tranasctionLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_TRANSACTION, getTransaction);
}
