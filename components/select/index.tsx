import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, Modal, FlatList, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Select = ({ options, onChangeSelect, text, SelectOption }: any) => {
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: any) => {
    setSelected(item);
    onChangeSelect(item.id);
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
        <View className="border-2 rounded-lg justify-between w-full h-14 border-gray-300 px-5 text-xl text-gray-500 flex flex-row items-center">
          <View className="flex flex-row gap-2">
            {selected && <CountryFlag isoCode={selected.flag} size={20} />}
            <Text className="text-xl">{selected ? selected.text : text}</Text>
          </View>
          <Entypo name="chevron-thin-down" size={20} color="#9ca3af" />
        </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
          <View style={{marginTop: 20}} className='relativeflex flex-row w-full h-12 justify-center'>
            <TouchableOpacity style={{position: 'absolute', left: 20}} onPress={() => setModalVisible(false)}>
              <FontAwesomeIcon style={{ color: 'black', padding: 11 }} icon={faArrowLeft} />
            </TouchableOpacity>

            <Text className='text-2xl'>
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
