import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface ItemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
  deleteItem: (item_id: string) => void;
}

export function ListItem({data, deleteItem}: ItemProps) {
  function handleDeleteItem() {
    deleteItem(data.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {data.amount} - {data.name}
      </Text>

      <TouchableOpacity onPress={handleDeleteItem}>
        <Image
          style={styles.icon}
          source={require('../../assets/deleteIcon.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
