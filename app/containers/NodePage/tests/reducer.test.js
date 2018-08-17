import { fromJS } from 'immutable';
import nodePageReducer from '../reducer';

describe('nodePageReducer', () => {
  it('returns the initial state', () => {
    expect(nodePageReducer(undefined, {})).toEqual(
      fromJS({
        node: {
          loading: false,
          error: false,
          data: {},
        },
        accounts: {
          loading: false,
          error: false,
          data: [],
        },
      }),
    );
  });
});
