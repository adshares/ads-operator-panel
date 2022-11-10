import formatMoney from 'lib/formatMoney';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNodesListPageDomain = state =>
  state.get('nodesListPage', initialState);

const makeSelectNodesListPage = () =>
  createSelector(selectNodesListPageDomain, substate => {
    const nodes = substate.toJS();
    // console.debug(nodes)
    nodes.data.map(item => {
      const node = item;
      node.balance = formatMoney(node.balance, 4);

      return node;
    });

    return nodes;
  });

export default makeSelectNodesListPage;
export { makeSelectNodesListPage };
