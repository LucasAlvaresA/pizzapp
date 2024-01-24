/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {api} from '../../services/api';

type RouteDetailParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  async function handleCloseOrder() {
    try {
      await api.delete('/order', {
        params: {
          order_id: route.params?.order_id,
        },
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Table {route.params.number}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Image
            style={styles.icon}
            source={require('../../assets/deleteIcon.png')}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{color: '#FFF'}}>Category</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={{color: '#FFF'}}>Category</Text>
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>Quantity</Text>
        <TextInput
          style={[styles.input, {width: '60%', textAlign: 'center'}]}
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.action}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
