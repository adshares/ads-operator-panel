import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blockexplorer state domain
 */

const selectBlockexplorerDomain = state =>
  state.get('blockexplorer', initialState);

const makeSelectLatestNodes = () =>
  createSelector(selectBlockexplorerDomain, globalState => globalState.get('nodes')
);

const makeSelectLatestBlocks = () =>
  createSelector(selectBlockexplorerDomain, globalState => globalState.get('blocks')
  );

/**
 * Default selector used by BlockExplorerPage
 */
const makeSelectBlockexplorer = () =>
  createSelector(selectBlockexplorerDomain, substate => substate.toJS());

const selectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export { makeSelectBlockexplorer, makeSelectLatestNodes, makeSelectLatestBlocks, selectLocation };
