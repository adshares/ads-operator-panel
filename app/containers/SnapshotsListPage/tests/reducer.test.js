import { fromJS } from 'immutable';
import snapshotsListPageReducer from '../reducer';
import {
  loadSnapshots,
  snapshotsLoaded,
  snapshotsLoadingError,
} from '../actions';

describe('snapshotsListPageReducer', () => {
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
    expect(snapshotsListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadSnapshots action correctly', () => {
    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: true,
      error: false,
    });

    expect(snapshotsListPageReducer(state, loadSnapshots())).toEqual(
      expectedResult,
    );
  });

  it('should handle the snapshotsLoaded action correctly', () => {
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
      snapshotsListPageReducer(state, snapshotsLoaded({ data, meta })),
    ).toEqual(expectedResult);
  });

  it('should handle the snapshotsLoadingError action correctly', () => {
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
      snapshotsListPageReducer(state, snapshotsLoadingError(error)),
    ).toEqual(expectedResult);
  });
});
