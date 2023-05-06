import { Outlet } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { useState } from 'react';
import LayoutSidenav from './LayoutSidenav';
import LayoutTopbar from './LayoutTopbar';
import LazySuspense from '../LazySuspense';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
}));

const TopbarRoot = styled(Box)(({ theme }) => ({
  flex: '1',
  height: '100vh',
  display: 'flex',
  flexFlow: '1',
  flexDirection: 'column',
  verticalAlign: 'top',
  marginLeft: theme === 'full' ? 260 : 80,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
}));

const BoxRoot = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  overflowY: 'auto',
  overflowX: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Layout = () => {
  const [theme, setTheme] = useState('full');

  const handleChangeTheme = () => {
    setTheme('full' === theme ? 'compact' : 'full');
  };

  return (
    <>
      <FlexBox>
        <LayoutSidenav theme={theme} />
        <TopbarRoot theme={theme}>
          <LayoutTopbar handleChangeTheme={handleChangeTheme} />
          <BoxRoot>
            <Box flexGrow={1} position="relative">
              <LazySuspense>
                <Outlet />
              </LazySuspense>
            </Box>
          </BoxRoot>
        </TopbarRoot>
      </FlexBox>
    </>
  );
};

export default Layout;
