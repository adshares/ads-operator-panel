import formatDate from 'lib/formatDate';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blocksListPage state domain
 */

const selectBlocksListPageDomain = state =>
  state.get('blocksListPage', initialState);

const makeSelectBlocks = () =>
  createSelector(selectBlocksListPageDomain, globalState => {
    const blocks = globalState.toJS();
    blocks.data.map(rawBlock => {
      const block = rawBlock;
      block.time = formatDate(block.time);
      block.votes = `${block.vote_yes}/${block.vote_total}`;
      block.message_and_transaction_count = `${block.message_count} / ${
        block.transaction_count
      }`;

      return block;
    });

    return blocks;
  });

export { makeSelectBlocks };
