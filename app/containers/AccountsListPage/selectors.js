import formatMoney from 'lib/formatMoney';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountsListPage state domain
 */

const selectAccountsListPageDomain = state =>
  state.get('accountsListPage', initialState);

const makeSelectAccounts = () =>
  createSelector(selectAccountsListPageDomain, globalState => {
    const accounts = globalState.toJS();
    accounts.data.map(rawAccount => {
      const account = rawAccount;
      account.balance = formatMoney(account.balance, 4);

      return account;
    });

    return accounts;
  });

export { makeSelectAccounts };
