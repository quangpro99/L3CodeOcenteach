import Loadable from '~/components/Loadable';
import { lazy } from 'react';

const AddEmployee = Loadable(lazy(() => import('./AddEmployee')));

const AddEmployeeRoutes = [{ path: '/add_employee', element: <AddEmployee /> }];

export default AddEmployeeRoutes;
