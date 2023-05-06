import React from 'react';
import { Tooltip, IconButton, Icon } from '@mui/material';
import MaterialTable from '@material-table/core';

const Certificate = React.forwardRef((props, ref) => {
  const { employee } = props;

  const handleChangeEmployee = (rowdata, method) => {
    if (method === 1) {
      // setShouldOpenDialog(true);
      // setRelationData(rowdata);
    }
    if (method === 0) {
      // setRelationData(rowdata);
      // setshouldOpenConfirmationDeleteDialog(true);
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
    { title: 'Ngày cấp', field: 'issuanceDate' },
    { title: 'Lĩnh Vực', field: 'field' },
  ];

  return (
    <MaterialTable
      title={''}
      data={employee?.certificates}
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
  );
});

export default Certificate;
