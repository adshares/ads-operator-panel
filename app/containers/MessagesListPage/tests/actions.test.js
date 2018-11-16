import {
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
} from '../constants';
import { loadMessages, messagesLoadingError, messagesLoaded } from '../actions';

describe('MessagesListPage actions', () => {
  describe('Load messages Action', () => {
    it('has a type of LOAD_MESSAGES', () => {
      const expected = {
        type: LOAD_MESSAGES,
      };
      expect(loadMessages()).toEqual(expected);
    });
  });
  describe('messages loaded Action', () => {
    it('has a type of LOAD_MESSAGES_SUCCESS', () => {
      const messages = [
        {
          id: 'AAAAAABB',
        },
      ];

      const expected = {
        type: LOAD_MESSAGES_SUCCESS,
        data: messages,
      };
      expect(messagesLoaded(messages)).toEqual(expected);
    });
  });
  describe('messages error Action', () => {
    it('has a type of LOAD_MESSAGES_ERROR', () => {
      const error = {
        message: 'error #123',
      };

      const expected = {
        type: LOAD_MESSAGES_ERROR,
        error,
      };
      expect(messagesLoadingError(error)).toEqual(expected);
    });
  });
});
