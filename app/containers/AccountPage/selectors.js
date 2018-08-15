import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountPage state domain
 */

const selectAccountPageDomain = state => state.get('accountPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectAccount = () =>
  createSelector(selectAccountPageDomain, globalState =>
    globalState.get('account').toJS(),
  );

const makeSelectTransactions = () =>
  createSelector(
    selectAccountPageDomain,
    (stateOwn, propsOwn) => propsOwn.match.params.id,
    (globalState, accountId) => {
      const transactions = globalState.get('transactions').toJS();
      transactions.data.forEach(transaction => {
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

export { makeSelectAccount, makeSelectTransactions };
