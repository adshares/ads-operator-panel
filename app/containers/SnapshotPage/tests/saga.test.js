/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getSnapshot, getNodes, getAccounts } from '../saga';
import {
  snapshotLoaded,
  snapshotLoadingError,
  nodesLoaded,
  nodesLoadingError,
  accountsLoaded,
  accountsLoadingError,
} from '../actions';
import { LOAD_SNAPSHOT, LOAD_NODES, LOAD_ACCOUNTS } from '../constants';

describe('getSnapshot Saga', () => {
  let getSnapshotGenarator;

  beforeEach(() => {
    const action = {
      id: 'ABC11234',
    };

    getSnapshotGenarator = getSnapshot(action);

    const selectDescriptor = getSnapshotGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the snapshotLoaded action if it requests the data successfully', () => {
    const snapshot = {
      id: 'ABC11234',
    };

    const putDescriptor = getSnapshotGenarator.next(snapshot).value;
    expect(putDescriptor).toEqual(put(snapshotLoaded(snapshot)));
  });

  it('should call the snapshotLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getSnapshotGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(snapshotLoadingError(response)));
  });
});

describe('getNodes Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    const action = {
      snapshotId: 'ABC11234',
    };

    getNodesGenarator = getNodes(action);

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the nodesLoaded action if it requests the data successfully', () => {
    const nodes = [
      {
        id: '000F:00003823',
      },
    ];

    const putDescriptor = getNodesGenarator.next(nodes).value;
    expect(putDescriptor).toEqual(put(nodesLoaded(nodes)));
  });

  it('should call the nodesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(nodesLoadingError(response)));
  });
});

describe('getAccounts Saga', () => {
  let getAccountsGenarator;

  beforeEach(() => {
    const action = {
      snapshotId: 'ABC11234',
    };

    getAccountsGenarator = getAccounts(action);

    const selectDescriptor = getAccountsGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the accountsLoaded action if it requests the data successfully', () => {
    const accounts = [
      {
        id: '000F:00003823:0001',
      },
    ];

    const putDescriptor = getAccountsGenarator.next(accounts).value;
    expect(putDescriptor).toEqual(put(accountsLoaded(accounts)));
  });

  it('should call the accountsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAccountsGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(accountsLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_SNAPSHOT action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_SNAPSHOT, getSnapshot),
    );
  });

  it('second task should be LOAD_NODES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_NODES, getNodes));
  });

  it('second task should be LOAD_ACCOUNTS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_ACCOUNTS, getAccounts),
    );
  });
});
