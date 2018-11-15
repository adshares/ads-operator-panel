import formatDate from 'lib/formatDate';
import formatMoney from 'lib/formatMoney';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blockexplorer state domain
 */
const selectBlockexplorerDashboardPageDomain = state =>
  state.get('blockexplorerDashboardPage', initialState);

const makeSelectTopNodes = () =>
  createSelector(selectBlockexplorerDashboardPageDomain, globalState => {
    const nodes = globalState.get('nodes').toJS();
    nodes.data.map(item => {
      item.balance = formatMoney(item.balance, 4); // eslint-disable-line
      return item;
    });

    return nodes;
  });

const makeSelectTopAccounts = () =>
  createSelector(selectBlockexplorerDashboardPageDomain, globalState => {
    const accounts = globalState.get('accounts').toJS();
    accounts.data.map(item => {
      item.balance = formatMoney(item.balance, 4); // eslint-disable-line
      return item;
    });

    return accounts;
  });

const makeSelectLatestBlocks = () =>
  createSelector(selectBlockexplorerDashboardPageDomain, globalState => {
    const blocks = globalState.get('blocks').toJS();

    if (blocks.data) {
      blocks.data.map(rawBlock => {
        const block = rawBlock;
        if (block.time) {
          block.time = formatDate(block.time);
        }
        block.message_and_transaction_count = `${block.message_count} / ${
          block.transaction_count
        }`;
        block.votes = `${block.vote_yes}/${block.vote_total}`;
        return block;
      });
    }

    return blocks;
  });

const makeSelectLatestMessages = () =>
  createSelector(selectBlockexplorerDashboardPageDomain, globalState => {
    const messages = globalState.get('messages').toJS();

    if (messages.data) {
      messages.data.map(rawMessage => {
        const message = rawMessage;
        if (message.time) {
          message.time = formatDate(message.time);
        }
        return message;
      });
    }

    return messages;
  });

const makeSelectLatestTransactions = () =>
  createSelector(selectBlockexplorerDashboardPageDomain, globalState => {
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

export {
  makeSelectTopNodes,
  makeSelectTopAccounts,
  makeSelectLatestBlocks,
  makeSelectLatestMessages,
  makeSelectLatestTransactions,
};
