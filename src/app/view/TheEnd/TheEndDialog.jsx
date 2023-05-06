import {
  Dialog,
  DialogTitle,
  Icon,
  IconButton,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '~/app/redux/actions/employeeActions';
import Certificate from '~/components/ProfileEmployee/Certificate';
import CurriculumVitae from '~/components/ProfileEmployee/CurriculumVitae';
import Resume from '~/components/ProfileEmployee/Resume';
import SendToLeadershipDialog from './SendToLeadershipDialog';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const TheEndDialog = (props) => {
  const { handleClose, hidden, status } = props;
  //save to use
  const componentRef = useRef();
  const dispatch = useDispatch();
  //get data employee to handle after add new
  const employee = useSelector((state) => state?.employee?.detailEmployee);
  const dataForm = useSelector((state) => state?.employee?.detailForm).cv;
  const loading = useSelector((state) => state).employee.loading;
  const idRegister = useSelector((state) => state?.employee?.IDRegister);
  const [employeeData, setEmployeeData] = useState(employee);
  const [shouldOpenSendToLeadershipDialog, setshouldOpenSendToLeadershipDialog] = useState(false);
  const [dataCV, setDataCV] = useState({
    skill: dataForm?.skill || '',
    hobby: dataForm?.hobby || '',
    careerGoal: dataForm?.careerGoal || '',
    workExperiences: dataForm?.workExperiences || [],
  });
  //change Tab
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToList = (data, method) => {
    setDataCV({
      ...dataCV,
      [method]: [...dataCV[method], data],
    });
  };

  useEffect(() => {
    setEmployeeData(employee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  const handleChangeEmployee = (event, method) => {
    if (method === 'skill' || method === 'hobby' || method === 'careerGoal') {
      setDataCV({ ...dataCV, [method]: event.target.value });
    } else {
      const curriculum = { ...employeeData.employeeInfo, [method]: event.target.value };
      setEmployeeData({ ...employeeData, employeeInfo: curriculum });
    }
  };

  return (
    <>
      <Dialog open={true} maxWidth={'lg'} fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Hồ sơ nhân viên
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        {loading ? (
          <DialogContent>...Đang tải dữ liệu</DialogContent>
        ) : (
          <DialogContent sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="Hồ sơ" {...a11yProps(0)} />
              <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} />
              <Tab label="Danh sách văn bằng" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0} style={{ width: '100%' }}>
              <Resume
                ref={componentRef}
                employee={employee}
                status={status}
                dataCV={dataCV}
                handleChangeEmployee={handleChangeEmployee}
                handleAddResumeCompany={handleAddToList}
                disa={'none'}
              />
            </TabPanel>

            <TabPanel value={value} index={1} style={{ width: '100%' }}>
              <CurriculumVitae
                ref={componentRef}
                employee={employee}
                status={status}
                handleChangeEmployee={handleChangeEmployee}
              />
            </TabPanel>

            <TabPanel value={value} index={2} style={{ width: '100%' }}>
              <Certificate ref={componentRef} employee={employee} status={false} />
            </TabPanel>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: '#FF9E43' }} onClick={() => handleClose()}>
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2, background: '#7467EF', display: hidden }}
            onClick={() => {
              dispatch(updateEmployee({ employeeId: idRegister, resume: employeeData.employeeInfo, cv: dataCV }));
            }}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2, background: '#339999', display: hidden }}
            onClick={() => {
              setshouldOpenSendToLeadershipDialog(true);
            }}
          >
            Gửi lãnh đạo
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenSendToLeadershipDialog && (
        <SendToLeadershipDialog
          handleCloseAll={handleClose}
          handleClose={() => {
            setshouldOpenSendToLeadershipDialog(false);
          }}
        />
      )}
    </>
  );
};

export default TheEndDialog;
