import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CategoryProps} from '../../pages/Order';
import {styles} from './styles';

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

export function ModalPicker({
  options,
  handleCloseModal,
  selectedItem,
}: ModalPickerProps) {
  // Select item
  function onPressItem(item: CategoryProps) {
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}>
      <Text style={styles.item}>{item?.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}
