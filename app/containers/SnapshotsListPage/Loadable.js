/**
 *
 * Asynchronously loads the component for SnapshotsListPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
