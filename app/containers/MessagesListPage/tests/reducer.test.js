import { fromJS } from 'immutable';
import messagesListPageReducer from '../reducer';
import { loadMessages, messagesLoaded, messagesLoadingError } from '../actions';

describe('messagesListPageReducer', () => {
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
    expect(messagesListPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadMessages action correctly', () => {
    const expectedResult = fromJS({
      data: [],
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

    const expectedResult = fromJS({
      data,
      loading: false,
      error: false,
    });

    expect(messagesListPageReducer(state, messagesLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle the messagesLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      data: [],
      loading: false,
      error,
    });

    expect(messagesListPageReducer(state, messagesLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
