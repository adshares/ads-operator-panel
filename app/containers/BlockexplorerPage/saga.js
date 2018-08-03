// // import { take, call, put, select } from 'redux-saga/effects';
//
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_LATEST_NODE , LOAD_LATEST_BLOCK} from 'containers/BlockexplorerPage/constants';
import {
  latestNodeLoaded,
  latestNodeLoadingError,
  latestBlockLoaded,
  latestBlockLoadingError,
} from 'containers/BlockexplorerPage/actions';

import api from '../../api';

export function* getNodes() {
  try {
    const nodes = yield call(api.fetchNodes);
    yield put(latestNodeLoaded(nodes));
  } catch (err) {
    yield put(latestNodeLoadingError(err));
  }
}

export function* getBlocks() {
  try {
    const blocks = yield call(api.fetchBlocks);
    yield put(latestNodeLoaded(blocks));
  } catch (err) {
    yield put(latestNodeLoadingError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_LATEST_NODE, getNodes);
  yield takeLatest(LOAD_LATEST_BLOCK, getBlocks);
}
