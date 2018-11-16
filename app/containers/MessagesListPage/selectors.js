import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the messagesListPage state domain
 */

const selectMessagesListPageDomain = state =>
  state.get('messagesListPage', initialState);

const makeSelectMessages = () =>
  createSelector(selectMessagesListPageDomain, globalState =>
    globalState.toJS(),
  );

export { makeSelectMessages };
