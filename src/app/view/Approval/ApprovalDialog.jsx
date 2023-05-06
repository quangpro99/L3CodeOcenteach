import {
  Dialog,
  DialogTitle,
  Box,
  Icon,
  DialogContent,
  Typography,
  Tooltip,
  IconButton,
  DialogActions,
  Button,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MaterialTable from '@material-table/core';
import React, { useState } from 'react';
import Resume from '~/components/ProfileEmployee/Resume';
import CurriculumVitae from '~/components/ProfileEmployee/CurriculumVitae';
import { useSelector } from 'react-redux';
import AcceptDialog from './AcceptDialog';
import RefuseDialog from './RefuseDialog';
import AdditionalRequestDialog from './AdditionalRequestDialog';

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

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

const ApprovalDialog = (props) => {
  const { handleClose, hidden } = props;
  const dataForm = useSelector((state) => state?.employee?.detailForm);
  const dataEmployee = useSelector((state) => state?.employee?.detailEmployee);
  const loading = useSelector((state) => state).employee.loading;
  const [shouldOpenAcceptDialog, setShouldOpenAcceptDialog] = useState(false);
  const [shouldOpenRefuseDialog, setShouldOpenRefuseDialog] = useState(false);
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    {
      title: 'Hành động',
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton>
                <Icon color="success">visibilityIcon</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: 'Tên văn bằng', field: 'name' },
    { title: 'Nội dung ', field: 'content' },
    { title: 'Ngày cấp', field: 'issuanceDate' },
    { title: 'Lĩnh Vực', field: 'field' },
  ];

  return (
    <>
      <Dialog open={true} maxWidth={'lg'} fullWidth={true}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Hồ sơ nhân viên
          <Box onClick={handleClose}>
            <Icon color="error">close</Icon>
          </Box>
        </DialogTitle>
        {loading ? (
          <DialogContent>...Đang tải dữ liệu</DialogContent>
        ) : (
          <DialogContent>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab label="Hồ sơ" {...a11yProps(0)} />
                <Tab label="Sơ yếu lý lịch" {...a11yProps(2)} />
                <Tab label="Danh sách văn bằng" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0} style={{ width: '100%' }}>
                <Resume employee={dataEmployee} dataCV={dataForm.cv} status={true} display={'none'} hidden={true} />
              </TabPanel>
              <TabPanel value={value} index={1} style={{ width: '100%' }}>
                <CurriculumVitae
                  employee={{ employeeInfo: dataForm.resume, familyRelations: dataEmployee.familyRelations }}
                  status={true}
                  hidden={true}
                />
              </TabPanel>
              <TabPanel value={value} index={2} style={{ width: '100%' }}>
                <MaterialTable
                  title={''}
                  data={dataEmployee?.certificates}
                  columns={columns}
                  options={{
                    rowStyle: (rowData, index) => {
                      return {
                        backgroundColor: index % 2 === 1 ? '#EEE' : '#FFF',
                      };
                    },
                    maxBodyHeight: '1000px',
                    minBodyHeight: '370px',
                    padding: 'default',
                    toolbar: false,
                  }}
                />
              </TabPanel>
            </Box>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="contained" sx={{ background: '#FF9E43', mb: 1 }} onClick={() => handleClose()}>
            {hidden !== 'none' ? 'Hủy' : 'Đóng'}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 1, display: hidden }}
            onClick={() => {
              setShouldOpenRefuseDialog(true);
            }}
          >
            Từ Chối
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ mb: 1, display: hidden }}
            onClick={() => {
              setShouldOpenAcceptDialog(true);
            }}
          >
            Duyệt
          </Button>
          <Button
            sx={{ mb: 1, display: hidden }}
            variant="contained"
            color="primary"
            onClick={() => {
              setShouldOpenRequestDialog(true);
            }}
          >
            Yêu cầu bổ sung
          </Button>
        </DialogActions>
      </Dialog>
      {/* Duyệt form */}
      {shouldOpenAcceptDialog && (
        <AcceptDialog
          dataEmployee={dataEmployee}
          handleClose={() => {
            setShouldOpenAcceptDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
      {/* Từ chối form */}
      {shouldOpenRefuseDialog && (
        <RefuseDialog
          dataEmployee={dataEmployee}
          handleClose={() => {
            setShouldOpenRefuseDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
      {/* Yêu cầu bổ sung */}
      {shouldOpenRequestDialog && (
        <AdditionalRequestDialog
          dataEmployee={dataEmployee}
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
    </>
  );
};

export default ApprovalDialog;
