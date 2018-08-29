import { formatDate } from 'dateHelper';
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
export { makeSelectMessage, makeSelectTransactions };
