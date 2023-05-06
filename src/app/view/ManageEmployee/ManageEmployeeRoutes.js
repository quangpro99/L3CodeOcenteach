import { lazy } from 'react';
import Loadable from '~/components/Loadable';

const ManageEmployee = Loadable(lazy(() => import('./ManageEmployee')));

const ManageEmployeeRoutes = [{ path: '/manage_employee', element: <ManageEmployee /> }];

export default ManageEmployeeRoutes;
