import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { otherFeature } from '~/app/otherFeature';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const EmployeeRelationDialog = (props) => {
  const { open, handleClose, employee, relationData, handleAddRelation } = props;

  const formik = useFormik({
    initialValues: {
      name: relationData?.name || '',
      dateOfBirth: moment(relationData?.dateOfBirth).format('YYYY-MM-DD') || '',
      gender: relationData?.gender || '',
      citizenId: relationData?.citizenId || '',
      relation: relationData?.relation || '',
      address: relationData?.address || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'Hãy nhập đầy đủ họ và tên')
        .max(30, 'Nhập họ tên đúng định dạng')
        .required('Không được bỏ trống'),
      dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), 'Yêu cầu trên 18 tuổi')
        .min(new Date(Date.now() - 1892160000000), 'Yêu cầu dưới 60 tuổi')
        .required('Vui lòng nhập ngày'),
      gender: Yup.string().required('Không được bỏ trống'),
      citizenId: Yup.string().max(16, 'Không được nhập quá 16 ký tư').required('Không được bỏ trống'),
      relation: Yup.string().required('Không được bỏ trống'),
      address: Yup.string().required('Không được bỏ trống'),
    }),

    onSubmit: (values) => {
      if (Object.keys(relationData).length === 0) {
        values.id = uuidv4();
        handleAddRelation(values, 'familyRelations');
      } else {
        values.id = relationData.id;
        employee.familyRelations = employee.familyRelations.filter((familyRelation) => familyRelation.id !== values.id);
        employee.familyRelations.push(values);
      }
      handleClose();
    },
  });

  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Thêm quan hệ
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{ paddingTop: '10px' }}>
            <Grid container spacing={2}>
              <Grid item sm={5} sx={5}>
                <TextField
                  label="Họ và Tên"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="name"
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name && formik.touched.name}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item sm={4} sx={4}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Ngày sinh"
                  variant="outlined"
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
                  helperText={formik.errors.dateOfBirth}
                />
              </Grid>
              <Grid item sm={3} sx={3}>
                <TextField
                  select
                  label="Giới tính"
                  type="text"
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="gender"
                  value={formik.values.gender || ''}
                  onChange={formik.handleChange}
                  error={formik.errors.gender && formik.touched.gender}
                  helperText={formik.errors.gender}
                >
                  {otherFeature.Gender.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.gender}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={3} sx={3}>
                <TextField
                  label="Số CCCD"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="citizenId"
                  size="small"
                  value={formik.values.citizenId}
                  onChange={formik.handleChange}
                  error={formik.errors.citizenId && formik.touched.citizenId}
                  helperText={formik.errors.citizenId}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <TextField
                  select
                  label="Quan hệ"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="relation"
                  size="small"
                  value={formik.values?.relation?.relationship}
                  onChange={(event) => {
                    formik.setFieldValue('relation', event.target.value);
                  }}
                  error={formik.errors.relation && formik.touched.relation}
                  helperText={formik.errors.relation}
                >
                  {otherFeature.relations.map((item) => (
                    <MenuItem value={item.relationship}>{item.relationship}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={5} sx={5}>
                <TextField
                  label="Địa chỉ"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="address"
                  size="small"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.errors.address && formik.touched.address}
                  helperText={formik.errors.address}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" sx={{ mb: 2, background: '#FF9E43' }} onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="contained" sx={{ mb: 2, background: '#7467EF' }} type="submit">
              Xác nhận
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EmployeeRelationDialog;
