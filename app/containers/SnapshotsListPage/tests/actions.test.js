import {
  LOAD_SNAPSHOTS,
  LOAD_SNAPSHOTS_SUCCESS,
  LOAD_SNAPSHOTS_ERROR,
} from '../constants';
import {
  loadSnapshots,
  snapshotsLoadingError,
  snapshotsLoaded,
} from '../actions';

describe('SnapshotsListPage actions', () => {
  describe('Load snapshots Action', () => {
    it('has a type of LOAD_SNAPSHOTS', () => {
      const expected = {
        type: LOAD_SNAPSHOTS,
      };
      expect(loadSnapshots()).toEqual(expected);
    });
  });
  describe('snapshots loaded Action', () => {
    it('has a type of LOAD_SNAPSHOTS_SUCCESS', () => {
      const snapshots = [
        {
          id: 'AAAAAABB',
        },
      ];
      const meta = { count: 1 };

      const expected = {
        type: LOAD_SNAPSHOTS_SUCCESS,
        data: snapshots,
        meta,
      };
      expect(snapshotsLoaded({ data: snapshots, meta })).toEqual(expected);
    });
  });
  describe('snapshots error Action', () => {
    it('has a type of LOAD_SNAPSHOTS_ERROR', () => {
      const error = {
        message: 'error #123',
      };

      const expected = {
        type: LOAD_SNAPSHOTS_ERROR,
        error,
      };
      expect(snapshotsLoadingError(error)).toEqual(expected);
    });
  });
});
