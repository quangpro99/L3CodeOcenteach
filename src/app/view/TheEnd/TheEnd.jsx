import { Box, styled, Tooltip, IconButton, Icon } from '@mui/material';
import Breadcrumb from '~/components/Breadcrumb';
import { ToastContainer } from 'react-toastify';
import MaterialTable from '@material-table/core';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { GetListEmployee, getDetail } from '~/app/redux/actions/employeeActions';
import TheEndDialog from './TheEndDialog';
import Pagination from '~/components/Pagination/Pagination';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const TheEnd = () => {
  const dispatch = useDispatch();
  const pagiRef = useRef();
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [hidden, setHidden] = useState('block');
  const [status, setStatus] = useState(false);
  const listEndEmployee = useSelector((state) => state?.employee?.listEmployee);

  useEffect(() => {
    dispatch(GetListEmployee({ type: '9,10,11,12,13', RowsPerPage: 10, pageSize: 1 }));
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
            <Tooltip title="Thông tin ">
              <IconButton
                onClick={() => {
                  dispatch(getDetail(rowdata.employeeId));
                  setShouldOpenDialog(true);
                  setHidden('block');
                  setStatus(false);
                }}
                disabled={rowdata.status === 9 || rowdata.status === 11 ? false : true}
              >
                <Icon color={rowdata.status === 9 || rowdata.status === 11 ? 'primary' : 'disabled'}>report</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={() => {
                  dispatch(getDetail(rowdata.employeeId));
                  setShouldOpenDialog(true);
                  setStatus(true);
                  setHidden('none');
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
    {
      title: 'Vị trí',
      field: 'teamId',
      render: (rowData) => {
        if (rowData.teamId === 1) {
          return 'Back-End';
        } else if (rowData.teamId === 2) {
          return 'Font-End';
        } else if (rowData.teamId === 3) {
          return 'Design';
        }
      },
    },
    { title: 'Email', field: 'email' },
    { title: 'Số điện thoại', field: 'phone' },
    {
      title: 'Trạng thái',
      field: 'status',
      render: (rowData) => {
        if (rowData.status === 9) {
          return 'Yêu cầu bổ sung đối với kết thúc';
        } else if (rowData.status === 10) {
          return 'Đã duyệt kết thúc';
        } else if (rowData.status === 11) {
          return 'Đã từ chối kết thúc';
        } else if (rowData.status === 12) {
          return 'Không có trạng thái';
        } else if (rowData.status === 13) {
          return 'Đã lưu hồ sơ';
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
        <Breadcrumb routeSegments={[{ name: 'Lãnh đạo', path: '/' }, { name: 'Kết thúc' }]} />
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={''}
          data={listEndEmployee}
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
      <Pagination ref={pagiRef} type="9,10,11,12,13" />
      {shouldOpenDialog && <TheEndDialog handleClose={handleClose} hidden={hidden} status={status} />}
    </Container>
  );
};

export default TheEnd;
