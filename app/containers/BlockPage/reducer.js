/*
 *
 * BlockPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_BLOCK,
  LOAD_BLOCK_SUCCESS,
  LOAD_BLOCK_ERROR,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
} from './constants';

export const initialState = fromJS({
  block: {
    loading: false,
    error: false,
    data: {},
  },
  messages: {
    loading: false,
    error: false,
    data: [],
  },
});

function blockPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCK:
      return state
        .setIn(['block', 'loading'], true)
        .setIn(['block', 'error'], false)
        .setIn(['block', 'data'], fromJS({}));
    case LOAD_BLOCK_SUCCESS:
      return state
        .setIn(['block', 'loading'], false)
        .setIn(['block', 'error'], false)
        .setIn(['block', 'data'], fromJS(action.data));
    case LOAD_BLOCK_ERROR:
      return state
        .setIn(['block', 'loading'], false)
        .setIn(['block', 'error'], fromJS(action.error))
        .setIn(['block', 'data'], fromJS({}));
    case LOAD_MESSAGES:
      return state
        .setIn(['messages', 'loading'], true)
        .setIn(['messages', 'error'], false)
        .setIn(['messages', 'data'], fromJS([]));
    case LOAD_MESSAGES_SUCCESS:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], false)
        .setIn(['messages', 'data'], fromJS(action.data));
    case LOAD_MESSAGES_ERROR:
      return state
        .setIn(['messages', 'loading'], false)
        .setIn(['messages', 'error'], fromJS(action.error))
        .setIn(['messages', 'data'], fromJS([]));
    default:
      return state;
  }
}

export default blockPageReducer;
