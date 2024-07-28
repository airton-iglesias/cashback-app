import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import { Feather } from '@expo/vector-icons';

const Select = ({ options, onChangeSelect, text, SelectOption }: any) => {
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: any) => {
    setSelected(item);
    onChangeSelect(item);
    setModalVisible(false);
  };

  const renderOption = ({ item }: any) => {
    return (
      <SelectOption
        item={item}
        isSelected={selected?.id === item.id}
        onSelect={() => handleSelect(item)}
      />
    );
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonOption}>
            {selected && selected.flag ? <CountryFlag isoCode={selected.flag} size={20} /> : null}
            <Text style={{fontSize: 16}}>{selected ? selected.text : text}</Text>
          </View>
          <Entypo name="chevron-thin-down" size={20} color="#9ca3af" />
        </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={() => setModalVisible(false)}>
            <Feather name="arrow-left" size={30} style={{ color: 'black', marginTop: 2 }} />
          </TouchableOpacity>

          <Text style={{fontSize: 24}}>
            {text}
          </Text>
        </View>
        <FlatList
          data={options}
          keyExtractor={item => String(item.id)}
          renderItem={renderOption}
        />
      </Modal>
    </View>
  );
}

export default Select;

const styles = StyleSheet.create({
  buttonWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 48,
    borderColor: '#ADB5BD',
    paddingHorizontal: 10,
    color: '#6B7280',
    flexDirection: 'row',
  },
  buttonOption: {
    flexDirection: 'row',
    gap: 10
  },
  modalWrapper: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    height: 48,
    marginTop: 20
  }
})