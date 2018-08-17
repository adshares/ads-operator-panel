/**
 *
 * Asynchronously loads the component for LatestPanel
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
