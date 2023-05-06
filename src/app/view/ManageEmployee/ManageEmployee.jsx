import { styled, Box, Icon, Tooltip, IconButton } from '@mui/material';
import MaterialTable from '@material-table/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '~/components/Breadcrumb';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetListEmployee, getDetail } from '~/app/redux/actions/employeeActions';
import ManagerEmployeeDialog from './ManagerEmployeeDialog';
import Pagination from '~/components/Pagination/Pagination';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const ManageEmployee = () => {
  const dispatch = useDispatch();
  const pagiRef = useRef();
  const [openManagerEmployeeDialog, setOpenManagerEmployeeDialog] = useState(false);

  const listEmployee = useSelector((state) => state?.employee?.listEmployee);

  useEffect(() => {
    dispatch(GetListEmployee({ type: '5', RowsPerPage: 10, pageSize: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: 'Hành động',
      render: (rowdata) => {
        return (
          <>
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={() => {
                  dispatch(getDetail(rowdata.employeeId));
                  setOpenManagerEmployeeDialog(true);
                }}
              >
                <Icon color="success">visibilityIcon</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: 'Mã nhân viên', field: 'employeeId' },
    { title: 'Họ tên', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Số điện thoại', field: 'phone' },
    {
      title: 'Trạng thái',
      field: 'status',
      render: (rowData) => {
        if (rowData.status === 5) {
          return 'Đã duyệt';
        }
      },
    },
  ];

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Quản lý', path: '/' }, { name: 'Quản lý nhân viên' }]} />
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={''}
          data={listEmployee}
          columns={columns}
          options={{
            paging: false,
            rowStyle: (rowData, index) => {
              return {
                backgroundColor: index % 2 === 1 ? '#EEE' : '#FFF',
              };
            },
            maxBodyHeight: '480px',
            minBodyHeight: '480px',
            headerStyle: {
              backgroundColor: 'var(--primary)',
              color: '#fff',
            },
            padding: 'default',
            toolbar: true,
          }}
        />
      </Box>
      <Pagination ref={pagiRef} type="5" />
      {openManagerEmployeeDialog && (
        <ManagerEmployeeDialog
          handleClose={() => {
            setOpenManagerEmployeeDialog(false);
          }}
        />
      )}
      {/* {shouldOpenDialog && (
        <MoreInfoDialog
          handleClose={handleClose}
          openEditDialog={() => {
            setOpenManagerEmployeeDialog(true);
          }}
        />
      )} */}
    </Container>
  );
};

export default ManageEmployee;
