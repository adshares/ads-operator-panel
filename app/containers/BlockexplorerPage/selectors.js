import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blockexplorer state domain
 */
const selectBlockexplorerDomain = state =>
  state.get('blockexplorer', initialState);

const makeSelectLatestNodes = () =>
  createSelector(selectBlockexplorerDomain, globalState =>
    globalState.get('nodes').toJS(),
  );

const makeSelectLatestBlocks = () =>
  createSelector(selectBlockexplorerDomain, globalState =>
    globalState.get('blocks').toJS(),
  );

const makeSelectLatestTransactions = () =>
  createSelector(selectBlockexplorerDomain, globalState =>
    globalState.get('transactions').toJS(),
  );

export {
  makeSelectLatestNodes,
  makeSelectLatestBlocks,
  makeSelectLatestTransactions,
};
