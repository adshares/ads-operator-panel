/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getMessages } from '../saga';
import { messagesLoaded, messagesLoadingError } from '../actions';
import { LOAD_MESSAGES } from '../constants';

describe('getMessages Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    const action = {
      sort: 'id',
      order: 'desc',
      limit: 10,
      offset: 0,
    };

    getNodesGenarator = getMessages(action);

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the messagesLoaded action if it requests the data successfully', () => {
    const messages = [
      {
        id: '00000001',
      },
      {
        id: '00000002',
      },
    ];

    const putDescriptor = getNodesGenarator.next(messages).value;
    expect(putDescriptor).toEqual(put(messagesLoaded(messages)));
  });

  it('should call the messagesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(messagesLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_MESSAGES action', () => {
    const takeNodes = saga.next().value;
    expect(takeNodes).toEqual(takeLatest(LOAD_MESSAGES, getMessages));
  });
});
