import { Dialog, DialogTitle, Box, Icon, DialogContent, Typography, DialogActions, Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddEmployeeDialog from './AddEmployeeDialog';

const AdditionalDialog = (props) => {
  const { handleClose, hidden } = props;
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const dataEmployee = useSelector((state) => state?.employee?.detailEmployee);

  return (
    <>
      <Dialog open={true} maxWidth={'sm'} fullWidth={true}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Yêu cầu bổ sung
          <Box onClick={handleClose}>
            <Icon color="error">close</Icon>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>Cần bổ sung : {dataEmployee.terminateRequestDetail || 'Hiện chưa cần bổ sung'}</Typography>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button variant="contained" sx={{ mb: 2, background: '#FF9E43' }} onClick={handleClose}>
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{ mb: 2, background: '#7467EF' }}
              type="submit"
              onClick={() => {
                setShouldOpenDialog(true);
              }}
            >
              Bổ sung thông tin
            </Button>
          </DialogActions>
        </DialogActions>
      </Dialog>
      {/* UI add employee */}
      {shouldOpenDialog && <AddEmployeeDialog handleClose={handleClose} hiddencr={hidden} />}
    </>
  );
};

export default AdditionalDialog;
