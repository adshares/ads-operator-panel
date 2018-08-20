import {
  loadTransaction,
  transactionLoaded,
  tranasctionLoadingError,
} from '../actions';
import {
  LOAD_TRANSACTION,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTION_ERROR,
} from '../constants';

describe('TransactionPage actions', () => {
  describe('Load a transaction Action', () => {
    it('has a type of LOAD_TRANSACTION', () => {
      const expected = {
        type: LOAD_TRANSACTION,
      };
      expect(loadTransaction()).toEqual(expected);
    });
  });
  describe('transaction loaded Action', () => {
    it('has a type of LOAD_TRANSACTION_SUCCESS', () => {
      const transaction = {
        id: '0001:00000000:1234',
      };

      const expected = {
        type: LOAD_TRANSACTION_SUCCESS,
        data: transaction,
      };
      expect(transactionLoaded(transaction)).toEqual(expected);
    });
  });
  describe('transaction error Action', () => {
    it('has a type of LOAD_TRANSACTION_ERROR', () => {
      const error = {
        message: 'error #123',
      };

      const expected = {
        type: LOAD_TRANSACTION_ERROR,
        error,
      };
      expect(tranasctionLoadingError(error)).toEqual(expected);
    });
  });
});
