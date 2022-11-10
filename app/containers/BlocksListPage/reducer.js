import { fromJS } from 'immutable';
import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS_ERROR,
} from './constants';

export const initialState = fromJS({
  data: [],
  meta: { count: 0 },
  loading: false,
  error: false,
});

function blocksListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCKS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', initialState.get('data'));
    case LOAD_BLOCKS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data))
        .set('meta', fromJS(action.meta));
    case LOAD_BLOCKS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', initialState.get('data'))
        .set('meta', initialState.get('meta'));
    default:
      return state;
  }
}

export default blocksListPageReducer;
