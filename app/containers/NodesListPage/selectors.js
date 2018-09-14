import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nodesListPage state domain
 */

const selectNodesListPageDomain = state =>
  state.get('nodesListPage', initialState);

/**
 * Default selector used by NodesListPage
 */
const makeSelectNodesListPage = () =>
  createSelector(selectNodesListPageDomain, substate => substate.toJS());

export default makeSelectNodesListPage;
export { makeSelectNodesListPage };
