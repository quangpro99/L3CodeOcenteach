import React from 'react';
import { Box, Grid, TextField, Typography, Tooltip, IconButton, Icon, styled, MenuItem } from '@mui/material';
import CustomAvatar from '../Avatar/Avatar';
import MaterialTable from '@material-table/core';
import { otherFeature } from '~/app/otherFeature';
import moment from 'moment';

const CurriculumVitae = React.forwardRef((props, ref) => {
  const { employee, status, handleChangeEmployee, hidden } = props;
  const FlexBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    textAlign: 'center',
  }));

  const columns = [
    {
      title: 'Hành động',
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 1)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 0)}>
                <Icon color={'error'}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
      hidden: hidden,
    },
    { title: 'Họ tên', field: 'name' },
    { title: 'Ngày sinh', field: 'dateOfBirth', render: (rowdata) => moment(rowdata).format('DD/MM/YYYY') },
    {
      title: 'Giới tính',
      field: 'gender',
      render: (rowData) => {
        if (rowData.gender === 1) {
          return 'Nam';
        } else if (rowData.gender === 2) {
          return 'Nữ';
        } else {
          return 'Khác';
        }
      },
    },
    { title: 'Số CCCD', field: 'citizenId' },
    { title: 'Mối quan hệ', field: 'relation' },
    { title: 'Địa chỉ', field: 'address' },
  ];

  return (
    <div ref={ref} className="curriculum">
      <Grid container textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={600}>
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600}>
            Độc lập - Tự do - Hạnh phúc{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600}>-------------------------------------</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={14} padding={4} alignItems={'center'}>
        <Grid item xs={4} textAlign="center">
          <CustomAvatar
            image={employee?.employeeInfo?.photoUrl || 'assets/images/curiculumVitae/noneImage.png'}
            displayButton={'none'}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" fontWeight={600}>
            SƠ YẾU LÝ LỊCH
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600}>
              I. BẢN THÂN
            </Typography>
          </Grid>

          <Grid item container xs={12} justifyContent={'space-between'} columnSpacing={{ xs: 1, sm: 2 }} marginTop={2}>
            <Grid item xs={6} display={'flex'}>
              <Grid xs={2}>
                <Typography variant="subtitle1">Họ và tên</Typography>
              </Grid>
              <Grid xs={10} marginTop={'-5px'}>
                <TextField
                  type="text"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="fullName"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.fullName}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'fullName');
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={6} display={'flex'}>
              <Grid xs={2}>
                <Typography variant="subtitle1">Biệt danh</Typography>
              </Grid>
              <Grid xs={10} marginTop={'-5px'}>
                <TextField
                  type="text"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="commonName"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.commonName}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'commonName');
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} justifyContent={'space-between'} columnSpacing={{ xs: 1, sm: 2 }} marginTop={2}>
            <Grid item xs={6} display={'flex'}>
              <Grid xs={2.5}>
                <Typography variant="subtitle1">Ngày sinh</Typography>
              </Grid>
              <Grid xs={9.5} marginTop={'-5px'}>
                <TextField
                  type="date"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="dateOfBirth"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.dateOfBirth}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'dateOfBirth');
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={6} display={'flex'}>
              <Grid xs={2}>
                <Typography variant="subtitle1">Giới tính</Typography>
              </Grid>
              <Grid xs={10} marginTop={'-5px'}>
                <TextField
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  select
                  disabled={status}
                  name="gender"
                  size="small"
                  value={employee?.employeeInfo?.gender}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'gender');
                  }}
                >
                  {otherFeature.Gender.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.gender}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} display={'flex'} marginTop={2}>
            <Grid xs={0.8}>
              <Typography variant="subtitle1">Địa chỉ</Typography>
            </Grid>
            <Grid xs={11.2} marginTop={'-5px'}>
              <TextField
                type="text"
                fullWidth
                sx={{
                  '& fieldset': { border: 'none' },
                  borderBottom: ' 2px dotted ',
                  height: '30px',
                }}
                name="address"
                size="small"
                disabled={status}
                value={employee?.employeeInfo?.address}
                onChange={(event) => {
                  handleChangeEmployee(event, 'address');
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} display={'flex'} marginTop={2}>
            <Grid xs={1.5}>
              <Typography variant="subtitle1">Chỗ ở hiện nay</Typography>
            </Grid>
            <Grid xs={10.5} marginTop={'-5px'}>
              <TextField
                type="text"
                fullWidth
                sx={{
                  '& fieldset': { border: 'none' },
                  borderBottom: ' 2px dotted ',
                  height: '30px',
                }}
                size="small"
                name="currentAddress"
                disabled={status}
                value={employee?.employeeInfo?.currentAddress}
                onChange={(event) => {
                  handleChangeEmployee(event, 'currentAddress');
                }}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} justifyContent={'space-between'} columnSpacing={{ xs: 1, sm: 2 }} marginTop={2}>
            <Grid item xs={6} display={'flex'}>
              <Grid xs={2.5}>
                <Typography variant="subtitle1">Điện thoại</Typography>
              </Grid>
              <Grid xs={9.5} marginTop={'-5px'}>
                <TextField
                  type="text"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="phone"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.phone}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'phone');
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={6} display={'flex'}>
              <Grid xs={1.2}>
                <Typography variant="subtitle1">Email</Typography>
              </Grid>
              <Grid xs={10.8} marginTop={'-5px'}>
                <TextField
                  type="text"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="email"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.email}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'email');
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} justifyContent={'space-between'} columnSpacing={{ xs: 1, sm: 2 }} marginTop={2}>
            <Grid item xs={6} display={'flex'}>
              <Grid xs={1.8}>
                <Typography variant="subtitle1">Dân tộc</Typography>
              </Grid>
              <Grid xs={10.2} marginTop={'-5px'}>
                <TextField
                  type="text"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="ethnicity"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.ethnicity}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'ethnicity');
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={6} display={'flex'}>
              <Grid xs={2}>
                <Typography variant="subtitle1">Tôn giáo</Typography>
              </Grid>
              <Grid xs={10} marginTop={'-5px'}>
                <TextField
                  type="text"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="religion"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.religion}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'religion');
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} justifyContent={'space-between'} columnSpacing={{ xs: 1, sm: 2 }} marginTop={2}>
            <Grid item xs={6} display={'flex'}>
              <Grid xs={5}>
                <Typography variant="subtitle1">Số căn cước công dân</Typography>
              </Grid>
              <Grid xs={7} marginTop={'-5px'}>
                <TextField
                  type="text"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="citizenId"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.citizenId}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'citizenId');
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={6} display={'flex'}>
              <Grid xs={2}>
                <Typography variant="subtitle1">Cấp ngày</Typography>
              </Grid>
              <Grid xs={10} marginTop={'-5px'}>
                <TextField
                  type="date"
                  fullWidth
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderBottom: ' 2px dotted ',
                    height: '30px',
                  }}
                  name="citizenIdIssuanceDate"
                  size="small"
                  disabled={status}
                  value={employee?.employeeInfo?.citizenIdIssuanceDate}
                  onChange={(event) => {
                    handleChangeEmployee(event, 'citizenIdIssuanceDate');
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} display={'flex'} marginTop={2}>
            <Grid xs={0.8}>
              <Typography variant="subtitle1">Nơi cấp</Typography>
            </Grid>
            <Grid xs={11.2} marginTop={'-5px'}>
              <TextField
                type="text"
                fullWidth
                sx={{
                  '& fieldset': { border: 'none' },
                  borderBottom: ' 2px dotted ',
                  height: '30px',
                }}
                name="citizenIdIssuingAuthority"
                size="small"
                disabled={status}
                value={employee?.employeeInfo?.citizenIdIssuingAuthority}
                onChange={(event) => {
                  handleChangeEmployee(event, 'citizenIdIssuingAuthority');
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4} marginTop={2}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600}>
              II. QUAN HỆ GIA ĐÌNH
            </Typography>
          </Grid>

          <Grid item xs={12} marginBottom={4}>
            <Typography variant="h7" fontStyle={'italic'}>
              Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ, anh chị em ruột, vợ(hoặc chồng), con
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <MaterialTable
        title={''}
        data={employee?.familyRelations}
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

      <Grid container spacing={4} marginTop={2}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600} textAlign={'center'}>
              LỜI CAM ĐOAN
            </Typography>
          </Grid>

          <Grid item xs={12} marginBottom={4}>
            <Typography variant="h7">
              Tôi xin cam đoan những lời khai trên là đúng sự thực và chịu trách nhiệm về những lời khai đó. Nếu sau này
              cơ quan có thẩm quyền phát hiện vấn đề gì không đúng. Tôi xin chấp hành biện pháp xử lý theo quy định.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <FlexBox container spacing={4} marginTop={2}>
        <Box gap={1}>
          <Typography variant="body1">Hà Nội, ngày 21 tháng 4 năm 2023</Typography>
          <Typography variant="body1" fontWeight={600} marginTop={1}>
            Người khai ký tên
          </Typography>
          <Typography variant="body1" marginTop={1}>
            Quang
          </Typography>
          <Typography variant="body1" marginTop={1}>
            Tống Duy Quang
          </Typography>
        </Box>
      </FlexBox>
    </div>
  );
});

export default CurriculumVitae;
