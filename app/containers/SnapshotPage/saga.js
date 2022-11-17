import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_SNAPSHOT, LOAD_NODES, LOAD_ACCOUNTS } from './constants';
import {
  snapshotLoaded,
  snapshotLoadingError,
  nodesLoaded,
  nodesLoadingError,
  accountsLoaded,
  accountsLoadingError,
} from './actions';

import api from '../../api';

export function* getSnapshot(action) {
  try {
    const snapshot = yield call(api.fetchSnapshot, action.id);
    yield put(snapshotLoaded(snapshot));
  } catch (err) {
    yield put(snapshotLoadingError(err));
  }
}

export function* getNodes(action) {
  try {
    const nodes = yield call(
      api.fetchNodesBySnapshotId,
      action.snapshotId,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(nodesLoaded(nodes));
  } catch (err) {
    yield put(nodesLoadingError(err));
  }
}

export function* getAccounts(action) {
  try {
    const accounts = yield call(
      api.fetchAccountsBySnapshotId,
      action.snapshotId,
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
  yield takeLatest(LOAD_SNAPSHOT, getSnapshot);
  yield takeLatest(LOAD_NODES, getNodes);
  yield takeLatest(LOAD_ACCOUNTS, getAccounts);
}
