import formatMoney from 'lib/formatMoney';
import formatDate from 'lib/formatDate';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTransactionPageDomain = state =>
  state.get('transactionPage', initialState);

const makeSelectTransaction = () =>
  createSelector(selectTransactionPageDomain, globalState => {
    const transaction = globalState.toJS();
    const { data } = transaction;
    if (data.type === 'send_many' && data.wires.length > 0) {
      const targetAddress = [];
      let amount = 0;
      data.wires.forEach(target => {
        targetAddress.push(target.target_address);
        amount += parseInt(target.amount, 10);

        target.amount = formatMoney(target.amount); // eslint-disable-line
      });

      data.target_address = targetAddress.join(', ');
      data.amount = formatMoney(amount);
    } else if (data.type === 'send_one') {
      data.amount = formatMoney(data.amount);
    }

    if (data.sender_fee) {
      data.sender_fee = formatMoney(data.sender_fee);
    }

    if (data.time) {
      data.time = formatDate(data.time);
    }

    transaction.data = data;

    return transaction;
  });

export { makeSelectTransaction };
