import { styled, Box, Tooltip, IconButton, Icon } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Breadcrumb from '~/components/Breadcrumb';
import MaterialTable from '@material-table/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { GetListEmployee, getDetail } from '~/app/redux/actions/employeeActions';
import ApprovalDialog from './ApprovalDialog';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '~/components/Pagination/Pagination';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Approval = () => {
  const dispatch = useDispatch();
  const pagiRef = useRef();
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const listApproval = useSelector((state) => state?.employee?.listEmployee);

  useEffect(() => {
    dispatch(GetListEmployee({ type: '2,3,8,16', RowsPerPage: 10, pageSize: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShouldOpenDialog(false);
  };

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
                  setShouldOpenDialog(true);
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
        if (rowData.status === 2) {
          return 'Chờ xử lý';
        } else if (rowData.status === 3) {
          return 'Chờ duyệt';
        } else if (rowData.status === 8) {
          return 'Chờ duyệt kết thúc';
        } else if (rowData.status === 16) {
          return 'Chờ duyệt';
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
        <Breadcrumb routeSegments={[{ name: 'Lãnh đạo', path: '/' }, { name: 'Chờ duyệt' }]} />
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={''}
          data={listApproval}
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
      <Pagination ref={pagiRef} type="2,3,8,16" />
      {shouldOpenDialog && <ApprovalDialog handleClose={handleClose} />}
    </Container>
  );
};

export default Approval;
