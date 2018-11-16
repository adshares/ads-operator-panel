import {
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_ERROR,
} from '../constants';
import { loadAccounts, accountsLoadingError, accountsLoaded } from '../actions';

describe('AccountsListPage actions', () => {
  describe('Load accounts Action', () => {
    it('has a type of LOAD_ACCOUNTS', () => {
      const expected = {
        type: LOAD_ACCOUNTS,
      };
      expect(loadAccounts()).toEqual(expected);
    });
  });
  describe('accounts loaded Action', () => {
    it('has a type of LOAD_ACCOUNTS_SUCCESS', () => {
      const accounts = [
        {
          id: 'AAAAAABB',
        },
      ];

      const expected = {
        type: LOAD_ACCOUNTS_SUCCESS,
        data: accounts,
      };
      expect(accountsLoaded(accounts)).toEqual(expected);
    });
  });
  describe('accounts error Action', () => {
    it('has a type of LOAD_ACCOUNTS_ERROR', () => {
      const error = {
        message: 'error #123',
      };

      const expected = {
        type: LOAD_ACCOUNTS_ERROR,
        error,
      };
      expect(accountsLoadingError(error)).toEqual(expected);
    });
  });
});
