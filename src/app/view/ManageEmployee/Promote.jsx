import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TextField, Grid, Button, Icon, Tooltip, IconButton } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addPromote, deletePromote, getListPromote } from "~/app/redux/actions/employeeActions";
function Promote(props) {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const idRegister = useSelector((state) => state?.employee?.IDRegister);
  const dataPromote = useSelector((state) => state?.employee?.listPromote);
  useEffect(() => {
    dispatch(getListPromote({id:idRegister}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formik = useFormik({
    initialValues: {
      reason: "",
      note: "",
      date: "",
      newPosition: "",
      // oldPosition: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
      newPosition: Yup.string().required("Không được bỏ trống"),
      // oldPosition: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!values.id) {
        values.id = uuidv4();
        setListPromote([...listPromote, values]);
        dispatch(addPromote({id:idRegister, listPromote: values}))
      } else {
        const newListFilter = listPromote.filter((Promote) => Promote.id !== values.id);
        setListPromote([...newListFilter, values]);
        toast.success("Sửa thành công");
      }
      resetForm();
    },
  });
  const [listPromote, setListPromote] = useState([]);

  const handleEditPromote = (rowData) => {
    formik.setValues(rowData);
  };
  const handleRemovePromote = (rowData) => {
    const newListFilter = listPromote.filter((Promote) => Promote.id !== rowData.id);
    setListPromote([...newListFilter]);
    dispatch(deletePromote({id:rowData.promotionId, idListPromote:idRegister}));
  };
  const handleSavePromote = () => {
    toast.success("Lưu thành công");
  };

  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton
                color="primary"
                onClick={() => {
                  handleEditPromote(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => {
                  handleRemovePromote(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },

    { title: "Chức vụ cũ", field: "newPosition" },
    // { title: "Chực vụ hiện tại", field: "oldPosition" },
    { title: "Lý do", field: "reason" },

    { title: "Ngày", field: "date" },
    { title: "Ghi chú", field: "note" },
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} pt={1}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <TextField
              size="small"
              label="Ngày tăng chức"
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
          {/* <Grid item xs={3}>
            <TextField
              size="small"
              fullWidth
              label="Chức vụ cũ"
              name="oldPosition"
              value={formik.values.oldPosition}
              onChange={formik.handleChange}
              error={formik.errors.oldPosition && formik.touched.oldPosition}
              helperText={formik.errors.oldPosition}
            />
          </Grid> */}
          <Grid item xs={3}>
            <TextField
              size="small"
              fullWidth
              label="Chức vụ mới"
              name="newPosition"
              value={formik.values.newPosition}
              onChange={formik.handleChange}
              error={formik.errors.newPosition && formik.touched.newPosition}
              helperText={formik.errors.newPosition}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              label="Lý do"
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              error={formik.errors.reason && formik.touched.reason}
              helperText={formik.errors.reason}
            />
          </Grid>
          <Grid item xs={3}>
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
              <Button variant="contained" sx={{ background: "#FF9E43" }} onClick={handleClose}>
                Hủy
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" type="submit">
                Thêm
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSavePromote}>
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title={""}
            data={dataPromote || listPromote}
            columns={columns}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 15, 20],
              rowStyle: (rowData, index) => {
                return {
                  backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                };
              },
              maxBodyHeight: "1000px",
              minBodyHeight: "370px",
              headerStyle: {
                backgroundColor: "#262e49",
                color: "#fff",
              },
              padding: "default",
              toolbar: false,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default Promote;
