/*
 *
 * NodePage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_NODE, LOAD_NODE_SUCCESS, LOAD_NODE_ERROR } from './constants';

export const initialState = fromJS({

  loading: false,
  error: false,
  data: {},
});

function nodePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NODE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', {});
    case LOAD_NODE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case LOAD_NODE_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', {});
    default:
      return state;
  }
}

export default nodePageReducer;
