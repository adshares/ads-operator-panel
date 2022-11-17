import { fromJS } from 'immutable';
import snapshotPageReducer from '../reducer';
import {
  loadSnapshot,
  snapshotLoaded,
  snapshotLoadingError,
  loadNodes,
  nodesLoaded,
  nodesLoadingError,
  loadAccounts,
  accountsLoaded,
  accountsLoadingError,
} from '../actions';

describe('snapshotPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });
    expect(snapshotPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadSnapshot action correctly', () => {
    const expectedResult = fromJS({
      snapshot: {
        loading: true,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });

    const id = '5B767220';

    expect(snapshotPageReducer(state, loadSnapshot(id))).toEqual(
      expectedResult,
    );
  });

  it('should handle the snapshotLoaded action correctly', () => {
    const data = {
      id: '5B767220',
    };

    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data,
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });

    expect(snapshotPageReducer(state, snapshotLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle snapshotLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });

    expect(snapshotPageReducer(state, snapshotLoadingError(error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadNodes action correctly', () => {
    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: true,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });

    expect(snapshotPageReducer(state, loadNodes())).toEqual(expectedResult);
  });

  it('should handle the nodesLoaded action correctly', () => {
    const data = [
      {
        id: '0000:12345678',
      },
    ];
    const meta = { count: 1 };

    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data,
        meta,
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });

    expect(snapshotPageReducer(state, nodesLoaded({ data, meta }))).toEqual(
      expectedResult,
    );
  });

  it('should handle nodesLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });

    expect(snapshotPageReducer(state, nodesLoadingError(error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadAccounts action correctly', () => {
    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: true,
        error: false,
        data: [],
        meta: { count: 0 },
      },
    });

    expect(snapshotPageReducer(state, loadAccounts())).toEqual(expectedResult);
  });

  it('should handle the accountsLoaded action correctly', () => {
    const data = [
      {
        id: '000F:00003823:0001',
      },
    ];
    const meta = { count: 1 };

    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error: false,
        data,
        meta,
      },
    });

    expect(snapshotPageReducer(state, accountsLoaded({ data, meta }))).toEqual(
      expectedResult,
    );
  });

  it('should handle accountsLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      snapshot: {
        loading: false,
        error: false,
        data: {},
      },
      nodes: {
        loading: false,
        error: false,
        data: [],
        meta: { count: 0 },
      },
      accounts: {
        loading: false,
        error,
        data: [],
        meta: { count: 0 },
      },
    });

    expect(snapshotPageReducer(state, accountsLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
