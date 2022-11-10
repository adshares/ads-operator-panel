import { fromJS } from 'immutable';
import {
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
} from './constants';

export const initialState = fromJS({
  data: [],
  meta: { count: 0 },
  loading: false,
  error: false,
});

function accountsListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACCOUNTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', initialState.get('data'));
    case LOAD_ACCOUNTS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data))
        .set('meta', fromJS(action.meta));
    case LOAD_ACCOUNTS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', initialState.get('data'))
        .set('meta', initialState.get('meta'));
    default:
      return state;
  }
}

export default accountsListPageReducer;
