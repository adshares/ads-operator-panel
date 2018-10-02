import {
  loadLatestNode,
  loadLatestBlocks,
  loadLatestsTransactions,
  latestNodesLoaded,
  latestBlocksLoaded,
  latestTransactionsLoaded,
} from '../actions';
import {
  LOAD_LATEST_NODES,
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_TRANSACTIONS,
  LOAD_LATEST_NODES_SUCCESS,
  LOAD_LATEST_BLOCKS_SUCCESS,
  LOAD_LATEST_TRANSACTIONS_SUCCESS,
} from '../constants';

describe('BlockexplorerDashboardPage actions', () => {
  describe('Load nodes Action', () => {
    it('has a type of LOAD_LATEST_NODES', () => {
      const expected = {
        type: LOAD_LATEST_NODES,
      };
      expect(loadLatestNode()).toEqual(expected);
    });
  });
  describe('Latest nodes loaded Action', () => {
    it('has a type of LOAD_LATEST_NODES_SUCCESS', () => {
      const nodes = [];

      const expected = {
        type: LOAD_LATEST_NODES_SUCCESS,
        nodes,
      };
      expect(latestNodesLoaded(nodes)).toEqual(expected);
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
