/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getSnapshots } from '../saga';
import { snapshotsLoaded, snapshotsLoadingError } from '../actions';
import { LOAD_SNAPSHOTS } from '../constants';

describe('getSnapshots Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    const action = {
      sort: 'id',
      order: 'desc',
      limit: 10,
      offset: 0,
    };

    getNodesGenarator = getSnapshots(action);

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the snapshotsLoaded action if it requests the data successfully', () => {
    const snapshots = [
      {
        id: '00000001',
      },
      {
        id: '00000002',
      },
    ];

    const putDescriptor = getNodesGenarator.next(snapshots).value;
    expect(putDescriptor).toEqual(put(snapshotsLoaded(snapshots)));
  });

  it('should call the snapshotsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(snapshotsLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_SNAPSHOTS action', () => {
    const takeNodes = saga.next().value;
    expect(takeNodes).toEqual(takeLatest(LOAD_SNAPSHOTS, getSnapshots));
  });
});
