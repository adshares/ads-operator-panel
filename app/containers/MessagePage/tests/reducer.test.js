import { fromJS } from 'immutable';
import messagePageReducer from '../reducer';
import { loadMessage, messageLoaded, messageLoadingError } from '../actions';

describe('messagePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      data: {},
      loading: false,
      error: false,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = fromJS({
      data: {},
      loading: false,
      error: false,
    });
    expect(messagePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the laodMessage action correctly', () => {
    const expectedResult = fromJS({
      data: {},
      loading: true,
      error: false,
    });

    const id = '0001:00000001';

    expect(messagePageReducer(state, loadMessage(id))).toEqual(expectedResult);
  });

  it('should handle the messageLoaded action correctly', () => {
    const data = {
      id: '0001:00000001',
    };

    const expectedResult = fromJS({
      data,
      loading: false,
      error: false,
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
      loading: false,
      error,
      data: {},
    });

    expect(messagePageReducer(state, messageLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
