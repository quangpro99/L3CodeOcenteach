import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { otherFeature } from '~/app/otherFeature';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const EmployeeCertificateDialog = (props) => {
  const { open, handleClose, employee, certificateData, handleAddCertificate } = props;

  const formik = useFormik({
    initialValues: {
      name: certificateData?.name || '',
      content: certificateData?.content || '',
      issuanceDate: moment(certificateData?.issuanceDate).format('YYYY-MM-DD') || '',
      field: certificateData?.field || null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'Hãy nhập đầy tên van bằng')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
      content: Yup.string()
        .min(5, 'Hãy nhập đầy đủ nội dung bằng')
        .max(30, 'Nhập nội dung đúng định dạng')
        .required('Không được bỏ trống'),
      issuanceDate: Yup.date().required('Vui lòng nhập ngày'),
      field: Yup.string().required('Hãy nhập lĩnh vực'),
    }),
    onSubmit: (values) => {
      if (Object.keys(certificateData).length === 0) {
        values.id = uuidv4();
        handleAddCertificate(values, 'certificates');
      } else {
        values.id = certificateData.id;
        employee.certificates = employee.certificates.filter((certificate) => certificate.id !== values.id);
        employee.certificates.push(values);
      }
      handleClose();
    },
  });
  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Thêm văn bằng
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextField
                  label="Tên văn bằng"
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
              <Grid item sm={12} xs={12}>
                <TextField
                  label="Nội dung văn bằng"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="content"
                  size="small"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  error={formik.errors.content && formik.touched.content}
                  helperText={formik.errors.content}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Ngày cấp"
                  variant="outlined"
                  name="issuanceDate"
                  value={formik.values.issuanceDate}
                  onChange={formik.handleChange}
                  error={formik.errors.issuanceDate && formik.touched.issuanceDate}
                  helperText={formik.errors.issuanceDate}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextField
                  select
                  label="Lĩnh vực"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="field"
                  size="small"
                  value={formik.values?.field?.fieldName}
                  onChange={(event) => {
                    formik.setFieldValue('field', event.target.value);
                  }}
                  error={formik.errors.field && formik.touched.field}
                  helperText={formik.errors.field}
                >
                  {otherFeature.DegreeField.map((item) => (
                    <MenuItem value={item.fieldName}>{item.fieldName}</MenuItem>
                  ))}
                </TextField>
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

export default EmployeeCertificateDialog;
