import { takeLatest, call, put } from 'redux-saga/effects';

import { LOAD_BLOCK, LOAD_MESSAGES } from './constants';
import {
  blockLoaded,
  blockLoadingError,
  messagesLoaded,
  messagesLoadingError,
} from './actions';

import api from '../../api';

export function* getBlock(action) {
  try {
    const block = yield call(api.fetchBlock, action.id);
    yield put(blockLoaded(block));
  } catch (err) {
    yield put(blockLoadingError(err));
  }
}

export function* getMessages(action) {
  try {
    const messages = yield call(
      api.fetchMessagesByBlockId,
      action.blockId,
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
  yield takeLatest(LOAD_BLOCK, getBlock);
  yield takeLatest(LOAD_MESSAGES, getMessages);
}
