import {
  loadBlock,
  blockLoaded,
  loadMessages,
  messagesLoaded,
  loadTransactions,
  transactionsLoaded,
} from '../actions';
import {
  LOAD_BLOCK,
  LOAD_BLOCK_SUCCESS,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
} from '../constants';

describe('BlockPage actions', () => {
  describe('Load block Action', () => {
    it('has a type of LOAD_BLOCK', () => {
      const expected = {
        type: LOAD_BLOCK,
      };
      expect(loadBlock()).toEqual(expected);
    });
  });
  describe('Block loaded Action', () => {
    it('has a type of LOAD_BLOCK_SUCCESS', () => {
      const block = {
        id: '00012FAD',
      };

      const expected = {
        type: LOAD_BLOCK_SUCCESS,
        data: block,
      };
      expect(blockLoaded(block)).toEqual(expected);
    });
  });
  describe('Load messages Action', () => {
    it('has a type of LOAD_MESSAGES', () => {
      const expected = {
        type: LOAD_MESSAGES,
      };
      expect(loadMessages()).toEqual(expected);
    });
  });
  describe('Messages loaded Action', () => {
    it('has a type of LOAD_MESSAGES_SUCCESS', () => {
      const messages = [
        {
          id: '0001:12345678',
        },
        {
          id: '0002:12345678',
        },
      ];

      const expected = {
        type: LOAD_MESSAGES_SUCCESS,
        data: messages,
      };
      expect(messagesLoaded(messages)).toEqual(expected);
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
          id: '0015:00003845:0001',
        },
        {
          id: '0004:00003423:0001',
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
