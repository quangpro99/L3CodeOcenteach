import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
  IconButton,
  Icon,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { sendLead } from '~/app/redux/actions/employeeActions';

const AdditionalRequestDialog = (props) => {
  const { handleClose, handleCloseAll, dataEmployee } = props;
  const dispatch = useDispatch();
  const idRegister = useSelector((state) => state?.employee?.IDRegister);
  console.log(dataEmployee.employeeInfo.status);

  const formik = useFormik({
    initialValues: {
      statusLog: '',
    },
    validationSchema: Yup.object({
      statusLog: Yup.string()
        .min(5, 'Hãy nhập đầy đủ nội dung ')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
    }),
    onSubmit: (values) => {
      if (dataEmployee.employeeInfo.status === 3) {
        values.status = 4;
        dispatch(sendLead({ id: idRegister, data: values }));
        handleCloseAll();
      } else {
        values.status = 9;
        dispatch(sendLead({ id: idRegister, data: values }));
        handleCloseAll();
      }
    },
  });

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Yêu cầu bổ sung
        <Box onClick={handleClose}>
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 10 }}>
          <TextField
            fullWidth
            minRows={5}
            multiline
            name="statusLog"
            label="Yêu cầu bổ sung"
            onChange={formik.handleChange}
            value={formik.values.statusLog}
            error={formik.errors.statusLog && formik.touched.statusLog}
            helperText={formik.errors.statusLog}
          />
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

export default AdditionalRequestDialog;
