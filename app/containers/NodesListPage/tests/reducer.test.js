import { fromJS } from 'immutable';
import nodesListPageReducer from '../reducer';
import { loadNodes, nodesLoaded, nodesLoadingError } from '../actions';

describe('nodesListPageReducer', () => {
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
    expect(nodesListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadMessages action correctly', () => {
    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: true,
      error: false,
    });

    expect(nodesListPageReducer(state, loadNodes())).toEqual(expectedResult);
  });

  it('should handle the messagesLoaded action correctly', () => {
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

    expect(nodesListPageReducer(state, nodesLoaded({ data, meta }))).toEqual(
      expectedResult,
    );
  });

  it('should handle the messagesLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: false,
      error,
    });

    expect(nodesListPageReducer(state, nodesLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
