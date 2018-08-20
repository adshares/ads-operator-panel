import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMessagePageDomain = state => state.get('messagePage', initialState);

const makeSelectMessage = () =>
  createSelector(selectMessagePageDomain, globalState =>
    globalState.get('message').toJS(),
  );

const makeSelectTransactions = () =>
  createSelector(selectMessagePageDomain, globalState => {
    const transactions = globalState.get('transactions').toJS();
    transactions.data.forEach(transaction => {
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
export { makeSelectMessage, makeSelectTransactions };
