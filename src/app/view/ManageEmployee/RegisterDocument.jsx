import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Grid, Button, Icon, Tooltip, IconButton } from '@mui/material';
import MaterialTable from '@material-table/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const RegisterDocument = (props) => {
  const { handleClose } = props;

  const formik = useFormik({
    initialValues: {
      content: '',
      document: '',
      note: '',
      date: '',
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .min(5, 'Hãy nhập đầy đủ nội dung ')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
      document: Yup.string()
        .min(5, 'Hãy nhập đầy đủ nội dung ')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
      note: Yup.string()
        .min(5, 'Hãy nhập đầy đủ nội dung ')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
      date: Yup.date().required('Vui lòng nhập ngày'),
    }),
    onSubmit: (values, { resetForm }) => {
      //   if (!values.id) {
      //     values.id = uuidv4();
      //     setListDocument([...listDocument, values]);
      //     toast.success('Thêm thành công');
      //   } else {
      //     const newListFilter = listDocument.filter((document) => document.id != values.id);
      //     setListDocument([...newListFilter, values]);
      //     toast.success('Sửa thành công');
      //   }
      //   resetForm();
    },
  });

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
                  //   handleEditDocument(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => {
                  //   handleRemoveDocument(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: 'Hồ sơ', field: 'document' },

    { title: 'Nội dung', field: 'content' },
    { title: 'Ngày đăng kí', field: 'date' },
    { title: 'Ghi chú', field: 'note' },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} pt={1}>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={5}>
            <TextField
              size="small"
              label="Hồ sơ"
              fullWidth
              name="document"
              value={formik.values.document}
              onChange={formik.handleChange}
              error={formik.errors.document && formik.touched.document}
              helperText={formik.errors.document}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              size="small"
              label="Nội dung"
              fullWidth
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.errors.content && formik.touched.content}
              helperText={formik.errors.content}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={5}>
            <TextField
              size="small"
              label="Ngày đăng kí"
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
              label="Ghi chú"
              fullWidth
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
            <Grid
              item
              // onClick={handleSave}
            >
              <Button variant="contained" color="primary">
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title={''}
            data={[]}
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
              padding: 'default',
              toolbar: false,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterDocument;
