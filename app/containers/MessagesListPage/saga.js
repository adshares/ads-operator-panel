import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_MESSAGES } from './constants';
import { messagesLoaded, messagesLoadingError } from './actions';

import api from '../../api';

export function* getMessages(action) {
  try {
    const messages = yield call(
      api.fetchMessages,
      action.limit,
      action.offset,
      action.sort,
      action.order,
    );
    yield put(messagesLoaded(messages));
  } catch (err) {
    yield put(messagesLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_MESSAGES, getMessages);
}
