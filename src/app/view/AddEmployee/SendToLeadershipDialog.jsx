import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { sendLead } from '~/app/redux/actions/employeeActions';
import { otherFeature } from '~/app/otherFeature';

const SendToLeadershipDialog = (props) => {
  const { handleClose, handleCloseAll } = props;
  const dispatch = useDispatch();
  const idRegister = useSelector((state) => state?.employee?.IDRegister);

  const formik = useFormik({
    initialValues: {
      registerName: '',
      registerDate: '',
      registerPosition: '',
      registerContent: '',
    },
    validationSchema: Yup.object({
      registerName: Yup.string()
        .min(5, 'Hãy nhập đầy tên nhân viên')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
      registerContent: Yup.string()
        .min(5, 'Hãy nhập đầy đủ nội dung ')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
      registerDate: Yup.date().required('Vui lòng nhập ngày'),
      registerPosition: Yup.string().required('Nhập vị trí'),
    }),
    onSubmit: (values) => {
      values.status = 3;
      dispatch(sendLead({ id: idRegister, data: values }));

      handleCloseAll();
    },
  });

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Gửi lãnh đạo
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 10 }}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  name="registerName"
                  label="Tên lãnh đạo"
                  onChange={formik.handleChange}
                  value={formik.values.registerName}
                  error={formik.errors.registerName && formik.touched.registerName}
                  helperText={formik.errors.registerName}
                >
                  {otherFeature.leader.map((item) => (
                    <MenuItem key={item.id} value={item.leaderName}>
                      {item.leaderName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="registerDate"
                  label="Ngày gửi"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.registerDate}
                  error={formik.errors.registerDate && formik.touched.registerDate}
                  helperText={formik.errors.registerDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Chức Vụ"
                  name="registerPosition"
                  onChange={formik.handleChange}
                  value={formik.values.registerPosition}
                  error={formik.errors.registerPosition && formik.touched.registerPosition}
                  helperText={formik.errors.registerPosition}
                />
              </Grid>
            </Grid>
            <Grid item container>
              <TextField
                fullWidth
                label="Nội dung"
                name="registerContent"
                multiline
                minRows={3}
                onChange={formik.handleChange}
                value={formik.values.registerContent}
                error={formik.errors.registerContent && formik.touched.registerContent}
                helperText={formik.errors.registerContent}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: '#FF9E43' }}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: '#7467EF' }} type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SendToLeadershipDialog;
