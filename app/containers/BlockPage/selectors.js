import formatMoney from 'lib/formatMoney';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBlockPageDomain = state => state.get('blockPage', initialState);

const makeSelectBlock = () =>
  createSelector(selectBlockPageDomain, globalState => {
    const block = globalState.get('block').toJS();
    block.prettyData = {
      ...block.data,
      votes: `${block.data.vote_yes}/${block.data.vote_total}`,
      dividend_pay: block.data.dividend_pay === true ? 'true' : 'false',
    };

    return block;
  });

const makeSelectMessages = () =>
  createSelector(selectBlockPageDomain, globalState =>
    globalState.get('messages').toJS(),
  );

const makeSelectTransactions = () =>
  createSelector(selectBlockPageDomain, globalState => {
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

export { makeSelectBlock, makeSelectMessages, makeSelectTransactions };
