/**
 *
 * Asynchronously loads the component for BlocksListPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
