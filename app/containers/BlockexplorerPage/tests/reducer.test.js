import { fromJS } from 'immutable';
import blockexplorerReducer from '../reducer';

describe('blockexplorerReducer', () => {
  it('returns the initial state', () => {
    expect(blockexplorerReducer(undefined, {})).toEqual(
      fromJS({
        nodes: {
          loading: false,
          error: false,
          data: [],
        },
        blocks: {
          loading: false,
          error: false,
          data: [],
        },
        transactions: {
          loading: false,
          error: false,
          data: [],
        },
      }),
    );
  });
});
