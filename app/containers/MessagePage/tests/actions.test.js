import {
  loadMessage,
  messageLoaded,
  messageLoadingError,
  loadTransactions,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';
import {
  LOAD_MESSAGE,
  LOAD_MESSAGE_SUCCESS,
  LOAD_MESSAGE_ERROR,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
} from '../constants';

describe('MessagenPage actions', () => {
  describe('Load a message Action', () => {
    it('has a type of LOAD_MESSAGE', () => {
      const expected = {
        type: LOAD_MESSAGE,
      };
      expect(loadMessage()).toEqual(expected);
    });
  });
  describe('message loaded Action', () => {
    it('has a type of LOAD_MESSAGE_SUCCESS', () => {
      const message = {
        id: '0001:00000001',
      };

      const expected = {
        type: LOAD_MESSAGE_SUCCESS,
        data: message,
      };
      expect(messageLoaded(message)).toEqual(expected);
    });
  });
  describe('message error Action', () => {
    it('has a type of LOAD_MESSAGE_ERROR', () => {
      const error = {
        message: 'error #123',
      };

      const expected = {
        type: LOAD_MESSAGE_ERROR,
        error,
      };
      expect(messageLoadingError(error)).toEqual(expected);
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
  describe('transactions loaded Action', () => {
    it('has a type of LOAD_TRANSACTIONS_SUCCESS', () => {
      const transactions = [
        {
          id: '0001:00000001:1234',
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
