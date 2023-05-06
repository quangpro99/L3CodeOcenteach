import {
  Dialog,
  DialogTitle,
  IconButton,
  Icon,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { sendLead } from '~/app/redux/actions/employeeActions';

const RefuseDialog = (props) => {
  const { handleClose, handleCloseAll, dataEmployee } = props;
  const dispatch = useDispatch();
  const idRegister = useSelector((state) => state?.employee?.IDRegister);

  const formik = useFormik({
    initialValues: {
      rejectedReason: '',
      date: moment().format('YYYY-MM-DD'),
    },
    validationSchema: Yup.object({
      date: Yup.date().required('Vui lòng nhập ngày'),
      rejectedReason: Yup.string()
        .min(5, 'Hãy nhập đầy đủ nội dung ')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
    }),
    onSubmit: (values) => {
      if (dataEmployee.employeeInfo.status) {
        values.status = 6;
        dispatch(sendLead({ id: idRegister, data: values }));
        handleCloseAll();
      } else {
        values.status = 11;
        dispatch(sendLead({ id: idRegister, data: values }));
        handleCloseAll();
      }
    },
  });

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Từ chối phê duyệt
        <IconButton onClick={() => handleClose()}>
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label="Thời gian"
                variant="outlined"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.errors.date && formik.touched.date}
                helperText={formik.errors.date}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                minRows={5}
                multiline
                name="rejectedReason"
                label="Lý do từ chối"
                onChange={formik.handleChange}
                value={formik.values.rejectedReason}
                error={formik.errors.rejectedReason && formik.touched.rejectedReason}
                helperText={formik.errors.rejectedReason}
              ></TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: '#FF9E43' }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" sx={{ mb: 2 }} type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RefuseDialog;
