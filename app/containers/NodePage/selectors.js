import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nodePage state domain
 */

const selectNodePageDomain = state => state.get('nodePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NodePage
 */

const makeSelectNodePage = () =>
  createSelector(selectNodePageDomain, substate => substate.toJS());

export default makeSelectNodePage;
export { selectNodePageDomain };
