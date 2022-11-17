import {
  loadSnapshot,
  snapshotLoaded,
  loadNodes,
  nodesLoaded,
  loadAccounts,
  accountsLoaded,
} from '../actions';
import {
  LOAD_SNAPSHOT,
  LOAD_SNAPSHOT_SUCCESS,
  LOAD_NODES,
  LOAD_NODES_SUCCESS,
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
} from '../constants';

describe('SnapshotPage actions', () => {
  describe('Load snapshot Action', () => {
    it('has a type of LOAD_SNAPSHOT', () => {
      const expected = {
        type: LOAD_SNAPSHOT,
      };
      expect(loadSnapshot()).toEqual(expected);
    });
  });
  describe('Snapshot loaded Action', () => {
    it('has a type of LOAD_SNAPSHOT_SUCCESS', () => {
      const snapshot = {
        id: '00012FAD',
      };

      const expected = {
        type: LOAD_SNAPSHOT_SUCCESS,
        data: snapshot,
      };
      expect(snapshotLoaded(snapshot)).toEqual(expected);
    });
  });
  describe('Load nodes Action', () => {
    it('has a type of LOAD_NODES', () => {
      const expected = {
        type: LOAD_NODES,
      };
      expect(loadNodes()).toEqual(expected);
    });
  });
  describe('Nodes loaded Action', () => {
    it('has a type of LOAD_NODES_SUCCESS', () => {
      const nodes = [
        {
          id: '0001:12345678',
        },
        {
          id: '0002:12345678',
        },
      ];
      const meta = { count: 2 };

      const expected = {
        type: LOAD_NODES_SUCCESS,
        data: nodes,
        meta,
      };
      expect(nodesLoaded({ data: nodes, meta })).toEqual(expected);
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
          id: '0015:00003845:0001',
        },
        {
          id: '0004:00003423:0001',
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
});
