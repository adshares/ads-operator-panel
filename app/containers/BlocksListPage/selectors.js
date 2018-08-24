import moment from 'moment';
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
    blocks.data.forEach(block => {
      const date = moment.parseZone(block.time);
      block.time = date.format('YYYY-MM-DD HH:mm:ss'); // eslint-disable-line
      block.votes = `${block.vote_yes}/${block.vote_total}`; // eslint-disable-line
    });

    return blocks;
  });

export { makeSelectBlocks };
