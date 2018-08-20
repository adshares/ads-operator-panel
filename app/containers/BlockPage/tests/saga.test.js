/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getBlock, getMessages } from '../saga';
import {
  blockLoaded,
  blockLoadingError,
  messagesLoaded,
  messagesLoadingError,
} from '../actions';
import { LOAD_BLOCK, LOAD_MESSAGES } from '../constants';

describe('getBlock Saga', () => {
  let getBlockGenarator;

  beforeEach(() => {
    const action = {
      id: 'ABC11234',
    };

    getBlockGenarator = getBlock(action);

    const selectDescriptor = getBlockGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the blockLoaded action if it requests the data successfully', () => {
    const block = {
      id: 'ABC11234',
    };

    const putDescriptor = getBlockGenarator.next(block).value;
    expect(putDescriptor).toEqual(put(blockLoaded(block)));
  });

  it('should call the blockLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getBlockGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(blockLoadingError(response)));
  });
});

describe('getMessages Saga', () => {
  let getMessagesGenarator;

  beforeEach(() => {
    const action = {
      blockId: 'ABC11234',
    };

    getMessagesGenarator = getMessages(action);

    const selectDescriptor = getMessagesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the messagesLoaded action if it requests the data successfully', () => {
    const transactions = [
      {
        id: '0001:12345678',
      },
    ];

    const putDescriptor = getMessagesGenarator.next(transactions).value;
    expect(putDescriptor).toEqual(put(messagesLoaded(transactions)));
  });

  it('should call the messagesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getMessagesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(messagesLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_BLOCK action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_BLOCK, getBlock));
  });

  it('second task should be LOAD_MESSAGES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_MESSAGES, getMessages),
    );
  });
});
