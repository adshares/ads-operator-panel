import { fromJS } from 'immutable';
import nodesListPageReducer from '../reducer';

describe('nodesListPageReducer', () => {
  it('returns the initial state', () => {
    expect(nodesListPageReducer(undefined, {})).toEqual(
      fromJS({
        loading: false,
        error: false,
        data: [],
      }),
    );
  });
});
