/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getNode, getAccounts } from '../saga';
import {
  accountsLoaded,
  accountsLoadingError,
  nodeLoaded,
  nodeLoadingError,
} from '../actions';
import { LOAD_ACCOUNTS, LOAD_NODE } from '../constants';

describe('getNode Saga', () => {
  let getNodeGenarator;

  beforeEach(() => {
    const action = {
      id: '0001',
    };

    getNodeGenarator = getNode(action);

    const selectDescriptor = getNodeGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the nodeLoaded action if it requests the data successfully', () => {
    const node = {
      id: '0001',
    };

    const putDescriptor = getNodeGenarator.next(node).value;
    expect(putDescriptor).toEqual(put(nodeLoaded(node)));
  });

  it('should call the nodeLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodeGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(nodeLoadingError(response)));
  });
});

describe('getAccounts Saga', () => {
  let getAccountsGenarator;

  beforeEach(() => {
    const action = {
      nodeId: '0001',
    };

    getAccountsGenarator = getAccounts(action);

    const selectDescriptor = getAccountsGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the accountsLoaded action if it requests the data successfully', () => {
    const node = [
      {
        id: '0001',
      },
    ];

    const putDescriptor = getAccountsGenarator.next(node).value;
    expect(putDescriptor).toEqual(put(accountsLoaded(node)));
  });

  it('should call the accountsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAccountsGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(accountsLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_NODE action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_NODE, getNode));
  });

  it('second task should be LOAD_ACCOUNTS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_ACCOUNTS, getAccounts),
    );
  });
});
