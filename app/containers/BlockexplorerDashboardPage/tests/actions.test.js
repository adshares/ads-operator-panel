import {
  loadTopNodes,
  loadTopAccounts,
  loadLatestBlocks,
  loadLatestsMessages,
  loadLatestsTransactions,
  topNodesLoaded,
  topAccountsLoaded,
  latestBlocksLoaded,
  latestMessagesLoaded,
  latestTransactionsLoaded,
} from '../actions';
import {
  LOAD_TOP_NODES,
  LOAD_TOP_ACCOUNTS,
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_MESSAGES,
  LOAD_LATEST_TRANSACTIONS,
  LOAD_TOP_NODES_SUCCESS,
  LOAD_TOP_ACCOUNTS_SUCCESS,
  LOAD_LATEST_BLOCKS_SUCCESS,
  LOAD_LATEST_MESSAGES_SUCCESS,
  LOAD_LATEST_TRANSACTIONS_SUCCESS,
} from '../constants';

describe('BlockexplorerDashboardPage actions', () => {
  describe('Load nodes Action', () => {
    it('has a type of LOAD_TOP_NODES', () => {
      const expected = {
        type: LOAD_TOP_NODES,
      };
      expect(loadTopNodes()).toEqual(expected);
    });
  });
  describe('Top nodes loaded Action', () => {
    it('has a type of LOAD_TOP_NODES_SUCCESS', () => {
      const nodes = [];

      const expected = {
        type: LOAD_TOP_NODES_SUCCESS,
        nodes,
      };
      expect(topNodesLoaded(nodes)).toEqual(expected);
    });
  });

  describe('Load accounts Action', () => {
    it('has a type of LOAD_TOP_ACCOUNTS', () => {
      const expected = {
        type: LOAD_TOP_ACCOUNTS,
      };
      expect(loadTopAccounts()).toEqual(expected);
    });
  });
  describe('Top accounts loaded Action', () => {
    it('has a type of LOAD_TOP_ACCOUNTS_SUCCESS', () => {
      const accounts = [];

      const expected = {
        type: LOAD_TOP_ACCOUNTS_SUCCESS,
        accounts,
      };
      expect(topAccountsLoaded(accounts)).toEqual(expected);
    });
  });

  describe('Load blocks Action', () => {
    it('has a type of LOAD_LATEST_BLOCKS', () => {
      const expected = {
        type: LOAD_LATEST_BLOCKS,
      };
      expect(loadLatestBlocks()).toEqual(expected);
    });
  });
  describe('Latest blocks loaded Action', () => {
    it('has a type of LOAD_LATEST_BLOCKS_SUCCESS', () => {
      const blocks = [];

      const expected = {
        type: LOAD_LATEST_BLOCKS_SUCCESS,
        blocks,
      };
      expect(latestBlocksLoaded(blocks)).toEqual(expected);
    });
  });

  describe('Load messages Action', () => {
    it('has a type of LOAD_LATEST_MESSAGES', () => {
      const expected = {
        type: LOAD_LATEST_MESSAGES,
      };
      expect(loadLatestsMessages()).toEqual(expected);
    });
  });
  describe('Latest messages loaded Action', () => {
    it('has a type of LOAD_LATEST_MESSAGES_SUCCESS', () => {
      const messages = [];

      const expected = {
        type: LOAD_LATEST_MESSAGES_SUCCESS,
        messages,
      };
      expect(latestMessagesLoaded(messages)).toEqual(expected);
    });
  });

  describe('Load transactions Action', () => {
    it('has a type of LOAD_LATEST_TRANSACTIONS', () => {
      const expected = {
        type: LOAD_LATEST_TRANSACTIONS,
      };
      expect(loadLatestsTransactions()).toEqual(expected);
    });
  });
  describe('Latest transactions loaded Action', () => {
    it('has a type of LOAD_LATEST_TRANSACTIONS_SUCCESS', () => {
      const transactions = [];

      const expected = {
        type: LOAD_LATEST_TRANSACTIONS_SUCCESS,
        transactions,
      };
      expect(latestTransactionsLoaded(transactions)).toEqual(expected);
    });
  });
});
