import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nodePage state domain
 */

const selectNodePageDomain = state => state.get('nodePage', initialState);

/**
 * Other specific selectors
 */
const makeSelectNode = () =>
  createSelector(selectNodePageDomain, globalState =>
    globalState.get('node').toJS(),
  );

const makeSelectAccounts = () =>
  createSelector(selectNodePageDomain, globalState =>
    globalState.get('accounts').toJS(),
  );

export { makeSelectNode, makeSelectAccounts };
