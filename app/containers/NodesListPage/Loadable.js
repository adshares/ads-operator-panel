/**
 *
 * Asynchronously loads the component for NodesListPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
