import { fromJS } from 'immutable';
import {
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
} from './constants';

export const initialState = fromJS({
  data: [],
  loading: false,
  error: false,
});

function messagesListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', fromJS([]));
    case LOAD_MESSAGES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case LOAD_MESSAGES_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default messagesListPageReducer;
