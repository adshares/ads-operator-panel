/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getNodes, getBlocks, getTransactions } from '../saga';
import {
  latestNodesLoaded,
  latestNodesLoadingError,
  latestBlocksLoaded,
  latestBlocksLoadingError,
  latestTransactionsLoaded,
  latestTransactionsLoadingError,
} from '../actions';
import {
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_NODES,
  LOAD_LATEST_TRANSACTIONS,
} from '../constants';

describe('getNodes Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    getNodesGenarator = getNodes();

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the latestNodesLoaded action if it requests the data successfully', () => {
    const nodes = [
      {
        id: '0001',
      },
      {
        id: '0002',
      },
    ];
    const putDescriptor = getNodesGenarator.next(nodes).value;
    expect(putDescriptor).toEqual(put(latestNodesLoaded(nodes)));
  });

  it('should call the latestNodesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(latestNodesLoadingError(response)));
  });
});

describe('getBlocks Saga', () => {
  let getBlocksGenerator;

  beforeEach(() => {
    getBlocksGenerator = getBlocks();

    const selectDescriptor = getBlocksGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the latestBlocksLoaded action if it requests the data successfully', () => {
    const blocks = [
      {
        id: '5B67E3A0',
      },
      {
        id: '5B67E3A1',
      },
    ];
    const putDescriptor = getBlocksGenerator.next(blocks).value;
    expect(putDescriptor).toEqual(put(latestBlocksLoaded(blocks)));
  });

  it('should call the latestBlocksLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getBlocksGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(latestBlocksLoadingError(response)));
  });
});

describe('getTransactions Saga', () => {
  let getTransactionsGenerator;

  beforeEach(() => {
    getTransactionsGenerator = getTransactions();

    const selectDescriptor = getTransactionsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the latestTransactionsLoaded action if it requests the data successfully', () => {
    const transactions = [
      {
        id: '0001:00000001:0001',
      },
      {
        id: '0001:00000001:0002',
      },
    ];
    const putDescriptor = getTransactionsGenerator.next(transactions).value;
    expect(putDescriptor).toEqual(put(latestTransactionsLoaded(transactions)));
  });

  it('should call the latestTransactionsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTransactionsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(
      put(latestTransactionsLoadingError(response)),
    );
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_LATEST_NODES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_LATEST_NODES, getNodes),
    );
  });

  it('second task should be LOAD_LATEST_BLOCKS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_LATEST_BLOCKS, getBlocks),
    );
  });

  it('third task should be LOAD_LATEST_TRANSACTIONS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_LATEST_TRANSACTIONS, getTransactions),
    );
  });
});
