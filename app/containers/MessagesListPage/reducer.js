import { fromJS } from 'immutable';
import {
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
} from './constants';

export const initialState = fromJS({
  data: [],
  meta: { count: 0 },
  loading: false,
  error: false,
});

function messagesListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', initialState.get('data'));
    case LOAD_MESSAGES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data))
        .set('meta', fromJS(action.meta));
    case LOAD_MESSAGES_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', initialState.get('data'))
        .set('meta', initialState.get('meta'));
    default:
      return state;
  }
}

export default messagesListPageReducer;
