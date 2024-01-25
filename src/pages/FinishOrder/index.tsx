import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {api} from '../../services/api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes/app.routes';

type RouteDetailParams = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  };
};

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>;

export function FinishOrder() {
  const route = useRoute<FinishOrderRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function handleFinish() {
    try {
      await api.put('/order/send', {
        order_id: route.params?.order_id,
      });

      navigation.popToTop();
    } catch {
      console.log('An error occurred in the request, please try again later');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Do you want to finalize this order?</Text>
      <Text style={styles.title}>Table {route.params?.number}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.textButton}>Finish order</Text>
        <Image
          style={styles.icon}
          source={require('../../assets/shoppingCart.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
