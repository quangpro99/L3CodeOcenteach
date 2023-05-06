import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  Icon,
  Typography,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { sendLead } from '~/app/redux/actions/employeeActions';

const ReleaseDialog = (props) => {
  const { handleClose, handleCloseAll } = props;
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state?.employee?.detailEmployee).employeeInfo;
  console.log(employeeData);
  const idRegister = useSelector((state) => state?.employee?.IDRegister);
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today = new Date();
  console.log(idRegister);

  const formik = useFormik({
    initialValues: {
      terminateRequestDetail: employeeData?.terminateRequestDetail || '',
      terminatedDate: employeeData?.terminatedDate || moment().format('YYYY-MM-DD'),
    },
    validationSchema: Yup.object({
      terminateRequestDetail: Yup.string().required('Không được bỏ trống'),
      terminatedDate: Yup.date().required('Vui lòng nhập ngày'),
    }),
    onSubmit: (values) => {
      values.status = 8;
      dispatch(sendLead({ id: idRegister, data: values }));
      handleCloseAll();
    },
  });

  return (
    <>
      <Dialog open={true} maxWidth={'lg'} fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box width={'100%'} textAlign={'center'}>
            Biểu mẫu nghỉ việc
          </Box>
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid
              container
              spacing={2}
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                padding: 15,
              }}
            >
              <Grid container>
                <Grid container item sm={12} xs={12} justifyContent="center">
                  <Typography variant="h5" textTransform="uppercase">
                    Cộng hòa xã hội Việt Nam
                  </Typography>
                </Grid>
                <Grid container item sm={12} xs={12} justifyContent="center">
                  <Typography variant="h6">Độc lập - Tự do - Hạnh phúc</Typography>
                </Grid>
                <Grid container item sm={12} xs={12} justifyContent="center">
                  <Typography>-------------------------------------</Typography>
                </Grid>
                <Grid sx={{ pt: 8, pb: 8 }} container item sm={12} xs={12} justifyContent="center">
                  <Typography variant="h5">ĐƠN XIN NGHỈ VIỆC</Typography>
                </Grid>
                <Grid container item sm={12} xs={12} className=" container-form" sx={{ pl: 10, pr: 10, pb: 2 }}>
                  <Grid item sm={12} xs={12}>
                    <Typography>Kính gửi: Ban giám đốc công ty OceanTech</Typography>
                  </Grid>
                </Grid>
                <Grid container item sm={12} xs={12} sx={{ pl: 10, pr: 10, pb: 2 }} justifyContent="flex-start">
                  <Grid item sm={1.5} xs={1.5}>
                    <Typography>Tôi tên là:</Typography>
                  </Grid>
                  <Grid item sm={10.5} xs={10.5}>
                    <TextField
                      fullWidth
                      value={employeeData.fullName}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item sm={12} xs={12} sx={{ pl: 10, pr: 10, pb: 2 }} justifyContent="flex-start">
                  <Grid item sm={3.5} xs={3.5}>
                    <Typography>Hiện đang công tác tại vị trí:</Typography>
                  </Grid>
                  <Grid item sm={8.5} xs={8.5}>
                    <TextField
                      fullWidth
                      value={employeeData.teamId === 2 ? 'FrontEnd' : employeeData.teamId === 1 ? 'BackEnd' : 'Design'}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item sm={12} xs={12} sx={{ pl: 10, pr: 10, mt: 1 }} justifyContent="flex-start">
                  <Grid item sm={4} xs={4}>
                    <Typography>Tôi xin được phép nghỉ làm từ ngày:</Typography>
                  </Grid>
                  <Grid item sm={8} xs={8}>
                    <TextField
                      type="date"
                      fullWidth
                      variant="standard"
                      name="terminatedDate"
                      value={formik.values.terminatedDate}
                      onChange={formik.handleChange}
                      error={formik.errors.terminatedDate && formik.touched.terminatedDate}
                      helperText={formik.errors.terminatedDate}
                    />
                  </Grid>
                </Grid>
                <Grid container item sm={12} xs={12} sx={{ pl: 10, pr: 10, pb: 2, mt: 2 }} justifyContent="flex-start">
                  <Grid item container sm={12} xs={12} spacing={2}>
                    <Grid item container>
                      <Grid item xs={12}>
                        <Typography>Tôi làm đơn này đề nghị ban giám đốc cho tôi xin nghỉ việc vì lí do:</Typography>
                      </Grid>
                      <Grid xs={12} item>
                        <TextField
                          fullWidth
                          multiline
                          variant="standard"
                          name="terminateRequestDetail"
                          value={formik.values.terminateRequestDetail}
                          onChange={formik.handleChange}
                          error={formik.errors.terminateRequestDetail && formik.touched.terminateRequestDetail}
                          helperText={formik.errors.terminateRequestDetail}
                        />
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Typography lineHeight={2}>
                        Trong khi chờ đợi sự chấp thuật của Ban Giám đốc Công ty, tôi sẽ tiếp tục làm việc nghiêm túc và
                        tiến hành bàn giao công việc cũng như tài sản cho người quản lý trực tiếp của tôi.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} xs={12} sx={{ mt: 1 }}>
                    <Typography>Tôi xin chân thành cảm ơn.</Typography>
                  </Grid>
                </Grid>
                <Grid container item sm={12} xs={12} sx={{ pl: 10, pr: 10, mt: 1 }} justifyContent="flex-end"></Grid>
              </Grid>
              <Grid container item sm={12} xs={12} sx={{ pl: 10, pr: 10 }} justifyContent="flex-end">
                <Grid item sm={4} xs={4} container direction="column" textAlign="center" spacing={1}>
                  <Grid item>
                    <Typography>{`Hà Nội, ${today.toLocaleDateString('vi-VN', options)}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 'bold' }}>Người làm đơn</Typography>
                  </Grid>
                  <Grid item>
                    {' '}
                    <Typography style={{ fontWeight: 'bold' }}>{employeeData.fullName.split(' ').pop()}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 'bold' }}>{employeeData.fullName}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item sm={12} xs={12} sx={{ pl: 10, pr: 10, mt: 3 }} justifyContent="flex-end">
                <Grid item sm={3} xs={3}>
                  <Typography
                    className="font-15"
                    style={{ fontWeight: 'bold', textDecoration: 'uppercase' }}
                  ></Typography>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="button-cancel"
              variant="contained"
              sx={{ mb: 2, background: '#FF9E43' }}
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button className="button-confirm1" variant="contained" type="submit" sx={{ mb: 2 }} color="primary">
              Trình lãnh đạo
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ReleaseDialog;
