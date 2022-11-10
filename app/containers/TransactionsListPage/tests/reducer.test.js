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
      meta: { count: 0 },
      loading: false,
      error: false,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: false,
      error: false,
    });
    expect(transactionsListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadTransactions action correctly', () => {
    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
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
    const meta = { count: 1 };

    const expectedResult = fromJS({
      data,
      meta,
      loading: false,
      error: false,
    });

    expect(
      transactionsListPageReducer(state, transactionsLoaded({ data, meta })),
    ).toEqual(expectedResult);
  });

  it('should handle the transactionsLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: false,
      error,
    });

    expect(
      transactionsListPageReducer(state, transactionsLoadingError(error)),
    ).toEqual(expectedResult);
  });
});
