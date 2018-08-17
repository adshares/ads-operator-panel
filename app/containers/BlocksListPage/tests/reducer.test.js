import { fromJS } from 'immutable';
import blocksListPageReducer from '../reducer';
import { loadBlocks, blocksLoaded, blocksLoadingError } from '../actions';

describe('blocksListPageReducer', () => {
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
    expect(blocksListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadBlocks action correctly', () => {
    const expectedResult = fromJS({
      data: [],
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

    const expectedResult = fromJS({
      data,
      loading: false,
      error: false,
    });

    expect(blocksListPageReducer(state, blocksLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle the blocksLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      data: [],
      loading: false,
      error,
    });

    expect(blocksListPageReducer(state, blocksLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
