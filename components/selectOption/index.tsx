import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';

const SelectOption = ({ item, isSelected, onSelect }: any) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        borderBottomWidth: 1,
        backgroundColor: isSelected ? '#EDEDED' : '#fff',
        borderColor: '#d1d5db'
      }}
    >
      <View className="rounded-lg justify-between w-full h-14 px-5 text-xl text-gray-500 flex flex-row items-center">
        <View className="flex flex-row gap-2">
          {item.flag ? <CountryFlag isoCode={item.flag} size={20} /> : null}
          <Text className="text-xl">{item.text}</Text>
        </View>
        {isSelected && <Feather name="check" size={24} color="black" />}
      </View>
    </TouchableOpacity>
  );
}

export default SelectOption;
