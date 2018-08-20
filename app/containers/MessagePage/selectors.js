import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMessagePageDomain = state => state.get('messagePage', initialState);

const makeSelectMessage = () =>
  createSelector(selectMessagePageDomain, globalState => globalState.toJS());

export { makeSelectMessage };
