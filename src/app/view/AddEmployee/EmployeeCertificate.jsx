import { Icon, Tooltip, IconButton, Box, Button } from '@mui/material';
import MaterialTable from '@material-table/core';
import { useState } from 'react';
import ConfirmDialog from '~/components/ConfirmDialog/ConfirmDialog';
import EmployeeCertificateDialog from './EmployeeCertificateDialog';
import moment from 'moment';
import React from 'react';

const EmployeeCertificate = React.forwardRef((props, ref) => {
  const { employeeData, handleAddCertificate } = props;
  //open dialog delete diploma
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] = useState(false);
  //open dialog diploma
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  //data diploma
  const [certificateData, setCertificateData] = useState({});

  //delete diploma
  const handleDeleteDiploma = () => {
    employeeData.certificates = employeeData.certificates.filter(
      (certificate) => certificate.id !== certificateData.id,
    );
    setshouldOpenConfirmationDeleteDialog(false);
    setCertificateData({});
  };

  const handleClose = () => {
    setShouldOpenDialog(false);
    setCertificateData({});
  };

  const handleChangeEmployee = (rowdata, method) => {
    if (method === 1) {
      //add diplomaData
      setShouldOpenDialog(true);
      setCertificateData(rowdata);
    }
    if (method === 0) {
      //delete data
      setCertificateData(rowdata);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };

  const columns = [
    {
      title: 'Hành động',
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 1)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 0)}>
                <Icon color={'error'}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: 'Tên văn bằng', field: 'name' },
    { title: 'Nội dung ', field: 'content' },
    { title: 'Ngày cấp', field: 'issuanceDate', render: (rowdata) => moment(rowdata).format('DD/MM/YYYY') },
    { title: 'Lĩnh Vực', field: 'field' },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setCertificateData({});
          }}
          onYesClick={() => {
            handleDeleteDiploma();
          }}
          title="Xóa văn bằng"
        />
      )}

      <Box className="box" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{ mb: 2, backgroundColor: 'var(--primary)' }}
          onClick={() => setShouldOpenDialog(true)}
        >
          Thêm mới
        </Button>
      </Box>

      <MaterialTable
        title={''}
        data={employeeData?.certificates}
        columns={columns}
        options={{
          rowStyle: (rowData, index) => {
            return {
              backgroundColor: index % 2 === 1 ? '#EEE' : '#FFF',
            };
          },
          maxBodyHeight: '1000px',
          minBodyHeight: '180px',
          headerStyle: {
            backgroundColor: 'var(--primary)',
            color: '#fff',
          },
          padding: 'default',
          toolbar: false,
        }}
      />

      {shouldOpenDialog && (
        <EmployeeCertificateDialog
          open={true}
          handleClose={handleClose}
          employee={employeeData}
          certificateData={certificateData}
          handleAddCertificate={handleAddCertificate}
        />
      )}
    </>
  );
});

export default EmployeeCertificate;
