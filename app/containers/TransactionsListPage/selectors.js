import formatMoney from 'lib/formatMoney';
import formatDate from 'lib/formatDate';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTransactionsListPageDomain = state =>
  state.get('transactionsListPage', initialState);

const makeSelectTransactions = () =>
  createSelector(selectTransactionsListPageDomain, globalState => {
    const transactions = globalState.toJS();
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

      if (transaction.amount) {
        transaction.amount = formatMoney(transaction.amount);
      }

      if (transaction.time) {
        transaction.time = formatDate(transaction.time);
      }
    });

    return transactions;
  });

export { makeSelectTransactions };
