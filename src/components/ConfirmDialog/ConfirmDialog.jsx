import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const ConfirmDialog = (props) => {
  const { onConfirmDialogClose, onYesClick } = props;

  return (
    <>
      <Dialog className="confirm-dialog" open={true} onClose={onConfirmDialogClose} fullWidth maxWidth={'sm'}>
        <DialogTitle id="alert-dialog-title">Xóa nhân viên</DialogTitle>
        <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: '#FF9E43' }} onClick={onConfirmDialogClose}>
            Hủy
          </Button>
          <Button onClick={onYesClick} variant="contained" sx={{ mb: 2, background: '#7467EF' }} type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
