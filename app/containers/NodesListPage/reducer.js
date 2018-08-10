/*
 *
 * NodesListPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_NODES, LOAD_NODES_SUCCESS, LOAD_NODES_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
});

function nodesListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NODES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', []);
    case LOAD_NODES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case LOAD_NODES_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', []);
    default:
      return state;
  }
}

export default nodesListPageReducer;
