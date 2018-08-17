import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_TRANSACTIONS_SUCCESS,
} from '../constants';
import {
  loadTransactions,
  transactionsLoadingError,
  transactionsLoaded,
} from '../actions';

describe('TransactionsPage actions', () => {
  describe('Load transactions Action', () => {
    it('has a type of LOAD_TRANSACTIONS', () => {
      const expected = {
        type: LOAD_TRANSACTIONS,
      };
      expect(loadTransactions()).toEqual(expected);
    });
  });
  describe('transactions loaded Action', () => {
    it('has a type of LOAD_TRANSACTIONS_SUCCESS', () => {
      const transactions = [
        {
          id: '0001:00000000:1234',
        },
      ];

      const expected = {
        type: LOAD_TRANSACTIONS_SUCCESS,
        data: transactions,
      };
      expect(transactionsLoaded(transactions)).toEqual(expected);
    });
  });
  describe('transactions error Action', () => {
    it('has a type of LOAD_TRANSACTIONS_ERROR', () => {
      const error = {
        message: 'error #123',
      };

      const expected = {
        type: LOAD_TRANSACTIONS_ERROR,
        error,
      };
      expect(transactionsLoadingError(error)).toEqual(expected);
    });
  });
});
