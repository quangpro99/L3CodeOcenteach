import { lazy } from 'react';
import Loadable from '~/components/Loadable';

const Approved = Loadable(lazy(() => import('./Approved')));

const ApprovedRoutes = [{ path: '/approved', element: <Approved /> }];

export default ApprovedRoutes;
