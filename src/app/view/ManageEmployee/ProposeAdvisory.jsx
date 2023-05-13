import React from "react";
import { v4 as uuidv4 } from "uuid";
import { TextField, Grid, Button, Icon, Tooltip, IconButton } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
function ProposeAdvisory(props) {
  const { handleClose } = props;
  const formik = useFormik({
    initialValues: {
      type: "",
      content: "",
      note: "",
      date: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
      type: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!values.id) {
        values.id = uuidv4();
        setListPropose([...listPropose, values]);
        toast.success("Thêm thành công");
      } else {
        const newListFilter = listPropose.filter((Propose) => Propose.id !== values.id);
        setListPropose([...newListFilter, values]);
        toast.success("Sửa thành công");
      }
      resetForm();
    },
  });
  const [listPropose, setListPropose] = useState([]);

  const handleEditPropose = (rowData) => {
    formik.setValues(rowData);
  };
  const handleRemovePropose = (rowData) => {
    const newListFilter = listPropose.filter((Propose) => Propose.id !== rowData.id);
    setListPropose([...newListFilter]);
    toast.success("Xóa thành công");
  };
  const handleSave = () => {
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
                  handleEditPropose(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => {
                  handleRemovePropose(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },

    { title: "Loại", field: "type" },
    { title: "Nội dung", field: "content" },
    { title: "Ngày", field: "date" },

    { title: "Ghi chú", field: "note" },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} pt={1}>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              size="small"
              label="Loại"
              fullWidth
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.errors.type && formik.touched.type}
              helperText={formik.errors.type}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              label="Nội dung"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.errors.content && formik.touched.content}
              helperText={formik.errors.content}
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
              <Button variant="contained" color="primary" onClick={handleSave}>
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title={""}
            data={listPropose}
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

export default ProposeAdvisory;
