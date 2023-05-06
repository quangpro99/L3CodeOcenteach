import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import EmployeeInfo from './EmployeeInfo';
import EmployeeCertificate from './EmployeeCertificate';
import EmployeeRelation from './EmployeeRelation';
import * as Yup from 'yup';
// import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, putEmployee } from '~/app/redux/actions/employeeActions';
import EmployeeRegisterDialog from './EmployeeRegisterDialog';
import moment from 'moment';

function AddEmployeeDialog(props) {
  const { handleClose, hiddencr } = props;
  const dispatch = useDispatch();
  //get employeeData
  const employee = useSelector((state) => state?.employee?.employeeData);
  //handle button registry
  const [saved, setSaved] = useState('none');
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  //data employee trasfer addEmployee.jsx
  const [employeeData, setEmployee] = useState(employee);
  //change tab Info, Diploma, Relation
  const [value, setValue] = useState('1');
  const detailEm = useSelector((state) => state?.employee?.detailEmployee);
  const loading = useSelector((state) => state).employee.loading;
  const rcEmployee = hiddencr ? detailEm : {};
  const [listCertificate, setListCertificate] = useState(rcEmployee);
  const [listRelation, setListRelation] = useState(rcEmployee);
  const idRegister = useSelector((state) => state?.employee?.IDRegister);

  const handleChange = (event, newValue) => {
    const valueCheck = { ...formik.values };
    if (Object.keys(formik.errors).length === 0 && Object.values(valueCheck).every((value) => value !== '')) {
      setValue(newValue);
    } else {
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    setEmployee(employee);
    setListCertificate(rcEmployee);
    setListRelation(rcEmployee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  //add list certificate
  const handleAddToList = (data, method) => {
    setEmployee({ ...employeeData, [method]: [...employeeData[method], data] });
    setListCertificate({ ...rcEmployee, [method]: [...rcEmployee[method], data] });
    setListRelation({ ...rcEmployee, [method]: [...rcEmployee[method], data] });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: rcEmployee?.employeeInfo?.fullName || '',
      code: rcEmployee?.employeeInfo?.code || '',
      phone: rcEmployee?.employeeInfo?.phone || '',
      email: rcEmployee?.employeeInfo?.email || '',
      address: rcEmployee?.employeeInfo?.address || '',
      teamId: rcEmployee?.employeeInfo?.teamId || '',
      citizenId: rcEmployee?.employeeInfo?.citizenId || '',
      photoUrl: rcEmployee?.employeeInfo?.photoUrl || 'assets/images/logos/logo1.png',
      gender: rcEmployee?.employeeInfo?.gender || '',
      dateOfBirth: moment(rcEmployee?.employeeInfo?.dateOfBirth).format('YYYY-MM-DD') || '',
      status: rcEmployee?.employeeInfo?.status || 1,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'Hãy nhập đầy đủ họ và tên')
        .max(30, 'Nhập họ tên đúng định dạng')
        .required('Không được bỏ trống'),
      code: Yup.string()
        .min(6, 'Nhập tối thiểu 6 ký tự')
        .max(32, 'Nhập không được quá 32 ký tự')
        .required('Không được bỏ trống'),
      email: Yup.string().email('Email sai định dạng').required('Không được bỏ trống'),
      teamId: Yup.string().required('Không được bỏ trống'),
      dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), 'Yêu cầu trên 18 tuổi')
        .min(new Date(Date.now() - 1892160000000), 'Yêu cầu dưới 60 tuổi')
        .required('Vui lòng nhập ngày'),
      phone: Yup.string()
        .min(10, 'Số điện thoại ít nhất 10 số')
        .max(11, 'Nhập không dc quá 11 ký tự')
        .required('Không được bỏ trống'),
      gender: Yup.string().required('Không được bỏ trống'),
      address: Yup.string().required('Không được bỏ trống'),
      citizenId: Yup.string().max(16, 'Không được nhập quá 16 ký tư').required('Không được bỏ trống'),
    }),
    onSubmit: (values) => {
      if (!hiddencr) {
        dispatch(
          addEmployee({
            employeeInfo: values,
            certificates: listCertificate.certificates || employeeData.certificates,
            familyRelations: listRelation.familyRelations || employeeData.familyRelations,
          }),
        );
      } else {
        dispatch(
          putEmployee({
            employeeId: idRegister,
            data: {
              employeeInfo: values,
              certificates:
                listCertificate?.certificates?.map((item) => {
                  return {
                    ...item,
                    educationStartDate: moment(item.educationStartDate).format('YYYY-MM-DD') || '',
                    educationEndDate: moment(item.educationEndDate).format('YYYY-MM-DD') || '',
                    issuanceDate: moment(item.issuanceDate).format('YYYY-MM-DD') || '',
                  };
                }) || employeeData.certificates,
              familyRelations:
                listRelation?.familyRelations?.map((item) => {
                  return {
                    ...item,
                    dateOfBirth: moment(item.dateOfBirth).format('YYYY-MM-DD') || '',
                  };
                }) || employeeData.familyRelations,
            },
          }),
        );
      }
      setSaved('block');
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Dialog open={true} maxWidth={'lg'} fullWidth={true}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {hiddencr ? 'Sửa nhân viên' : 'Thêm mới nhân viên'}
          <Box onClick={() => handleClose()}>
            <Close style={{ cursor: 'pointer' }} color="error"></Close>
          </Box>
        </DialogTitle>
        {loading ? (
          <DialogContent>...Đang tải dữ liệu</DialogContent>
        ) : (
          <DialogContent>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  background: 'var(--primary)',
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab label="Thông tin nhân viên" value="1" />
                  <Tab label="Thông tin văn bằng" value="2" />
                  <Tab label="Thông tin quan hệ gia đình" value="3" />
                </TabList>
              </Box>
              <>
                <TabPanel value="1" sx={{ p: '20px 0' }}>
                  <EmployeeInfo formikRoot={formik} />
                </TabPanel>
                <TabPanel value="2" sx={{ p: '20px 0' }}>
                  <EmployeeCertificate
                    employeeData={hiddencr ? listCertificate : employeeData}
                    handleAddCertificate={handleAddToList}
                  />
                </TabPanel>
                <TabPanel value="3" sx={{ p: '20px 0' }}>
                  <EmployeeRelation
                    employeeData={hiddencr ? listRelation : employeeData}
                    handleAddRelation={handleAddToList}
                  />
                </TabPanel>
              </>
            </TabContext>
          </DialogContent>
        )}
        <form onSubmit={formik.handleSubmit}>
          <DialogActions>
            <Button variant="contained" type="submit" sx={{ mb: 2, background: '#7467EF' }}>
              Lưu
            </Button>

            <Button
              variant="contained"
              sx={{
                mb: 2,
                background: '#339999',
                // display: saved,
              }}
              onClick={() => {
                setShouldOpenDialog('true');
              }}
            >
              Đăng kí
            </Button>

            <Button variant="contained" sx={{ mb: 2, background: '#FF9E43' }} onClick={() => handleClose()}>
              Hủy
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* UI registry employee */}
      {shouldOpenDialog && (
        <EmployeeRegisterDialog
          // handleAddToList={handleAddToList}
          handleClose={() => {
            setShouldOpenDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
    </>
  );
}

export default AddEmployeeDialog;
