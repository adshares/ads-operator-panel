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
  meta: { count: 0 },
});

function nodesListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NODES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', initialState.get('data'));
    case LOAD_NODES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data))
        .set('meta', fromJS(action.meta));
    case LOAD_NODES_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', initialState.get('data'))
        .set('meta', initialState.get('meta'));
    default:
      return state;
  }
}

export default nodesListPageReducer;
