import formatMoney from 'lib/formatMoney';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSnapshotPageDomain = state =>
  state.get('snapshotPage', initialState);

const makeSelectSnapshot = () =>
  createSelector(selectSnapshotPageDomain, globalState => {
    const snapshot = globalState.get('snapshot').toJS();
    snapshot.prettyData = {
      ...snapshot.data,
      votes: `${snapshot.data.vote_yes}/${snapshot.data.vote_total}`,
      dividend_pay: snapshot.data.dividend_pay === true ? 'true' : 'false',
    };

    return snapshot;
  });

const makeSelectNodes = () =>
  createSelector(selectSnapshotPageDomain, globalState => {
    const nodes = globalState.get('nodes').toJS();
    nodes.data.map(item => {
      const node = item;
      node.balance = formatMoney(node.balance, 4);
      return node;
    });
    return nodes;
  });

const makeSelectAccounts = () =>
  createSelector(selectSnapshotPageDomain, globalState => {
    const accounts = globalState.get('accounts').toJS();
    accounts.data.map(item => {
      const account = item;
      account.balance = formatMoney(account.balance, 4);
      return account;
    });

    return accounts;
  });

export { makeSelectSnapshot, makeSelectNodes, makeSelectAccounts };
