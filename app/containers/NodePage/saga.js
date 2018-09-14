import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_ACCOUNTS, LOAD_NODE } from './constants';
import {
  accountsLoaded,
  accountsLoadingError,
  nodeLoaded,
  nodeLoadingError,
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
    const accounts = yield call(api.fetchAccountsByNodeId, action.nodeId);
    yield put(accountsLoaded(accounts));
  } catch (err) {
    yield put(accountsLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_NODE, getNode);
  yield takeLatest(LOAD_ACCOUNTS, getAccounts);
}
