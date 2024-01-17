import React from 'react';
import {StatusBar, View} from 'react-native';
import SignIn from './src/pages/SignIn';

export default function App() {
  return (
    <View>
      <SignIn />
      <StatusBar
        backgroundColor="#1d1d2e"
        barStyle="light-content"
        translucent={false}
      />
    </View>
  );
}
