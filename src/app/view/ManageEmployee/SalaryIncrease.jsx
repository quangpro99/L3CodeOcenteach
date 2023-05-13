import React from 'react';
import { TextField, Grid, Button, Icon, Tooltip, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MaterialTable from '@material-table/core';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

const SalaryIncrease = (props) => {
  const { handleClose } = props;
  const [listSalary, setListSalary] = useState([]);

  const formik = useFormik({
    initialValues: {
      time: '',
      reason: '',
      rank: '',
      note: '',
      date: '',
    },
    validationSchema: Yup.object({
      reason: Yup.string().required('Không được bỏ trống'),
      rank: Yup.string().required('Không được bỏ trống'),
      note: Yup.string().required('Không được bỏ trống'),
      time: Yup.string().required('Không được bỏ trống'),
      date: Yup.date().required('Vui lòng nhập ngày'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!values.id) {
        values.id = uuidv4();
        setListSalary([...listSalary, values]);
        toast.success('Thêm thành công');
      } else {
        const newListFilter = listSalary.filter((Salary) => Salary.id !== values.id);
        setListSalary([...newListFilter, values]);
        toast.success('Sửa thành công');
      }
      resetForm();
    },
  });

  const handleEditSalary = (rowData) => {
    formik.setValues(rowData);
  };
  const handleRemoveSalary = (rowData) => {
    const newListFilter = listSalary.filter((Salary) => Salary.id !== rowData.id);
    setListSalary([...newListFilter]);
    // toast.success('Xóa thành công');
  };
  const handleSave = () => {
    // toast.success('Lưu thành công');
  };

  const columns = [
    {
      title: 'Hành động',
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton
                color="primary"
                onClick={() => {
                  handleEditSalary(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => {
                  handleRemoveSalary(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: 'Lần', field: 'time' },
    { title: 'Bậc', field: 'rank' },

    { title: 'Lý do', field: 'reason' },
    { title: 'Ngày', field: 'date' },
    { title: 'Ghi chú', field: 'note' },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} pt={1}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={5}>
            <TextField
              size="small"
              label="Ngày tăng lương"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.errors.date && formik.touched.date}
              helperText={formik.errors.date}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              label="Lần thứ"
              name="time"
              value={formik.values.time}
              onChange={formik.handleChange}
              error={formik.errors.time && formik.touched.time}
              helperText={formik.errors.time}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              fullWidth
              label="Bậc"
              name="rank"
              value={formik.values.rank}
              onChange={formik.handleChange}
              error={formik.errors.rank && formik.touched.rank}
              helperText={formik.errors.rank}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={5}>
            <TextField
              size="small"
              fullWidth
              label="Lý do tăng lương"
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              error={formik.errors.reason && formik.touched.reason}
              helperText={formik.errors.reason}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              label="Ghi chú"
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              error={formik.errors.note && formik.touched.note}
              helperText={formik.errors.note}
            />
          </Grid>
          <Grid container item xs={3} spacing={1}>
            <Grid item>
              <Button variant="contained" sx={{ background: '#FF9E43' }} onClick={handleClose}>
                Hủy
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" type="submit">
                Thêm
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title={''}
            data={listSalary}
            columns={columns}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 15, 20],
              rowStyle: (rowData, index) => {
                return {
                  backgroundColor: index % 2 === 1 ? '#EEE' : '#FFF',
                };
              },
              maxBodyHeight: '1000px',
              minBodyHeight: '370px',
              headerStyle: {
                backgroundColor: '#262e49',
                color: '#fff',
              },
              // padding: 'dense',
              padding: 'default',
              // search: false,
              // exportButton: true,
              toolbar: false,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default SalaryIncrease;
