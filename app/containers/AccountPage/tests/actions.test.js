import {
  loadAccount,
  loadTransactions,
  accountLoaded,
  transactionsLoaded,
} from '../actions';
import {
  LOAD_ACCOUNT,
  LOAD_TRANSACTIONS,
  LOAD_ACCOUNT_SUCCESS,
  LOAD_TRANSACTIONS_SUCCESS,
} from '../constants';

describe('AccountPage actions', () => {
  describe('Load account Action', () => {
    it('has a type of LOAD_ACCOUNT', () => {
      const expected = {
        type: LOAD_ACCOUNT,
      };
      expect(loadAccount()).toEqual(expected);
    });
  });
  describe('Account loaded Action', () => {
    it('has a type of LOAD_ACCOUNT_SUCCESS', () => {
      const account = {
        id: '0001-000000-1234',
      };

      const expected = {
        type: LOAD_ACCOUNT_SUCCESS,
        data: account,
      };
      expect(accountLoaded(account)).toEqual(expected);
    });
  });
  describe('Load transactions Action', () => {
    it('has a type of LOAD_TRANSACTIONS', () => {
      const expected = {
        type: LOAD_TRANSACTIONS,
      };
      expect(loadTransactions()).toEqual(expected);
    });
  });
  describe('Transactions loaded Action', () => {
    it('has a type of LOAD_TRANSACTIONS_SUCCESS', () => {
      const transactions = [
        {
          id: '0001:000000:1234',
        },
        {
          id: '0001:000001:1234',
        },
      ];

      const expected = {
        type: LOAD_TRANSACTIONS_SUCCESS,
        data: transactions,
      };
      expect(transactionsLoaded(transactions)).toEqual(expected);
    });
  });
});
