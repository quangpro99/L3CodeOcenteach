import { useRoutes } from 'react-router-dom';
import routes from './Routes';
import { getTokenAPI } from '~/Services/AddEmployeeServices';
import { useEffect } from 'react';

const App = () => {
  const routerLink = useRoutes(routes);

  useEffect(() => {
    getTokenAPI().then((res) => {
      localStorage.setItem('access_token', res?.data.access_token);
    });
  });

  return (
    <>
      <>{routerLink}</>
    </>
  );
};

export default App;
