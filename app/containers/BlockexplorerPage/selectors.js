import { formatDate } from 'dateHelper';
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
        item.time = formatDate(item.time); // eslint-disable-line
        return item;
      });
    }

    return blocks;
  });

const makeSelectLatestTransactions = () =>
  createSelector(selectBlockexplorerDomain, globalState => {
    const transactions = globalState.get('transactions').toJS();
    transactions.data.forEach(rawTransaction => {
      const transaction = rawTransaction;

      if (transaction.type === 'send_many' && transaction.wires.length > 0) {
        const targetAddress = [];
        let amount = 0;
        transaction.wires.forEach(target => {
          targetAddress.push(target.target_address);
          amount += parseInt(target.amount, 10);
        });

        transaction.target_address =
          targetAddress.length === 1 ? targetAddress[0] : targetAddress;
        transaction.amount = amount;
      }

      transaction.time = formatDate(transaction.time);
    });

    return transactions;
  });

export {
  makeSelectLatestNodes,
  makeSelectLatestBlocks,
  makeSelectLatestTransactions,
};
