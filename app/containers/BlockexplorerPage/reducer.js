/*
 *
 * BlockExplorerPage reducer
 *
 */

import { fromJS } from 'immutable';

import { DEFAULT_ACTION, LOAD_LATEST_NODE, LOAD_LATEST_NODE_SUCCESS, LOAD_LATEST_NODE_ERROR, LOAD_LATEST_BLOCK, LOAD_LATEST_BLOCK_SUCCESS, LOAD_LATEST_BLOCK_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  nodes: [],
  blocks: [],
});

const blockexplorerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_LATEST_NODE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('nodes', []);
    case LOAD_LATEST_NODE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('nodes', action.nodes);
    case LOAD_LATEST_NODE_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_LATEST_BLOCK:
      return state
        .set('loading', true)
        .set('error', false)
        .set('blocks', []);
    case LOAD_LATEST_BLOCK_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('blocks', action.blocks);
    case LOAD_LATEST_BLOCK_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
};
export default blockexplorerReducer;

