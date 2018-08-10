import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_NODE } from './constants';
import { nodeLoaded, nodeLoadingError } from './actions';

import api from '../../api';

export function* getNode(action) {
  try {
    const nodes = yield call(api.fetchNode, action.id);
    yield put(nodeLoaded(nodes));
  } catch (err) {
    yield put(nodeLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_NODE, getNode);
}

