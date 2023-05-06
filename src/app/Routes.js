import Error from '~/components/Error';
import Layout from '~/components/Layout/Layout';
import AddEmployeeRoutes from './view/AddEmployee/AddEmployeeRoutes';
import ApprovalRoutes from './view/Approval/ApprovalRoutes';
import ApprovedRoutes from './view/Approved/ApprovedRoutes';
import ManageEmployeeRoutes from './view/ManageEmployee/ManageEmployeeRoutes';
import TheEndRoutes from './view/TheEnd/TheEndRoutes';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [...AddEmployeeRoutes, ...ApprovalRoutes, ...ApprovedRoutes, ...ManageEmployeeRoutes, ...TheEndRoutes],
  },
  { path: '*', element: <Error /> },
];
export default routes;
