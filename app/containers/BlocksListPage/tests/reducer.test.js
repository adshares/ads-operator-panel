import { fromJS } from 'immutable';
import blocksListPageReducer from '../reducer';
import { loadBlocks, blocksLoaded, blocksLoadingError } from '../actions';

describe('blocksListPageReducer', () => {
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
    expect(blocksListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadBlocks action correctly', () => {
    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: true,
      error: false,
    });

    expect(blocksListPageReducer(state, loadBlocks())).toEqual(expectedResult);
  });

  it('should handle the blocksLoaded action correctly', () => {
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

    expect(blocksListPageReducer(state, blocksLoaded({ data, meta }))).toEqual(
      expectedResult,
    );
  });

  it('should handle the blocksLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: false,
      error,
    });

    expect(blocksListPageReducer(state, blocksLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
