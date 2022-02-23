import formatMoney from 'lib/formatMoney';
import formatDate from 'lib/formatDate';
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
  createSelector(selectAccountPageDomain, globalState => {
    const account = globalState.get('account').toJS();
    account.prettyData = {
      ...account.data,
      balance: `${formatMoney(account.data.balance)} ADS`,
    };
    return account;
  });

const makeSelectTransactions = () =>
  createSelector(
    selectAccountPageDomain,
    (stateOwn, propsOwn) => propsOwn.match.params.id,
    (globalState, accountId) => {
      const transactions = globalState.get('transactions').toJS();
      const data = [];
      transactions.data.forEach(rawTransaction => {
        const transaction = rawTransaction;
        const senderAddress = transaction.sender_address;
        const { type } = transaction;
        if (type === 'send_one') {
          if (senderAddress === accountId) {
            transaction.direction = 'out';
            transaction.address = transaction.target_address;
          } else {
            transaction.direction = 'in';
            transaction.address = transaction.sender_address;
          }
          if (transaction.sender_address === transaction.target_address) {
            transaction.amount = 0;
          }
        } else if (type === 'send_many' && transaction.wires.length > 0) {
          if (senderAddress === accountId) {
            let amount = 0;
            const targetAddress = [];

            transaction.wires.forEach(target => {
              if (target.target_address !== accountId) {
                amount += parseInt(target.amount, 10);
              }
              targetAddress.push(target.target_address);
            });

            transaction.direction = 'out';
            transaction.address =
              targetAddress.length === 1 ? targetAddress[0] : targetAddress;
            transaction.amount = amount;
            transaction.targetAddress = targetAddress;
          } else {
            transaction.direction = 'in';
            transaction.address = transaction.sender_address;
            transaction.wires.every(target => {
              if (target.target_address === accountId) {
                transaction.amount = target.amount;
                return false;
              }

              return true;
            });
          }
        } else if (type === 'dividend') {
          transaction.direction = transaction.amount < 0 ? 'out' : 'in';
          transaction.amount = Math.abs(transaction.amount);
        }

        if (
          transaction.sender_address === accountId &&
          transaction.sender_fee
        ) {
          transaction.amount =
            1 * transaction.amount + 1 * transaction.sender_fee;
        }

        if (transaction.amount) {
          transaction.amount = formatMoney(transaction.amount);
        }

        if (transaction.time) {
          transaction.time = formatDate(transaction.time);
        }
        if (transaction.sender_address === transaction.target_address) {
          transaction.address = 'self';
        }
        data.push(transaction);
      });

      transactions.data = data;
      return transactions;
    },
  );

export { makeSelectAccount, makeSelectTransactions };
