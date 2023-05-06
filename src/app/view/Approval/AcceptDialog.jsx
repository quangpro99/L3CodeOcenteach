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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { sendLead } from '~/app/redux/actions/employeeActions';

const AcceptDialog = (props) => {
  const { handleClose, handleCloseAll, dataEmployee } = props;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const idRegister = useSelector((state) => state?.employee?.IDRegister);

  const formik = useFormik({
    initialValues: {
      date: moment().format('YYYY-MM-DD'),
    },
    validationSchema: Yup.object({
      date: Yup.date().required('Vui lòng nhập ngày'),
    }),
    onSubmit: (values) => {
      if (dataEmployee.employeeInfo.status === 8) {
        values.status = 10;
        dispatch(sendLead({ id: idRegister, data: values }));
        handleCloseAll();
      } else {
        values.status = 5;
        dispatch(sendLead({ id: idRegister, data: values }));
        handleCloseAll();
      }
    },
  });

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Xác nhận phê duyệt
        <IconButton onClick={() => handleClose()}>
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label="Ngày hẹn"
                variant="outlined"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.errors.date && formik.touched.date}
                helperText={formik.errors.date}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={checked}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                  />
                }
                label="Đã đủ điều kiện phê duyệt"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: '#FF9E43' }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" sx={{ mb: 2 }} type="submit" disabled={!checked}>
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AcceptDialog;
