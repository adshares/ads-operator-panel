/**
 *
 * Asynchronously loads the component for BlockExplorerPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
