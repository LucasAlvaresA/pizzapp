/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import {View, ActivityIndicator} from 'react-native';

function Routes() {
  const isAuthenticaded = false;
  const loading = false;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1D1D2E',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={60} color="#FFF" />
      </View>
    );
  }

  return isAuthenticaded ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
