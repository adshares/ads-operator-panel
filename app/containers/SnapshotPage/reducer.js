/*
 *
 * SnapshotPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SNAPSHOT,
  LOAD_SNAPSHOT_SUCCESS,
  LOAD_SNAPSHOT_ERROR,
  LOAD_NODES,
  LOAD_NODES_SUCCESS,
  LOAD_NODES_ERROR,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
} from './constants';

export const initialState = fromJS({
  snapshot: {
    loading: false,
    error: false,
    data: {},
  },
  nodes: {
    loading: false,
    error: false,
    data: [],
    meta: { count: 0 },
  },
  accounts: {
    loading: false,
    error: false,
    data: [],
    meta: { count: 0 },
  },
});

function snapshotPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SNAPSHOT:
      return state
        .setIn(['snapshot', 'loading'], true)
        .setIn(['snapshot', 'error'], false)
        .setIn(['snapshot', 'data'], initialState.getIn(['snapshot', 'data']))
        .setIn(['nodes', 'meta'], initialState.getIn(['nodes', 'meta']))
        .setIn(['accounts', 'meta'], initialState.getIn(['accounts', 'meta']));
    case LOAD_SNAPSHOT_SUCCESS:
      return state
        .setIn(['snapshot', 'loading'], false)
        .setIn(['snapshot', 'error'], false)
        .setIn(['snapshot', 'data'], fromJS(action.data));
    case LOAD_SNAPSHOT_ERROR:
      return state
        .setIn(['snapshot', 'loading'], false)
        .setIn(['snapshot', 'error'], fromJS(action.error))
        .setIn(['snapshot', 'data'], initialState.getIn(['snapshot', 'data']));
    case LOAD_NODES:
      return state
        .setIn(['nodes', 'loading'], true)
        .setIn(['nodes', 'error'], false)
        .setIn(['nodes', 'data'], initialState.getIn(['nodes', 'data']));
    case LOAD_NODES_SUCCESS:
      return state
        .setIn(['nodes', 'loading'], false)
        .setIn(['nodes', 'error'], false)
        .setIn(['nodes', 'data'], fromJS(action.data))
        .setIn(['nodes', 'meta'], fromJS(action.meta));
    case LOAD_NODES_ERROR:
      return state
        .setIn(['nodes', 'loading'], false)
        .setIn(['nodes', 'error'], fromJS(action.error))
        .setIn(['nodes', 'data'], initialState.getIn(['nodes', 'data']))
        .setIn(['nodes', 'meta'], initialState.getIn(['nodes', 'meta']));
    case LOAD_ACCOUNTS:
      return state
        .setIn(['accounts', 'loading'], true)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], initialState.getIn(['accounts', 'data']));
    case LOAD_ACCOUNTS_SUCCESS:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], false)
        .setIn(['accounts', 'data'], fromJS(action.data))
        .setIn(['accounts', 'meta'], fromJS(action.meta));
    case LOAD_ACCOUNTS_ERROR:
      return state
        .setIn(['accounts', 'loading'], false)
        .setIn(['accounts', 'error'], fromJS(action.error))
        .setIn(['accounts', 'data'], initialState.getIn(['accounts', 'data']))
        .setIn(['accounts', 'meta'], initialState.getIn(['accounts', 'meta']));
    default:
      return state;
  }
}

export default snapshotPageReducer;
