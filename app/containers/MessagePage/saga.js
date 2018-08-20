import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_MESSAGE } from './constants';
import { messageLoaded, messageLoadingError } from './actions';

import api from '../../api';

export function* getMessage(action) {
  try {
    const message = yield call(api.fetchMessage, action.id);
    yield put(messageLoaded(message));
  } catch (err) {
    yield put(messageLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_MESSAGE, getMessage);
}
