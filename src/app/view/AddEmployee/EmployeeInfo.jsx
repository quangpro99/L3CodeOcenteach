import { Grid, MenuItem, TextField } from '@mui/material';
import CustomAvatar from '~/components/Avatar/Avatar';
import { otherFeature } from '~/app/otherFeature';
import React from 'react';
import moment from 'moment';

const EmployeeInfo = (props) => {
  const { formikRoot } = props;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item container xs={12} spacing={8}>
          <Grid item container xs={9}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Tên nhân viên"
                  value={formikRoot.values.fullName}
                  onChange={(event) => {
                    formikRoot.setFieldValue('fullName', event.target.value);
                  }}
                  error={formikRoot.touched.fullName && Boolean(formikRoot.errors.fullName)}
                  helperText={formikRoot.touched.fullName && formikRoot.errors.fullName}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  select
                  fullWidth
                  id="gender"
                  name="gender"
                  label="Giới tính"
                  value={formikRoot.values.gender}
                  onChange={(event) => {
                    formikRoot.setFieldValue('gender', event.target.value);
                  }}
                  error={formikRoot.touched.gender && Boolean(formikRoot.errors.gender)}
                  helperText={formikRoot.touched.gender && formikRoot.errors.gender}
                >
                  {otherFeature.Gender.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.gender}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  label="Ngày sinh"
                  value={moment(formikRoot.values.dateOfBirth).format('YYYY-MM-DD')}
                  onChange={(event) => {
                    formikRoot.setFieldValue('dateOfBirth', event.target.value);
                  }}
                  error={formikRoot.touched.dateOfBirth && Boolean(formikRoot.errors.dateOfBirth)}
                  helperText={formikRoot.touched.dateOfBirth && formikRoot.errors.dateOfBirth}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="code"
                  name="code"
                  label="Mã nhân viên"
                  value={formikRoot.values.code}
                  onChange={(event) => {
                    formikRoot.setFieldValue('code', event.target.value);
                  }}
                  error={formikRoot.touched.code && Boolean(formikRoot.errors.code)}
                  helperText={formikRoot.touched.code && formikRoot.errors.code}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formikRoot.values.email}
                  onChange={(event) => {
                    formikRoot.setFieldValue('email', event.target.value);
                  }}
                  error={formikRoot.touched.email && Boolean(formikRoot.errors.email)}
                  helperText={formikRoot.touched.email && formikRoot.errors.email}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Số điện thoại"
                  value={formikRoot.values.phone}
                  onChange={(event) => {
                    formikRoot.setFieldValue('phone', event.target.value);
                  }}
                  error={formikRoot.touched.phone && Boolean(formikRoot.errors.phone)}
                  helperText={formikRoot.touched.phone && formikRoot.errors.phone}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="citizenId"
                  name="citizenId"
                  label="Căn cước công dân"
                  value={formikRoot.values.citizenId}
                  onChange={(event) => {
                    formikRoot.setFieldValue('citizenId', event.target.value);
                  }}
                  error={formikRoot.touched.citizenId && Boolean(formikRoot.errors.citizenId)}
                  helperText={formikRoot.touched.citizenId && formikRoot.errors.citizenId}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  select
                  id="teamId"
                  name="teamId"
                  label="Nhóm"
                  value={formikRoot.values.teamId}
                  onChange={(event) => {
                    formikRoot.setFieldValue('teamId', event.target.value);
                  }}
                  error={formikRoot.touched.teamId && Boolean(formikRoot.errors.teamId)}
                  helperText={formikRoot.touched.teamId && formikRoot.errors.teamId}
                >
                  {otherFeature.Team.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="address"
                  name="address"
                  label="Địa chỉ"
                  value={formikRoot.values.address}
                  onChange={(event) => {
                    formikRoot.setFieldValue('address', event.target.value);
                  }}
                  error={formikRoot.touched.address && Boolean(formikRoot.errors.address)}
                  helperText={formikRoot.touched.address && formikRoot.errors.address}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <CustomAvatar formikRoot={formikRoot.values} image={formikRoot.values.photoUrl} displayButton={''} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeInfo;
