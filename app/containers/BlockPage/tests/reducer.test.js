import { fromJS } from 'immutable';
import blockPageReducer from '../reducer';
import {
  loadBlock,
  blockLoaded,
  blockLoadingError,
  loadMessages,
  messagesLoaded,
  messagesLoadingError,
} from '../actions';

describe('blockPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      block: {
        loading: false,
        error: false,
        data: {},
      },
      messages: {
        loading: false,
        error: false,
        data: [],
      },
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      block: {
        loading: false,
        error: false,
        data: {},
      },
      messages: {
        loading: false,
        error: false,
        data: [],
      },
    });
    expect(blockPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadBlock action correctly', () => {
    const expectedResult = fromJS({
      block: {
        loading: true,
        error: false,
        data: {},
      },
      messages: {
        loading: false,
        error: false,
        data: [],
      },
    });

    const id = '5B767220';

    expect(blockPageReducer(state, loadBlock(id))).toEqual(expectedResult);
  });

  it('should handle the blockLoaded action correctly', () => {
    const data = {
      id: '5B767220',
    };

    const expectedResult = fromJS({
      block: {
        loading: false,
        error: false,
        data,
      },
      messages: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(blockPageReducer(state, blockLoaded(data))).toEqual(expectedResult);
  });

  it('should handle blockLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      block: {
        loading: false,
        error,
        data: {},
      },
      messages: {
        loading: false,
        error: false,
        data: [],
      },
    });

    expect(blockPageReducer(state, blockLoadingError(error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadMessages action correctly', () => {
    const expectedResult = fromJS({
      block: {
        loading: false,
        error: false,
        data: {},
      },
      messages: {
        loading: true,
        error: false,
        data: [],
      },
    });

    expect(blockPageReducer(state, loadMessages())).toEqual(expectedResult);
  });

  it('should handle the messagesLoaded action correctly', () => {
    const data = [
      {
        id: '0000:12345678',
      },
    ];

    const expectedResult = fromJS({
      block: {
        loading: false,
        error: false,
        data: {},
      },
      messages: {
        loading: false,
        error: false,
        data,
      },
    });

    expect(blockPageReducer(state, messagesLoaded(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle messagesLoadingError action correctly', () => {
    const error = {
      message: 'custom error',
    };

    const expectedResult = fromJS({
      block: {
        loading: false,
        error: false,
        data: {},
      },
      messages: {
        loading: false,
        error,
        data: [],
      },
    });

    expect(blockPageReducer(state, messagesLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
