import { fromJS } from 'immutable';
import nodePageReducer from '../reducer';
import {
  loadNode,
  nodeLoaded,
  nodeLoadingError,
  loadAccounts,
  accountsLoaded,
  accountsLoadingError,
} from '../actions';

describe('nodePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      node: {
        loading: false,
        error: false,
        data: {},
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
      },
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      node: {
        loading: false,
        error: false,
        data: {},
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
      },
    });
    expect(nodePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadNode action correctly', () => {
    const expectedResult = fromJS({
      node: {
        loading: true,
        error: false,
        data: {},
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(nodePageReducer(state, loadNode())).toEqual(expectedResult);
  });

  it('should handle the nodeLoaded action correctly', () => {
    const data = {
      id: '0001',
    };

    const expectedResult = fromJS({
      node: {
        loading: false,
        error: false,
        data,
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(nodePageReducer(state, nodeLoaded(data))).toEqual(expectedResult);
  });

  it('should handle nodeLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      node: {
        loading: false,
        error,
        data: {},
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(nodePageReducer(state, nodeLoadingError(error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadAccounts action correctly', () => {
    const expectedResult = fromJS({
      node: {
        loading: false,
        error: false,
        data: {},
      },
      accounts: {
        loading: true,
        error: false,
        data: [],
      },
    });

    expect(nodePageReducer(state, loadAccounts())).toEqual(expectedResult);
  });

  it('should handle the accountsLoaded action correctly', () => {
    const data = {
      id: '0000-12341234-1111',
    };

    const expectedResult = fromJS({
      node: {
        loading: false,
        error: false,
        data: {},
      },
      accounts: {
        loading: false,
        error: false,
        data,
      },
    });

    expect(nodePageReducer(state, accountsLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle accountsLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      node: {
        loading: false,
        error: false,
        data: {},
      },
      accounts: {
        loading: false,
        error,
        data: [],
      },
    });

    expect(nodePageReducer(state, accountsLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
