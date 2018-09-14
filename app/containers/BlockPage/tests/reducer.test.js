import { fromJS } from 'immutable';
import blockPageReducer from '../reducer';

describe('blockPageReducer', () => {
  it('returns the initial state', () => {
    expect(blockPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
