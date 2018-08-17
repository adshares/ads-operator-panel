import moment from 'moment';

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
      });

      data.target_address = targetAddress.join(', ');
      data.amount = amount;
    }

    const date = moment.parseZone(data.time);
    data.time = date.format('YYYY-MM-DD HH:MM:ss');

    transaction.data = data;

    return transaction;
  });

export { makeSelectTransaction };
