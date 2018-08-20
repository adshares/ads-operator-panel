import {
  loadBlock,
  loadMessages,
  blockLoaded,
  messagesLoaded,
} from '../actions';
import {
  LOAD_BLOCK,
  LOAD_MESSAGES,
  LOAD_BLOCK_SUCCESS,
  LOAD_MESSAGES_SUCCESS,
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
});
