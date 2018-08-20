import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_BLOCKS } from './constants';
import { blocksLoaded, blocksLoadingError } from './actions';

import api from '../../api';

export function* getBlocks(action) {
  try {
    const blocks = yield call(
      api.fetchBlocks,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(blocksLoaded(blocks));
  } catch (err) {
    yield put(blocksLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_BLOCKS, getBlocks);
}
