/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getTransaction } from '../saga';
import { transactionLoaded, tranasctionLoadingError } from '../actions';
import { LOAD_TRANSACTION } from '../constants';

describe('getTransaction Saga', () => {
  let getTransactionGenarator;

  beforeEach(() => {
    const action = {
      id: '0001:00000000-1234',
    };

    getTransactionGenarator = getTransaction(action);

    const selectDescriptor = getTransactionGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the transactionLoaded action if it requests the data successfully', () => {
    const transaction = {
      id: '0001:00000000-1234',
    };

    const putDescriptor = getTransactionGenarator.next(transaction).value;
    expect(putDescriptor).toEqual(put(transactionLoaded(transaction)));
  });

  it('should call the transactionLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTransactionGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(tranasctionLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_TRANSACTION action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_TRANSACTION, getTransaction),
    );
  });
});
