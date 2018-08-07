import moment from 'moment';
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
  createSelector(selectBlockexplorerDomain, globalState => {
    const blocks = globalState.get('blocks').toJS();

    if (blocks.data) {
      blocks.data.map(item => {
        const date = moment.parseZone(item.time);
        item.time = date.format('YYYY-MM-DD HH:MM:SS'); // eslint-disable-line no-param-reassign
        return item;
      });
    }

    return blocks;
  });

const makeSelectLatestTransactions = () =>
  createSelector(selectBlockexplorerDomain, globalState =>
    globalState.get('transactions').toJS(),
  );

export {
  makeSelectLatestNodes,
  makeSelectLatestBlocks,
  makeSelectLatestTransactions,
};
