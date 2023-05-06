import { Box, Icon, styled, IconButton, MenuItem, Hidden, Avatar } from '@mui/material';
import MenuTopBar from './MenuTopBar';
import { Link } from 'react-router-dom';
import { Span } from '../Typography';

const StyledIconButton = styled(IconButton)(() => ({
  color: '#542608',
}));

const TopbarRoot = styled('div')(() => ({
  top: 0,
  zIndex: 96,
  boxShadow:
    '0px 5px 5px -3px rgba(0, 0, 0, 0.06),0px 8px 10px 1px rgba(0, 0, 0, 0.042),0px 3px 14px 2px rgba(0, 0, 0, 0.036)',
  transition: 'all 0.3s ease',
  height: 64,
}));

const TopbarContainer = styled(Box)(() => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  boxSizing: 'border-box',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const UserMenu = styled(Box)(() => ({
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(() => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': { marginRight: '10px', color: 'rgba(52, 49, 76, 1)' },
}));

const LayoutTopbar = (props) => {
  const { handleChangeSideNavTheme } = props;

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleChangeSideNavTheme}>
            <Icon>menu</Icon>
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <MenuTopBar
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Xin chào <strong>{'Quang'}</strong>
                  </Span>
                </Hidden>
                <Avatar src="/assets/images/logos/logo1.png" sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Trang chủ </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Cá nhân </Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Icon> settings </Icon>
              <Span> Cài đặt </Span>
            </StyledItem>
            <StyledItem>
              <Icon> power_settings_new </Icon>
              <Span> Đăng xuất </Span>
            </StyledItem>
          </MenuTopBar>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default LayoutTopbar;
