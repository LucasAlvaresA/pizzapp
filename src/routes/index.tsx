import React from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes() {
  const isAuthenticaded = false;
  const loading = false;

  return isAuthenticaded ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
