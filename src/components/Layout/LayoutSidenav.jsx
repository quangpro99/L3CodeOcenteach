import { Box, styled } from '@mui/material';
import { navigation } from '~/app/navigation';
import Brand from '../Nav/Brand';
import SideNav from '../Nav/SideNav';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const LayoutSidenavRoot = styled(Box)(({ theme }) => ({
  position: 'fixed',
  height: '100vh',
  width: theme === 'full' ? 260 : 80,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  zIndex: 111,
  overflow: 'hidden',
  color: '#FFFFFF',
  transition: 'all 300ms ease',
  backgroundColor: 'var(--primary)',
}));

const LayoutSidenav = (props) => {
  const { theme } = props;

  return (
    <>
      <LayoutSidenavRoot theme={theme}>
        <FlexBox>
          <Brand theme={theme} />
          <SideNav theme={theme} item={navigation} />
        </FlexBox>
      </LayoutSidenavRoot>
    </>
  );
};

export default LayoutSidenav;
