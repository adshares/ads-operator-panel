import formatDate from 'lib/formatDate';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBlockPageDomain = state => state.get('blockPage', initialState);

const makeSelectBlock = () =>
  createSelector(selectBlockPageDomain, globalState => {
    const block = globalState.get('block').toJS();

    if (block.data.time) {
      block.data.time = formatDate(block.data.time);
    }

    if (block.data.dividend_pay) {
      block.data.dividend_pay =
        block.data.dividend_pay === true ? 'true' : 'false';
    }

    return block;
  });

const makeSelectMessages = () =>
  createSelector(selectBlockPageDomain, globalState =>
    globalState.get('messages').toJS(),
  );

export { makeSelectBlock, makeSelectMessages };
