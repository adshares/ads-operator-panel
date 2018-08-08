import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_NODES } from './constants';
import { nodesLoaded, nodesLoadingError } from './actions';

import api from '../../api';

export function* getNodes(action) {
  try {
    const nodes = yield call(api.fetchNodes, action.limit, action.offset, action.sort, action.order);
    yield put(nodesLoaded(nodes));
  } catch (err) {
    yield put(nodesLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_NODES, getNodes);
}
