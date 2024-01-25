/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes/app.routes';
import {api} from '../../services/api';
import {AuthContext} from '../../contexts/AuthContext';

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const {signOut} = useContext(AuthContext);

  const [number, setNumber] = useState('');

  async function openOrder() {
    if (number === '') {
      return;
    }

    const response = await api.post('/order', {
      table: number,
    });

    console.log(response.data);

    navigation.navigate('Order', {
      number: number,
      order_id: response.data.id,
    });

    setNumber('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New Order</Text>

      <TextInput
        placeholder="Table number"
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />
      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Open table</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={[styles.buttonText, {color: '#FFF'}]}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
