import { fromJS } from 'immutable';
import transactionsListPageReducer from '../reducer';
import {
  loadTransactions,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';

describe('transactionsListPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      data: [],
      loading: false,
      error: false,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      data: [],
      loading: false,
      error: false,
    });
    expect(transactionsListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadTransactions action correctly', () => {
    const expectedResult = fromJS({
      data: [],
      loading: true,
      error: false,
    });

    expect(transactionsListPageReducer(state, loadTransactions())).toEqual(
      expectedResult,
    );
  });

  it('should handle the transactionsLoaded action correctly', () => {
    const data = [
      {
        id: '0000:12341234:1111',
      },
    ];

    const expectedResult = fromJS({
      data,
      loading: false,
      error: false,
    });

    expect(
      transactionsListPageReducer(state, transactionsLoaded(data)),
    ).toEqual(expectedResult);
  });

  it('should handle the transactionsLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      data: [],
      loading: false,
      error,
    });

    expect(
      transactionsListPageReducer(state, transactionsLoadingError(error)),
    ).toEqual(expectedResult);
  });
});
