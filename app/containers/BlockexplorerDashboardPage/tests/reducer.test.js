import { fromJS } from 'immutable';
import blockexplorerDashboardPageReducer from '../reducer';

describe('blockexplorerDashboardPageReducer', () => {
  it('returns the initial state', () => {
    expect(blockexplorerDashboardPageReducer(undefined, {})).toEqual(
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
