import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blockPage state domain
 */

const selectBlockPageDomain = state => state.get('blockPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlockPage
 */

const makeSelectBlockPage = () =>
  createSelector(selectBlockPageDomain, substate => substate.toJS());

export default makeSelectBlockPage;
export { selectBlockPageDomain };
