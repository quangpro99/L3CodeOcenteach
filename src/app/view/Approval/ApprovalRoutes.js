import { lazy } from 'react';
import Loadable from '~/components/Loadable';

const Approval = Loadable(lazy(() => import('./Approval')));

const ApprovalRoutes = [{ path: '/approval', element: <Approval /> }];

export default ApprovalRoutes;
