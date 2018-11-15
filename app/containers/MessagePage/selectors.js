import formatMoney from 'lib/formatMoney';
import formatDate from 'lib/formatDate';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMessagePageDomain = state => state.get('messagePage', initialState);

const makeSelectMessage = () =>
  createSelector(selectMessagePageDomain, globalState => {
    const message = globalState.get('message').toJS();
    message.prettyData = { ...message.data };
    return message;
  });

const makeSelectTransactions = () =>
  createSelector(selectMessagePageDomain, globalState => {
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

        transaction.amount = formatMoney(amount);
      } else if (transaction.type === 'send_one') {
        transaction.amount = formatMoney(transaction.amount);
      }

      if (transaction.time) {
        transaction.time = formatDate(transaction.time);
      }
    });

    return transactions;
  });
export { makeSelectMessage, makeSelectTransactions };
