import { Box, Button, Icon, IconButton, Tooltip } from '@mui/material';
import MaterialTable from '@material-table/core';
import { useState } from 'react';
import ConfirmDialog from '~/components/ConfirmDialog/ConfirmDialog';
import EmployeeRelationDialog from './EmployeeRelationDialog';
import moment from 'moment';

const EmployeeRelation = (props) => {
  const { employeeData, handleAddRelation } = props;
  //open dialog delete relation
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] = useState(false);
  //open dialog relation
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  //data relation
  const [relationData, setRelationData] = useState({});

  const handleDeleteRelation = () => {
    employeeData.familyRelations = employeeData.familyRelations.filter(
      (familyRelation) => familyRelation.id !== relationData.id,
    );
    setshouldOpenConfirmationDeleteDialog(false);
    setRelationData({});
  };

  const handleClose = () => {
    setShouldOpenDialog(false);
    setRelationData({});
  };

  const handleChangeEmployee = (rowdata, method) => {
    if (method === 1) {
      //edit diplomaData
      setShouldOpenDialog(true);
      setRelationData(rowdata);
    }
    if (method === 0) {
      //delete data
      setRelationData(rowdata);
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
    { title: 'Họ tên', field: 'name' },
    { title: 'Ngày sinh', field: 'dateOfBirth', render: (rowdata) => moment(rowdata).format('DD/MM/YYYY') },
    {
      title: 'Giới tính',
      field: 'gender',
      render: (rowData) => {
        if (rowData.gender === 1) {
          return 'Nam';
        } else if (rowData.gender === 2) {
          return 'Nữ';
        } else {
          return 'Khác';
        }
      },
    },
    { title: 'Số CCCD', field: 'citizenId' },
    { title: 'Mối quan hệ', field: 'relation' },
    { title: 'Địa chỉ', field: 'address' },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setRelationData({});
          }}
          onYesClick={() => {
            handleDeleteRelation();
          }}
          title="Xóa quan hệ này !!!"
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
        data={employeeData?.familyRelations}
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
        <EmployeeRelationDialog
          open={true}
          handleClose={handleClose}
          employee={employeeData}
          relationData={relationData}
          handleAddRelation={handleAddRelation}
        />
      )}
    </>
  );
};

export default EmployeeRelation;
