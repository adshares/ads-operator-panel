import {
  loadNode,
  nodeLoaded,
  loadAccounts,
  accountsLoaded,
  loadMessages,
  messagesLoaded,
  loadTransactions,
  transactionsLoaded,
} from '../actions';
import {
  LOAD_NODE,
  LOAD_NODE_SUCCESS,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
} from '../constants';

describe('NodePage actions', () => {
  describe('Load a node Action', () => {
    it('has a type of LOAD_NODE', () => {
      const expected = {
        type: LOAD_NODE,
      };
      expect(loadNode()).toEqual(expected);
    });
  });
  describe('Node loaded Action', () => {
    it('has a type of LOAD_NODE_SUCCESS', () => {
      const node = {
        id: '0001',
      };

      const expected = {
        type: LOAD_NODE_SUCCESS,
        data: node,
      };
      expect(nodeLoaded(node)).toEqual(expected);
    });
  });
  describe('Load accounts Action', () => {
    it('has a type of LOAD_ACCOUNTS', () => {
      const expected = {
        type: LOAD_ACCOUNTS,
      };
      expect(loadAccounts()).toEqual(expected);
    });
  });
  describe('Accounts loaded Action', () => {
    it('has a type of LOAD_ACCOUNTS_SUCCESS', () => {
      const accounts = [
        {
          id: '0000-00000000-0000',
        },
        {
          id: '0000-12345678-1234',
        },
      ];
      const meta = { count: 2 };

      const expected = {
        type: LOAD_ACCOUNTS_SUCCESS,
        data: accounts,
        meta,
      };
      expect(accountsLoaded({ data: accounts, meta })).toEqual(expected);
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
          id: '0020:00003583',
        },
        {
          id: '000F:00003821',
        },
      ];
      const meta = { count: 2 };

      const expected = {
        type: LOAD_MESSAGES_SUCCESS,
        data: messages,
        meta,
      };
      expect(messagesLoaded({ data: messages, meta })).toEqual(expected);
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
          id: '001C:0000391B:0001',
        },
        {
          id: '0004:0000341C:0001',
        },
      ];
      const meta = { count: 2 };

      const expected = {
        type: LOAD_TRANSACTIONS_SUCCESS,
        data: transactions,
        meta,
      };
      expect(transactionsLoaded({ data: transactions, meta })).toEqual(
        expected,
      );
    });
  });
});
