/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getTransactions } from '../saga';
import { transactionsLoaded, transactionsLoadingError } from '../actions';
import { LOAD_TRANSACTIONS } from '../constants';

describe('getTransactions Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    const action = {
      sort: 'id',
      order: 'desc',
      limit: 10,
      offset: 0,
    };

    getNodesGenarator = getTransactions(action);

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the transactionsLoaded action if it requests the data successfully', () => {
    const transactions = [
      {
        id: '0001',
      },
      {
        id: '0002',
      },
    ];

    const putDescriptor = getNodesGenarator.next(transactions).value;
    expect(putDescriptor).toEqual(put(transactionsLoaded(transactions)));
  });

  it('should call the transactionsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(transactionsLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_TRANSACTIONS action', () => {
    const takeNodes = saga.next().value;
    expect(takeNodes).toEqual(takeLatest(LOAD_TRANSACTIONS, getTransactions));
  });
});
