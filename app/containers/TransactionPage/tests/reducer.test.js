import { fromJS } from 'immutable';
import transactionPageReducer from '../reducer';
import { loadTransaction, transactionLoaded } from '../actions';

describe('transactionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      data: {},
      loading: false,
      error: false,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      data: {},
      loading: false,
      error: false,
    });
    expect(transactionPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadTransaction action correctly', () => {
    const expectedResult = fromJS({
      data: {},
      loading: true,
      error: false,
    });

    expect(transactionPageReducer(state, loadTransaction())).toEqual(
      expectedResult,
    );
  });

  it('should handle the transactionLoaded action correctly', () => {
    const data = {
      id: '0000:12341234:1111',
    };

    const expectedResult = fromJS({
      data,
      loading: false,
      error: false,
    });

    expect(transactionPageReducer(state, transactionLoaded(data))).toEqual(
      expectedResult,
    );
  });
});
