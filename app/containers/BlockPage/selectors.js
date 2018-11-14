import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBlockPageDomain = state => state.get('blockPage', initialState);

const makeSelectBlock = () =>
  createSelector(selectBlockPageDomain, globalState => {
    const block = globalState.get('block').toJS();
    block.prettyData = Object.assign(
      {
        votes: `${block.data.vote_yes}/${block.data.vote_total}`,
        dividend_pay: block.data.dividend_pay === true ? 'true' : 'false',
      },
      block.data,
    );

    return block;
  });

const makeSelectMessages = () =>
  createSelector(selectBlockPageDomain, globalState =>
    globalState.get('messages').toJS(),
  );

export { makeSelectBlock, makeSelectMessages };
