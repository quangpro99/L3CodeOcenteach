import { Box, Grid, Icon, IconButton, TextField, Typography, Tooltip, Button } from '@mui/material';
import React, { useState } from 'react';
import CustomAvatar from '../Avatar/Avatar';
import ConfirmDialog from '~/components/ConfirmDialog/ConfirmDialog';
import styled from '@emotion/styled';
import MaterialTable from '@material-table/core';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

//forwardRef nhận giá trị ref được truyền từ cha và có thể sửa đổi trực tiếp ở con
const Resume = React.forwardRef((props, ref) => {
  const { employee, status, handleChangeEmployee, handleAddResumeCompany, dataCV, display, disa } = props;
  //open dialog delete relation
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] = useState(false);
  //data
  const [companyData, setCompanyData] = useState({});

  const MyButton = styled(IconButton)({
    display: props.display,
  });

  const handleChangeCompany = (rowData, method) => {
    if (method === 1) {
      rowData.startDate = moment(rowData.startDate).format('YYYY-MM-DD');
      rowData.endDate = moment(rowData.endDate).format('YYYY-MM-DD');
      formik.setValues(rowData);
      setCompanyData(rowData);
    }
    if (method === 0) {
      //delete data
      setCompanyData(rowData);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };

  const handleDeleteCompany = () => {
    dataCV.workExperiences = dataCV.workExperiences.filter((workExperience) => workExperience.id !== companyData.id);
    setshouldOpenConfirmationDeleteDialog(false);
    setCompanyData({});
  };

  const formik = useFormik({
    initialValues: {
      company: companyData.company || '',
      position: companyData.position || '',
      detail: companyData.detail || '',
      startDate: companyData.startDate || '',
      endDate: companyData.endDate || '',
    },
    validationSchema: Yup.object({
      company: Yup.string().required('Không được bỏ trống'),
      position: Yup.string().required('Không được bỏ trống'),
      detail: Yup.string().required('Không được bỏ trống'),
      startDate: Yup.string().required('Không được bỏ trống'),
      endDate: Yup.string().required('Không được bỏ trống'),
    }),

    onSubmit: (values) => {
      if (Object.keys(companyData).length === 0) {
        values.id = uuidv4();
        handleAddResumeCompany(values, 'workExperiences');
        formik.resetForm();
      } else {
        values.id = companyData.id;
        dataCV.workExperiences = dataCV.workExperiences.filter((workExperience) => workExperience.id !== values.id);
        dataCV.workExperiences.push(values);
        formik.resetForm();
      }
      setCompanyData({});
    },
  });

  const columns = [
    {
      title: 'Hành động',
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton onClick={() => handleChangeCompany(rowData, 1)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleChangeCompany(rowData, 0)}>
                <Icon color={'error'}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: 'Công ty', field: 'company' },
    { title: 'Vị trí', field: 'position' },
    { title: 'Mô tả', field: 'detail' },
    { title: 'Ngày bắt đầu', field: 'startDate', render: (rowData) => moment(rowData).format('DD-MM-YYYY') },
    { title: 'Ngày kết thúc', field: 'endDate', render: (rowData) => moment(rowData).format('DD-MM-YYYY') },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div ref={ref} className="resume">
        <Grid container className="resume-container" xs={12} spacing={2}>
          <Grid container direction={'column'} xs={4} rowSpacing={2} className="resume-left">
            <Grid item>
              <CustomAvatar
                image={employee.employeeInfo.photoUrl || 'assets/images/logos/logo1.png'}
                displayButton={'none'}
              />
            </Grid>

            <Grid item>
              <Typography variant="h5" textAlign={'center'} textTransform={'uppercase'}>
                {employee.employeeInfo.fullName}
              </Typography>
              <Typography variant="subtitle1" textAlign={'center'}>
                {employee.employeeInfo.teamId === 2 ? 'FrontEnd' : employee.teamId === 1 ? 'BackEnd' : 'Design'}
              </Typography>
            </Grid>

            <Grid item container direction={'column'} rowSpacing={2}>
              <Grid item>
                <Box className="title-info">
                  <Typography textTransform={'uppercase'} variant="subtitle1">
                    Thông tin cơ bản
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box className="item-box">
                  <Icon>cakeIcon</Icon>
                  <Typography variant="body2">
                    {moment(employee.employeeInfo.dateOfBirth).format('DD-MM-YYYY')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box className="item-box">
                  <Icon>transgender</Icon>
                  <Typography variant="body2">
                    {employee.employeeInfo.gender === 1 ? 'Nam' : employee.employeeInfo.gender === 0 ? 'Nữ' : 'Khác'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box className="item-box">
                  <Icon>location_on</Icon>
                  <Typography variant="body2">{employee.employeeInfo.address}</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box className="item-box">
                  <Icon>phone</Icon>
                  <Typography variant="body2">{employee.employeeInfo.phone}</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box className="item-box">
                  <Icon>email</Icon>
                  <Typography variant="body2">{employee.employeeInfo.email}</Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid item container sx={{ padding: '22px' }} direction={'column'} rowSpacing={2} display={display}>
              <Grid item display={'flex'} justifyContent="space-between">
                <Box display={'flex'} gap={1} alignItems="center">
                  <Typography textTransform={'uppercase'} variant="subtitle1">
                    Các kỹ năng
                  </Typography>
                </Box>
                <MyButton>
                  <Icon sx={{ fontSize: '28px' }} className={'add-button'}>
                    control_point
                  </Icon>
                </MyButton>
              </Grid>
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: status }}
                    multiline
                    variant="standard"
                    name="skill"
                    value={dataCV.skill}
                    onChange={(event) => {
                      handleChangeEmployee(event, 'skill');
                    }}
                  />

                  <MyButton>
                    <Icon className={'remove-button'}>remove_circle_outline</Icon>
                  </MyButton>
                </div>
              </Grid>

              <Grid item display={'flex'} justifyContent="space-between">
                <Box display={'flex'} gap={1} alignItems="center">
                  <Typography textTransform={'uppercase'} variant="subtitle1">
                    Sở thích
                  </Typography>
                </Box>
                <MyButton>
                  <Icon sx={{ fontSize: '28px' }} className={'add-button'}>
                    control_point
                  </Icon>
                </MyButton>
              </Grid>
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: status }}
                    multiline
                    variant="standard"
                    name="hobby"
                    value={dataCV.hobby}
                    onChange={(event) => {
                      handleChangeEmployee(event, 'hobby');
                    }}
                  />

                  <MyButton>
                    <Icon className={'remove-button'}>remove_circle_outline</Icon>
                  </MyButton>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={7.5} spacing={1} marginLeft={1}>
            <Grid item container xs={12} sx={{ fontSize: '28px' }} direction={'column'}>
              {/* careerGoals */}
              <Grid item display={'flex'} justifyContent="space-between">
                <Box display={'flex'} gap={1} alignItems="center">
                  <Box className="border-cycle">
                    <TrackChangesIcon />
                  </Box>
                  <Typography textTransform={'uppercase'} variant="body1" fontWeight={600}>
                    Mục tiêu nghề nghiệp
                  </Typography>
                </Box>
                <MyButton>
                  <Icon sx={{ fontSize: '28px' }} className={'add-button'}>
                    control_point
                  </Icon>
                </MyButton>
              </Grid>
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: status }}
                    multiline
                    variant="standard"
                    name="careerGoal"
                    value={dataCV.careerGoal}
                    onChange={(event) => {
                      handleChangeEmployee(event, 'careerGoal');
                    }}
                  />

                  <MyButton>
                    <Icon className={'remove-button'}>remove_circle_outline</Icon>
                  </MyButton>
                </div>
              </Grid>
            </Grid>

            <Grid item container xs={12} sx={{ fontSize: '28px' }} direction={'column'} spacing={1}>
              <Grid id item display={'flex'} justifyContent="space-between" direction={'column'}>
                <Box display={'flex'} gap={1} alignItems="center">
                  <Box className="border-cycle">
                    <TrackChangesIcon />
                  </Box>
                  <Typography textTransform={'uppercase'} variant="body1" fontWeight={600}>
                    Học vấn
                  </Typography>
                </Box>

                <Grid item container xs={12} justifyContent={'space-between'} marginTop={2}>
                  <Typography textTransform={'uppercase'} variant="subtitle1" fontSize={17}>
                    Học viện công nghệ bưu chính viễn thông
                  </Typography>
                  <Typography textTransform={'uppercase'} variant="subtitle1" fontSize={14} fontWeight={600}>
                    20/9/2017 - 30/11/2022
                  </Typography>
                </Grid>

                <Grid item container xs={12} justifyContent={'space-between'}>
                  <Typography variant="subtitle1" fontSize={16}>
                    Chuyên ngành công nghệ thông tin
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container xs={12} sx={{ fontSize: '28px' }} direction={'column'}>
              <Grid id item display={'flex'} justifyContent="space-between" direction={'column'}>
                <Box display={'flex'} gap={1} alignItems="center">
                  <Box className="border-cycle">
                    <TrackChangesIcon />
                  </Box>
                  <Typography graphy textTransform={'uppercase'} variant="body1" fontWeight={600}>
                    Kinh nghiệm làm việc
                  </Typography>
                </Box>

                <Grid
                  item
                  container
                  xs={12}
                  justifyContent={'space-between'}
                  columnSpacing={{ xs: 1, sm: 2 }}
                  marginTop={2}
                  display={display}
                >
                  <Grid item xs={6} display={'flex'}>
                    <Grid xs={3}>
                      <Typography variant="subtitle1">Công ty</Typography>
                    </Grid>
                    <Grid xs={9} marginTop={'-5px'}>
                      <TextField
                        type="text"
                        fullWidth
                        sx={{
                          '& fieldset': { border: 'none' },
                          borderBottom: ' 2px dotted ',
                          height: '30px',
                        }}
                        name="company"
                        size="small"
                        disabled={status}
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        error={formik.errors.company && formik.touched.company}
                        helperText={formik.errors.company}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={6} display={'flex'}>
                    <Grid xs={3}>
                      <Typography variant="subtitle1">Vị trí</Typography>
                    </Grid>
                    <Grid xs={9} marginTop={'-5px'}>
                      <TextField
                        type="text"
                        fullWidth
                        sx={{
                          '& fieldset': { border: 'none' },
                          borderBottom: ' 2px dotted ',
                          height: '30px',
                        }}
                        name="position"
                        size="small"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        error={formik.errors.position && formik.touched.position}
                        helperText={formik.errors.position}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} display={'flex'} marginTop={2}>
                    <Grid xs={1}>
                      <Typography variant="subtitle1">Mô tả</Typography>
                    </Grid>
                    <Grid xs={11} marginTop={'-5px'}>
                      <TextField
                        type="text"
                        fullWidth
                        sx={{
                          '& fieldset': { border: 'none' },
                          borderBottom: ' 2px dotted ',
                          height: '30px',
                        }}
                        name="detail"
                        size="small"
                        value={formik.values.detail}
                        onChange={formik.handleChange}
                        error={formik.errors.detail && formik.touched.detail}
                        helperText={formik.errors.detail}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justifyContent={'space-between'}
                  spacing={2}
                  marginTop={2}
                  display={display}
                >
                  <Grid item xs={6} display={'flex'}>
                    <Grid xs={4.5}>
                      <Typography variant="subtitle1">Ngày bắt đầu</Typography>
                    </Grid>
                    <Grid xs={7.5} marginTop={'-5px'}>
                      <TextField
                        type="date"
                        fullWidth
                        sx={{
                          '& fieldset': { border: 'none' },
                          borderBottom: ' 2px dotted ',
                          height: '30px',
                        }}
                        name="startDate"
                        size="small"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        error={formik.errors.startDate && formik.touched.startDate}
                        helperText={formik.errors.startDate}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={6} display={'flex'} marginBottom={5}>
                    <Grid xs={4.5}>
                      <Typography variant="subtitle1">Ngày kết thúc</Typography>
                    </Grid>
                    <Grid xs={7.5} marginTop={'-5px'}>
                      <TextField
                        type="date"
                        fullWidth
                        sx={{
                          '& fieldset': { border: 'none' },
                          borderBottom: ' 2px dotted ',
                          height: '30px',
                        }}
                        name="endDate"
                        size="small"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        error={formik.errors.endDate && formik.touched.endDate}
                        helperText={formik.errors.endDate}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button variant="contained" sx={{ mb: 2, background: '#7467EF', display: display }} type="submit">
              Lưu
            </Button>

            {shouldOpenConfirmationDeleteDialog && (
              <ConfirmDialog
                onConfirmDialogClose={() => {
                  setshouldOpenConfirmationDeleteDialog(false);
                  setCompanyData({});
                }}
                onYesClick={() => {
                  handleDeleteCompany();
                }}
                title="Xóa công ty này !!!"
              />
            )}
            <Box display={display}>
              <MaterialTable
                title={''}
                data={dataCV?.workExperiences}
                columns={columns}
                options={{
                  rowStyle: (rowData, index) => {
                    return {
                      backgroundColor: index % 2 === 1 ? '#EEE' : '#FFF',
                    };
                  },
                  maxBodyHeight: '1000px',
                  minBodyHeight: '180px',
                  headerStyle: {
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                  },
                  padding: 'default',
                  toolbar: false,
                }}
              />
            </Box>
            {dataCV.workExperiences.map((workExperience) => {
              return (
                <Grid item container xs={12} justifyContent={'space-between'} display={disa}>
                  <Typography variant="subtitle1" fontSize={17}>
                    <b>Tên công ty:</b> {workExperience.company}
                  </Typography>
                  <Typography textTransform={'uppercase'} variant="subtitle1" fontSize={14} fontWeight={600}>
                    {moment(workExperience.startDate).format('DD-MM-YYYY')} -{' '}
                    {moment(workExperience.endDate).format('DD-MM-YYYY')}
                  </Typography>
                  <Grid xs={12}>
                    <Typography variant="subtitle1" fontSize={16}>
                      <b>Chi tiết về công ty:</b> {workExperience.detail}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant="body1" fontSize={16}>
                      <b>Vị trí: </b>
                      {workExperience.position}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}

            <Grid item container xs={12} sx={{ fontSize: '28px' }} direction={'column'} display={disa}>
              <Grid id item display={'flex'} justifyContent="space-between" direction={'column'}>
                <Box display={'flex'} gap={1} alignItems="center">
                  <Box className="border-cycle">
                    <TrackChangesIcon />
                  </Box>
                  <Typography textTransform={'uppercase'} variant="body1" fontWeight={600}>
                    Các kỹ năng
                  </Typography>
                </Box>
                <MyButton>
                  <Icon sx={{ fontSize: '28px' }} className={'add-button'}>
                    control_point
                  </Icon>
                </MyButton>
              </Grid>
              <Grid item marginBottom={4}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: status }}
                    multiline
                    variant="standard"
                    name="skill"
                    value={dataCV.skill}
                    onChange={(event) => {
                      handleChangeEmployee(event, 'skill');
                    }}
                  />

                  <MyButton>
                    <Icon className={'remove-button'}>remove_circle_outline</Icon>
                  </MyButton>
                </div>
              </Grid>

              <Grid id item display={'flex'} justifyContent="space-between" direction={'column'}>
                <Box display={'flex'} gap={1} alignItems="center">
                  <Box className="border-cycle">
                    <TrackChangesIcon />
                  </Box>
                  <Typography textTransform={'uppercase'} variant="body1" fontWeight={600}>
                    Sở thích
                  </Typography>
                </Box>
                <MyButton>
                  <Icon sx={{ fontSize: '28px' }} className={'add-button'}>
                    control_point
                  </Icon>
                </MyButton>
              </Grid>
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: status }}
                    multiline
                    variant="standard"
                    name="hobby"
                    value={dataCV.hobby}
                    onChange={(event) => {
                      handleChangeEmployee(event, 'hobby');
                    }}
                  />

                  <MyButton>
                    <Icon className={'remove-button'}>remove_circle_outline</Icon>
                  </MyButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
});

export default Resume;
