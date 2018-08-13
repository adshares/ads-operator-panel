import { loadNode, nodeLoaded, loadAccounts, accountsLoaded } from '../actions';
import {
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_NODE,
  LOAD_NODE_SUCCESS,
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
  describe('node loaded Action', () => {
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
  describe('accounts loaded Action', () => {
    it('has a type of LOAD_ACCOUNTS_SUCCESS', () => {
      const accounts = [
        {
          id: '0000-00000000-0000',
        },
        {
          id: '0000-12345678-1234',
        },
      ];

      const expected = {
        type: LOAD_ACCOUNTS_SUCCESS,
        data: accounts,
      };
      expect(accountsLoaded(accounts)).toEqual(expected);
    });
  });
});
