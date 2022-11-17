import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_SNAPSHOTS } from './constants';
import { snapshotsLoaded, snapshotsLoadingError } from './actions';

import api from '../../api';

export function* getSnapshots(action) {
  try {
    const snapshots = yield call(
      api.fetchSnapshots,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(snapshotsLoaded(snapshots));
  } catch (err) {
    yield put(snapshotsLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_SNAPSHOTS, getSnapshots);
}
