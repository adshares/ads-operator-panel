import formatDate from 'lib/formatDate';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the snapshotsListPage state domain
 */

const selectSnapshotsListPageDomain = state =>
  state.get('snapshotsListPage', initialState);

const makeSelectSnapshots = () =>
  createSelector(selectSnapshotsListPageDomain, globalState => {
    const snapshots = globalState.toJS();
    snapshots.data.map(rawSnapshot => {
      const snapshot = rawSnapshot;
      snapshot.time = formatDate(snapshot.time);
      return snapshot;
    });

    return snapshots;
  });

export { makeSelectSnapshots };
