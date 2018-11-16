import { fromJS } from 'immutable';
import {
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
} from './constants';

export const initialState = fromJS({
  data: [],
  loading: false,
  error: false,
});

function accountsListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACCOUNTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', fromJS([]));
    case LOAD_ACCOUNTS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case LOAD_ACCOUNTS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default accountsListPageReducer;
