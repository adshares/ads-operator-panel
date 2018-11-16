import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_ACCOUNTS } from './constants';
import { accountsLoaded, accountsLoadingError } from './actions';

import api from '../../api';

export function* getAccounts(action) {
  try {
    const accounts = yield call(
      api.fetchAccounts,
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

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_ACCOUNTS, getAccounts);
}
