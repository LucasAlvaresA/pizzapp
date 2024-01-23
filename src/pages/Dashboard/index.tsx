import React, {useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';

export default function Dashboard() {
  const {signOut} = useContext(AuthContext);

  return (
    <View>
      <Text>Oi</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}
