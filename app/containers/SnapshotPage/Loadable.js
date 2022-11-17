/**
 *
 * Asynchronously loads the component for SnapshotPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
