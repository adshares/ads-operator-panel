import moment from 'moment';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBlockPageDomain = state => state.get('blockPage', initialState);

const makeSelectBlock = () =>
  createSelector(selectBlockPageDomain, globalState => {
    const block = globalState.get('block').toJS();
    const date = moment.parseZone(block.data.time);
    block.data.time = date.format('YYYY-MM-DD HH:mm:ss'); // eslint-disable-line no-param-reassign
    block.data.dividend_pay =
      block.data.dividend_pay === true ? 'true' : 'false';

    return block;
  });

const makeSelectMessages = () =>
  createSelector(selectBlockPageDomain, globalState =>
    globalState.get('messages').toJS(),
  );

export { makeSelectBlock, makeSelectMessages };
