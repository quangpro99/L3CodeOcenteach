import {
  Dialog,
  DialogTitle,
  IconButton,
  Icon,
  DialogContent,
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  Box,
  DialogActions,
  Button,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomAvatar from '~/components/Avatar/Avatar';
import ReleaseDialog from './ReleaseDialog';
import UpdateOptions from './UpdateOptions';

const ManagerEmployeeDialog = (props) => {
  const { handleClose } = props;
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const loading = useSelector((state) => state).employee.loading;
  const employeeData = useSelector((state) => state?.employee?.detailEmployee).employeeInfo;

  return (
    <>
      <Dialog open={true} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Cập nhật diễn biến
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        {loading ? (
          <DialogContent>...Đang tải dữ liệu</DialogContent>
        ) : (
          <DialogContent>
            <Grid container xs={12} spacing={4}>
              <Grid item container xs={4} spacing={2}>
                <Grid item xs={12}>
                  <CustomAvatar image={employeeData.photoUrl || 'assets/images/logos/logo1.png'} displayButton="none" />
                  <Typography variant="h5" textAlign={'center'} textTransform={'uppercase'}>
                    {employeeData.fullName}
                  </Typography>
                  <Typography variant="subtitle1" textAlign={'center'}>
                    {employeeData.teamId === 2 ? 'FrontEnd' : employeeData.teamId === 1 ? 'BackEnd' : 'Design'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={8} spacing={2}>
                <Card>
                  <CardHeader title="Thông tin cơ bản " />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          label="Họ và tên"
                          variant="outlined"
                          value={employeeData.fullName}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          label="Mã nhân viên"
                          variant="outlined"
                          value={employeeData.code}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          label="Email"
                          variant="outlined"
                          value={employeeData.email}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          label="Số điện thoại"
                          variant="outlined"
                          value={employeeData.phone}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          type={'date'}
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          label="Ngày sinh"
                          variant="outlined"
                          value={moment(employeeData.dateOfBirth).format('YYYY-MM-DD')}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          label="Vị trí"
                          value={employeeData.address || 'Không có dữ liệu'}
                          variant="outlined"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  />
                </Card>
              </Grid>
              <Grid item container xs={12}>
                <UpdateOptions />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: '#FF9E43' }} onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: '#d32f2f' }} onClick={() => setShouldOpenDialog(true)}>
            Kết thúc
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenDialog && (
        <ReleaseDialog handleClose={() => setShouldOpenDialog(false)} handleCloseAll={handleClose} />
      )}
    </>
  );
};

export default ManagerEmployeeDialog;
