import { fromJS } from 'immutable';
import transactionPageReducer from '../reducer';
import {
  loadTransaction,
  transactionLoaded,
  tranasctionLoadingError,
} from '../actions';

describe('transactionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      transaction: {
        loading: false,
        error: false,
        data: {},
      },
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      transaction: {
        loading: false,
        error: false,
        data: {},
      },
    });
    expect(transactionPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadTransaction action correctly', () => {
    const expectedResult = fromJS({
      transaction: {
        loading: true,
        error: false,
        data: {},
      },
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
      transaction: {
        loading: false,
        error: false,
        data,
      },
    });

    expect(transactionPageReducer(state, transactionLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle transactionLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      transaction: {
        loading: false,
        error,
        data: {},
      },
    });

    expect(
      transactionPageReducer(state, tranasctionLoadingError(error)),
    ).toEqual(expectedResult);
  });
});
