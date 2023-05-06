import { lazy } from 'react';
import Loadable from '~/components/Loadable';

const TheEnd = Loadable(lazy(() => import('./TheEnd')));

const TheEndRoutes = [{ path: '/the_end', element: <TheEnd /> }];

export default TheEndRoutes;
