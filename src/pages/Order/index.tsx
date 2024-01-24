/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {styles} from './styles';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {api} from '../../services/api';
import {ModalPicker} from '../../components/ModalPicker';

type RouteDetailParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [modalCategoryOpen, setModalCategoryOpen] = useState(false);

  const [amount, setAmout] = useState('1');

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('/category');
      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadInfo();
  }, []);

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

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
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

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryOpen(true)}>
          <Text style={{color: '#FFF'}}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>Quantity</Text>
        <TextInput
          style={[styles.input, {width: '60%', textAlign: 'center'}]}
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmout}
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

      <Modal transparent visible={modalCategoryOpen} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalCategoryOpen(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>
    </View>
  );
}
