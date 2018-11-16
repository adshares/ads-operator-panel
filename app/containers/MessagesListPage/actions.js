/*
 *
 * MessagesListPage actions
 *
 */

import {
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
} from './constants';

export function loadMessages(limit, offset, sort, order) {
  return {
    type: LOAD_MESSAGES,
    limit,
    offset,
    sort,
    order,
  };
}

export function messagesLoaded(data) {
  return {
    type: LOAD_MESSAGES_SUCCESS,
    data,
  };
}

export function messagesLoadingError(error) {
  return {
    type: LOAD_MESSAGES_ERROR,
    error,
  };
}
