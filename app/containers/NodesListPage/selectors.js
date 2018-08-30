import formatMoney from 'lib/formatMoney';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNodesListPageDomain = state =>
  state.get('nodesListPage', initialState);

const makeSelectNodesListPage = () =>
  createSelector(selectNodesListPageDomain, substate => {
    const nodes = substate.toJS();
    nodes.data.map(item => {
      const node = item;
      node.balance = formatMoney(node.balance);

      return node;
    });

    return nodes;
  });

export default makeSelectNodesListPage;
export { makeSelectNodesListPage };
