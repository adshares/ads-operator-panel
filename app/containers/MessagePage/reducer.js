/*
 *
 * MessagePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MESSAGE,
  LOAD_MESSAGE_SUCCESS,
  LOAD_MESSAGE_ERROR,
} from './constants';

export const initialState = fromJS({
  data: {},
  loading: false,
  error: false,
});

function messagePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', fromJS({}));
    case LOAD_MESSAGE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case LOAD_MESSAGE_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', fromJS({}));
    default:
      return state;
  }
}

export default messagePageReducer;
