import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS_ERROR,
} from '../constants';
import { loadBlocks, blocksLoadingError, blocksLoaded } from '../actions';

describe('BlocksListPage actions', () => {
  describe('Load blocks Action', () => {
    it('has a type of LOAD_BLOCKS', () => {
      const expected = {
        type: LOAD_BLOCKS,
      };
      expect(loadBlocks()).toEqual(expected);
    });
  });
  describe('blocks loaded Action', () => {
    it('has a type of LOAD_BLOCKS_SUCCESS', () => {
      const blocks = [
        {
          id: 'AAAAAABB',
        },
      ];

      const expected = {
        type: LOAD_BLOCKS_SUCCESS,
        data: blocks,
      };
      expect(blocksLoaded(blocks)).toEqual(expected);
    });
  });
  describe('blocks error Action', () => {
    it('has a type of LOAD_BLOCKS_ERROR', () => {
      const error = {
        message: 'error #123',
      };

      const expected = {
        type: LOAD_BLOCKS_ERROR,
        error,
      };
      expect(blocksLoadingError(error)).toEqual(expected);
    });
  });
});
