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
        item.time = date.format('YYYY-MM-DD HH:MM:ss'); // eslint-disable-line no-param-reassign
        return item;
      });
    }

    return blocks;
  });

const makeSelectLatestTransactions = () =>
  createSelector(
    selectBlockexplorerDomain,
    (stateOwn, propsOwn) => propsOwn.match.params.id,
    (globalState, accountId) => {
      const transactions = globalState.get('transactions').toJS();
      transactions.data.forEach(transaction => {
        if (transaction.time) {
          const date = moment.parseZone(transaction.time);
          transaction.time = date.format('YYYY-MM-DD HH:MM:ss'); // eslint-disable-line
        }

        if (transaction.type === 'send_many' && transaction.wires.length > 0) {
          const targetAddress = [];
          let amount = 0;
          transaction.wires.forEach(target => {
            if (
              transaction.sender_address !== accountId &&
              target.target_address !== accountId
            ) {
              return;
            }

            targetAddress.push(target.target_address);
            amount += parseInt(target.amount, 10);
          });

          transaction.target_address = targetAddress.join(', '); // eslint-disable-line
          transaction.amount = amount; // eslint-disable-line
        }
      });

      return transactions;
    },
  );

export {
  makeSelectLatestNodes,
  makeSelectLatestBlocks,
  makeSelectLatestTransactions,
};
