/*
 *
 * MessagePage actions
 *
 */

import {
  LOAD_MESSAGE,
  LOAD_MESSAGE_SUCCESS,
  LOAD_MESSAGE_ERROR,
} from './constants';

export function loadMessage(id) {
  return {
    type: LOAD_MESSAGE,
    id,
  };
}

export function messageLoaded(data) {
  return {
    type: LOAD_MESSAGE_SUCCESS,
    data,
  };
}

export function messageLoadingError(error) {
  return {
    type: LOAD_MESSAGE_ERROR,
    error,
  };
}
