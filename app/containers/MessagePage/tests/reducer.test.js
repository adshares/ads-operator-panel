import { fromJS } from 'immutable';
import messagePageReducer from '../reducer';
import {
  loadMessage,
  messageLoaded,
  messageLoadingError,
  loadTransactions,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';

describe('messagePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      message: {
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
      message: {
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
    expect(messagePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadMessage action correctly', () => {
    const expectedResult = fromJS({
      message: {
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

    const id = '0001:00000001';
    expect(messagePageReducer(state, loadMessage(id))).toEqual(expectedResult);
  });

  it('should handle the messageLoaded action correctly', () => {
    const data = {
      id: '0001-00000001',
    };

    const expectedResult = fromJS({
      message: {
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

    expect(messagePageReducer(state, messageLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle messageLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      message: {
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

    expect(messagePageReducer(state, messageLoadingError(error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadTransactions action correctly', () => {
    const expectedResult = fromJS({
      message: {
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
    const messageId = '0001-00000001';

    expect(messagePageReducer(state, loadTransactions(messageId))).toEqual(
      expectedResult,
    );
  });

  it('should handle the transactionsLoaded action correctly', () => {
    const data = {
      id: '0000:12341234:1111',
    };

    const expectedResult = fromJS({
      message: {
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

    expect(messagePageReducer(state, transactionsLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle transactionsLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      message: {
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

    expect(messagePageReducer(state, transactionsLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
