import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { useRoute } from '@react-navigation/native';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Topbar({ openSidebar }: any) {
    const [value, setValue] = useState('0')
    const rootNavigation = useNavigation<RootNavigationProp>();
    const route = useRoute();

    const handleSwitchAccount = () => {
        if (route.name === 'home') {
            rootNavigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'dashboard' }],
                })
            );
        } else {
            rootNavigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'commerce' }],
                })
            );
        }
    };

    return (
        <>
            <View className="flex-none flex-row items-center px-4 justify-between bg-[#212121] w-full h-[110px] pt-8">
                <View className="relative bg-[#303030] rounded-full h-14 w-14 flex justify-center items-center">
                    <View className="absolute top-0 right-1 h-3 w-3 bg-[#3F31E1] rounded-full border border-white"></View>
                    <TouchableOpacity
                        onPress={handleSwitchAccount}
                        style={{ width: '100%', height: '100%', borderRadius: 999, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Feather name="users" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="relative flex-1 mx-4">
                    {route.name === 'home' ? null :
                        <View className="absolute right-0 h-14 p-4 flex justify-center items-center rounded-r-2xl z-10 bg-[#2A2C2D]">
                            <Feather name="plus" size={20} color="#6FC768" />
                        </View>
                    }
                    <TextInput  placeholder="0" onChangeText={(number) => setValue(number)} placeholderTextColor="#4b5563" className={`w-full h-14 py-2 ${route.name === 'home' ? 'text-center': 'pr-16 text-right'} rounded-2xl bg-[#343434] text-gray-600 font-black text-2xl`} />
                </View>
                <View className="bg-[#303030] rounded-full h-14 w-14 flex justify-center items-center">
                    <Ionicons name="notifications" size={24} color="white" />
                </View>
                <View className=" rounded-full h-14 w-14 flex justify-center items-center">
                    <TouchableOpacity onPress={openSidebar} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}