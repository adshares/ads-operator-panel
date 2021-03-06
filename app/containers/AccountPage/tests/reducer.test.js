import { fromJS } from 'immutable';
import accountPageReducer from '../reducer';
import {
  loadAccount,
  accountLoaded,
  accountLoadingError,
  loadTransactions,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';

describe('accountPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      account: {
        loading: false,
        error: false,
        data: {},
      },
      transactions: {
        loading: false,
        error: false,
        data: [],
      },
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      account: {
        loading: false,
        error: false,
        data: {},
      },
      transactions: {
        loading: false,
        error: false,
        data: [],
      },
    });
    expect(accountPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadAccount action correctly', () => {
    const expectedResult = fromJS({
      account: {
        loading: true,
        error: false,
        data: {},
      },
      transactions: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(accountPageReducer(state, loadAccount())).toEqual(expectedResult);
  });

  it('should handle the accountLoaded action correctly', () => {
    const data = {
      id: '0000-12341234-1111',
    };

    const expectedResult = fromJS({
      account: {
        loading: false,
        error: false,
        data,
      },
      transactions: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(accountPageReducer(state, accountLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle accountLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      account: {
        loading: false,
        error,
        data: {},
      },
      transactions: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(accountPageReducer(state, accountLoadingError(error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadTransactions action correctly', () => {
    const expectedResult = fromJS({
      account: {
        loading: false,
        error: false,
        data: {},
      },
      transactions: {
        loading: true,
        error: false,
        data: [],
      },
    });

    expect(accountPageReducer(state, loadTransactions())).toEqual(
      expectedResult,
    );
  });

  it('should handle the transactionsLoaded action correctly', () => {
    const data = {
      id: '0000:12341234:1111',
    };

    const expectedResult = fromJS({
      account: {
        loading: false,
        error: false,
        data: {},
      },
      transactions: {
        loading: false,
        error: false,
        data,
      },
    });

    expect(accountPageReducer(state, transactionsLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle transactionsLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      account: {
        loading: false,
        error: false,
        data: {},
      },
      transactions: {
        loading: false,
        error,
        data: [],
      },
    });

    expect(accountPageReducer(state, transactionsLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
