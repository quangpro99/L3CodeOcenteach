import { Box, styled } from '@mui/material';
import { Span } from '../Typography';

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
}));

// eslint-disable-next-line
const StyledSpan = styled(Span)(({}) => ({
  marginLeft: '.5rem',
  lineHeight: '1.5',
  display: 'none',
}));

const LogoImg = styled('img')(({ theme }) => ({
  backgroundSize: 'contain',
  margin: '16px 10px 20px 8px',
  width: theme === 'full' ? '200px' : '160px',
}));

const Brand = (props) => {
  const { theme } = props;

  return (
    <>
      <BrandRoot>
        <Box>
          <LogoImg theme={theme} src="\assets\images\logos\logo1.png" />
          <StyledSpan>Ocenteach</StyledSpan>
        </Box>
      </BrandRoot>
    </>
  );
};

export default Brand;
