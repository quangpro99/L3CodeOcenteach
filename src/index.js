import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '~/app/App';
import GlobalStyles from '~/GlobalStyles';
import store from './app/redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <Provider store={store}>
      {/* BrowserRouter phải có khi dùng useRoutes */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GlobalStyles>,
);
