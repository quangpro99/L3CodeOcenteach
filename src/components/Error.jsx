import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  maxWidth: 320,
  flexDirection: 'column',
  justifyContent: 'center',
}));

const Image = styled('img')(() => ({
  width: '100%',
  marginBottom: '30px',
}));

const ErrorRoot = styled(FlexBox)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}));

const Error = () => {
  const navigate = useNavigate();
  return (
    <ErrorRoot>
      <JustifyBox>
        <Image src="/assets/images/illustrations/404.svg" alt="" />

        <Button color="primary" variant="contained" onClick={() => navigate(-1)}>
          Quay trở lại
        </Button>
      </JustifyBox>
    </ErrorRoot>
  );
};

export default Error;
