import { fromJS } from 'immutable';
import blockexplorerReducer from '../reducer';

describe('blockexplorerReducer', () => {
  it('returns the initial state', () => {
    expect(blockexplorerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
