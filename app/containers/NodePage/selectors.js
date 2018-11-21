import formatMoney from 'lib/formatMoney';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nodePage state domain
 */

const selectNodePageDomain = state => state.get('nodePage', initialState);

/**
 * Other specific selectors
 */
const makeSelectNode = () =>
  createSelector(selectNodePageDomain, globalState => {
    const node = globalState.get('node').toJS();
    node.prettyData = {
      ...node.data,
      balance: `${formatMoney(node.data.balance)} ADS`,
    };
    return node;
  });

const makeSelectAccounts = () =>
  createSelector(selectNodePageDomain, globalState => {
    const accounts = globalState.get('accounts').toJS();
    accounts.data.map(item => {
      const account = item;
      account.balance = formatMoney(account.balance, 4);

      return account;
    });

    return accounts;
  });

const makeSelectMessages = () =>
  createSelector(selectNodePageDomain, globalState => {
    const messages = globalState.get('messages').toJS();
    messages.data.map(item => {
      const message = item;
      // message.balance = formatMoney(message.balance, 4);

      return message;
    });

    return messages;
  });

const makeSelectTransactions = () =>
  createSelector(selectNodePageDomain, globalState => {
    const transactions = globalState.get('transactions').toJS();
    transactions.data.map(item => {
      const transaction = item;

      if (transaction.type === 'send_many' && transaction.wires.length > 0) {
        const targetAddress = [];
        let amount = 0;
        transaction.wires.forEach(target => {
          targetAddress.push(target.target_address);
          amount += parseInt(target.amount, 10);
        });

        transaction.target_address =
          targetAddress.length === 1 ? targetAddress[0] : targetAddress;
        transaction.amount = formatMoney(amount);
      } else if (transaction.type === 'send_one') {
        transaction.amount = formatMoney(transaction.amount);
      }

      return transaction;
    });

    return transactions;
  });

export {
  makeSelectNode,
  makeSelectAccounts,
  makeSelectMessages,
  makeSelectTransactions,
};
