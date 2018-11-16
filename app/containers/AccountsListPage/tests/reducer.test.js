import { fromJS } from 'immutable';
import accountsListPageReducer from '../reducer';
import { loadAccounts, accountsLoaded, accountsLoadingError } from '../actions';

describe('accountsListPageReducer', () => {
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
    expect(accountsListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadAccounts action correctly', () => {
    const expectedResult = fromJS({
      data: [],
      loading: true,
      error: false,
    });

    expect(accountsListPageReducer(state, loadAccounts())).toEqual(
      expectedResult,
    );
  });

  it('should handle the accountsLoaded action correctly', () => {
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

    expect(accountsListPageReducer(state, accountsLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle the accountsLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      data: [],
      loading: false,
      error,
    });

    expect(accountsListPageReducer(state, accountsLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
