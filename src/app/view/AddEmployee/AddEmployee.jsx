import { Box, styled, Button, Tooltip, Icon, IconButton } from '@mui/material';
import MaterialTable from '@material-table/core';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Breadcrumb from '~/components/Breadcrumb';
import AddEmployeeDialog from './AddEmployeeDialog';
import { GetDataEmployee, GetListEmployee, deleteEmployee, getDetail } from '~/app/redux/actions/employeeActions';
import ConfirmDialog from '~/components/ConfirmDialog/ConfirmDialog';
import 'react-toastify/dist/ReactToastify.css';
import ApprovalDialog from '../Approval/ApprovalDialog';
import Pagination from '~/components/Pagination/Pagination';
import AdditionalDialog from './AdditionalDialog';

const AddEmployeeRoot = styled('div')(() => ({
  margin: '30px',
  '& .breadcrumb': {
    marginBottom: '30px',
  },
}));

const AddEmployee = () => {
  const dispatch = useDispatch();
  //open dialog add employee
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  //add data delete
  const [employeeDelete, setEmployeeDelete] = useState('');
  const [hidden, setHidden] = useState(false);
  //open dialog delete
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] = useState(false);
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false);
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  //pagination
  const pagiRef = useRef();
  const listEmployee = useSelector((state) => state?.employee?.listEmployee);
  const isTrigger = useSelector((state) => state?.employee?.isTrigger);
  const [show, setShow] = useState('block');

  //dispatch, selector employee
  useEffect(() => {
    dispatch(GetListEmployee({ type: '1,3,4,6', RowsPerPage: 10, pageSize: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrigger]);

  const handleClose = () => {
    setShouldOpenDialog(false);
  };

  //xóa nhân viên
  const handleChangeEmployee = (rowdata, method) => {
    if (method === 1) {
      dispatch(GetDataEmployee(rowdata));
      setShouldOpenDialog(true);
    }
    if (method === 0) {
      dispatch(deleteEmployee({ id: rowdata.employeeId }));
      setshouldOpenConfirmationDeleteDialog(false);
    }
  };

  const columns = [
    {
      title: 'Hành động',
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Thông tin">
              <IconButton
                disabled={rowData.status === 4 ? false : true}
                onClick={() => {
                  dispatch(getDetail(rowData.employeeId));
                  setHidden(true);
                  setShouldOpenRequestDialog(true);
                }}
              >
                <Icon color={rowData.status === 4 ? 'primary' : 'disabled'}>report</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem chi tiết">
              <IconButton
                // disabled={rowData.status !== 1 ? false : true}
                onClick={() => {
                  setShouldOpenViewDialog(true);
                  dispatch(getDetail(rowData.employeeId));
                }}
              >
                <Icon color={'success'}>visibilityIcon</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton
                onClick={() => {
                  dispatch(getDetail(rowData.employeeId));
                  setHidden(true);
                  setShouldOpenDialog(true);
                  setShow('none');
                }}
              >
                <Icon style={{ color: 'var(--primary)' }}>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                disabled={rowData.status === 1 ? false : true}
                onClick={() => {
                  setEmployeeDelete(rowData);
                  setshouldOpenConfirmationDeleteDialog(true);
                }}
              >
                <Icon color={rowData.status === 1 ? 'error' : 'disabled'}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: 'Mã nhân viên', field: 'employeeId' },
    { title: 'Họ tên', field: 'fullName' },
    {
      title: 'Ngày sinh',
      field: 'dateOfBirth',
      render: (rowdata) => moment(rowdata).format('DD/MM/YYYY'),
    },
    { title: 'Email', field: 'email' },
    { title: 'Số điện thoại', field: 'phone' },
    {
      title: 'Trạng thái',
      field: 'status',
      render: (rowData) => {
        if (rowData.status === 1) {
          return 'Lưu mới';
        } else if (rowData.status === 3) {
          return 'Chờ duyệt';
        } else if (rowData.status === 4) {
          return 'Yêu cầu bổ sung';
        } else if (rowData.status === 6) {
          return 'Đã từ chối';
        }
      },
    },
  ];

  return (
    <AddEmployeeRoot>
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
        <Breadcrumb routeSegments={[{ name: 'Quản lý', path: '/' }, { name: 'Thêm mới nhân viên' }]} />
      </Box>
      <Box left="30px" top="100px" position="absolute" zIndex="999">
        <Button
          variant="contained"
          style={{ backgroundColor: 'var(--primary)', fontSize: '0.8rem' }}
          sx={{ mb: 2 }}
          onClick={() => {
            setHidden(false);
            // dispatch(GetDataEmployee({}));
            setShouldOpenDialog(true);
            setShow('block');
          }}
        >
          Thêm mới nhân viên
        </Button>
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
            toolbar: true,
          }}
        />
      </Box>
      <Pagination ref={pagiRef} type="1,3,4,6" />
      {/* UI add employee */}
      {shouldOpenDialog && <AddEmployeeDialog handleClose={handleClose} hiddencr={hidden} show={show} />}
      {/* UI delete employee */}
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setEmployeeDelete({});
          }}
          onYesClick={() => {
            handleChangeEmployee(employeeDelete, 0);
          }}
        />
      )}
      {/* chi tiết nhân viên */}
      {shouldOpenViewDialog && (
        <ApprovalDialog
          hidden="none"
          handleClose={() => {
            setShouldOpenViewDialog(false);
          }}
        />
      )}
      {/* thông tin bổ sung */}
      {shouldOpenRequestDialog && (
        <AdditionalDialog
          hidden={hidden}
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
        />
      )}
    </AddEmployeeRoot>
  );
};

export default AddEmployee;
