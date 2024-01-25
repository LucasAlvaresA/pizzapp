/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {api} from '../../services/api';
import {ModalPicker} from '../../components/ModalPicker';
import {ListItem} from '../../components/ListItem';

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

type ProductProps = {
  id: string;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<
    CategoryProps | undefined
  >();
  const [modalCategoryOpen, setModalCategoryOpen] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductOpen, setModalProductOpen] = useState(false);

  const [amount, setAmout] = useState('1');
  const [items, setItems] = useState<ItemProps[] | []>([]);

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('/category');
      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/category/products', {
        params: {category_id: categorySelected?.id},
      });

      setProducts(response.data);
      setProductSelected(response.data[0]);
    }

    loadProducts();
  }, [categorySelected]);

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item);
  }

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

  async function handleDeleteItem(item_id: string) {
    await api.delete('/order/remove', {
      params: {
        item_id: item_id,
      },
    });

    let removeItem = items.filter(item => {
      return item.id !== item_id;
    });

    setItems(removeItem);
  }

  async function handleAdd() {
    const response = await api.post('/order/add', {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount),
    });

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount,
    };

    setItems(oldArray => [...oldArray, data]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Table {route.params.number}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Image
              style={styles.icon}
              source={require('../../assets/deleteIcon.png')}
            />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryOpen(true)}>
          <Text style={{color: '#FFF'}}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductOpen(true)}>
          <Text style={{color: '#FFF'}}>{productSelected?.name}</Text>
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
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonNext, {opacity: items.length === 0 ? 0.3 : 1}]}
          disabled={items.length === 0}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListItem data={item} deleteItem={handleDeleteItem} />
        )}
      />

      <Modal transparent visible={modalCategoryOpen} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalCategoryOpen(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal transparent visible={modalProductOpen} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalProductOpen(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
}
