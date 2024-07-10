import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Topbar() {
    const [value, setValue] = useState('0')

    return (
        <>
            <View className="flex-none flex-row items-center px-4 justify-between bg-[#212121] w-full h-[110px] pt-8">
                <View className="relative bg-[#303030] rounded-full h-14 w-14 flex justify-center items-center">
                    <View className="absolute top-0 right-1 h-3 w-3 bg-[#3F31E1] rounded-full border border-white"></View>
                    <Feather name="users" size={24} color="white" />
                </View>
                <View className="relative flex-1 mx-4">
                    <View className="absolute right-0 h-14 p-4 flex justify-center items-center rounded-r-2xl z-10 bg-[#2A2C2D]">
                        <FontAwesomeIcon
                            icon={faSearch}
                            size={20}
                            style={{ color: 'gray' }}
                        />
                    </View>
                    <TextInput style={{ textAlign: 'right' }} placeholder="0" onChangeText={(number) => setValue(number)} placeholderTextColor="#4b5563" className="w-full h-14 py-2 pr-16 rounded-2xl bg-[#343434] text-gray-600 font-black text-2xl" />
                </View>
                <View className="bg-[#303030] rounded-full h-14 w-14 flex justify-center items-center">
                    <Ionicons name="notifications" size={24} color="white" />
                </View>
                <View className=" rounded-full h-14 w-14 flex justify-center items-center">
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}