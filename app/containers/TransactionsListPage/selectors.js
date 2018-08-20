import moment from 'moment';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTransactionsListPageDomain = state =>
  state.get('transactionsListPage', initialState);

const makeSelectTransactions = () =>
  createSelector(selectTransactionsListPageDomain, globalState => {
    const transactions = globalState.toJS();
    transactions.data.forEach(transaction => {
      if (transaction.time) {
        const date = moment.parseZone(transaction.time);
        transaction.time = date.format('YYYY-MM-DD HH:mm:ss'); // eslint-disable-line
      }

      if (transaction.type === 'send_many' && transaction.wires.length > 0) {
        const targetAddress = [];
        let amount = 0;
        transaction.wires.forEach(target => {
          targetAddress.push(target.target_address);
          amount += parseInt(target.amount, 10);
        });

        transaction.target_address = targetAddress.join(', '); // eslint-disable-line
        transaction.amount = amount; // eslint-disable-line
      }
    });

    return transactions;
  });

export { makeSelectTransactions };
