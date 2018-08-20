/*
 *
 * BlockPage actions
 *
 */

import {
  LOAD_BLOCK,
  LOAD_BLOCK_SUCCESS,
  LOAD_BLOCK_ERROR,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
} from './constants';

export function loadBlock(id) {
  return {
    type: LOAD_BLOCK,
    id,
  };
}

export function blockLoaded(data) {
  return {
    type: LOAD_BLOCK_SUCCESS,
    data,
  };
}

export function blockLoadingError(error) {
  return {
    type: LOAD_BLOCK_ERROR,
    error,
  };
}

export function loadMessages(blockId) {
  return {
    type: LOAD_MESSAGES,
    blockId,
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
