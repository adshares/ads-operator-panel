import { fromJS } from 'immutable';
import messagesListPageReducer from '../reducer';
import { loadMessages, messagesLoaded, messagesLoadingError } from '../actions';

describe('messagesListPageReducer', () => {
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
    expect(messagesListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadMessages action correctly', () => {
    const expectedResult = fromJS({
      data: [],
      meta: { count: 0 },
      loading: true,
      error: false,
    });

    expect(messagesListPageReducer(state, loadMessages())).toEqual(
      expectedResult,
    );
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

    expect(
      messagesListPageReducer(state, messagesLoaded({ data, meta })),
    ).toEqual(expectedResult);
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

    expect(messagesListPageReducer(state, messagesLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
