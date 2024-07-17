import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootStackParamList } from "../../types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Select from "../select";
import SelectOption from "../selectOption";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FilterSidebar({ closeSidebar, isSidebarOpen }: any) {
    const rootNavigation = useNavigation<RootNavigationProp>();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState: any) => !previousState);

    const sidebarOffset = useSharedValue(400);

    const currencyOptions = [
        { id: 1, text: 'EUR', flag: 'EU' },
        { id: 2, text: 'BRL', flag: 'BR' },
        { id: 3, text: 'USD', flag: 'US' },
    ];

    useEffect(() => {
        if (isSidebarOpen) {
            sidebarOffset.value = withTiming(0, { duration: 300 });
        } else {
            sidebarOffset.value = withTiming(400, { duration: 300 });
        }
    }, [isSidebarOpen]);

    const animatedSidebarStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: sidebarOffset.value }]
        };
    });

    const handleCloseSidebar = () => {
        sidebarOffset.value = withTiming(400, { duration: 300 });
        closeSidebar();
    };
    return (
        <View className="absolute flex-1 h-full w-full z-50 right-0">
            <View className="absolute h-full w-full bg-black opacity-60"></View>
            <Animated.View style={[animatedSidebarStyle, { backgroundColor: 'white', height: '100%', width: '90%', position: 'absolute', right: 0, zIndex: 20 }]}>
                <View className="flex-1 pt-12">
                    <View className="w-full items-end px-5 flex-row justify-between">
                        <Text className="text-3xl font-bold">Filtros</Text>
                        <TouchableOpacity onPress={handleCloseSidebar} style={{ padding: 4, alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name="close-circle-outline" size={32} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-1 px-5 pb-10 mt-8">
                        <View className="flex-1 h-full">
                            <View className="py-2 flex-row gap-3 items-center justify-start">
                                <View className="justify-start items-center flex-row gap-3 h-full w-full">
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <Text className=" text-xl">Mostrar lojas online</Text>
                                </View>
                            </View>
                            <View className="py-2 flex-row gap-3 items-center justify-start">
                                <View className="justify-start items-center flex-row gap-3 h-full w-full">
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <Text className=" text-xl">Mostrar eventos</Text>
                                </View>
                            </View>
                            <View className="py-2 flex-row gap-3 items-center justify-start border-b border-[#D7D7D7]">
                                <View className="justify-start items-center flex-row gap-3 h-full w-full">
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <Text className=" text-xl">Mostrar promoções</Text>
                                </View>
                            </View>
                            <View className="py-2 flex-row gap-3 items-center justify-start">
                                <View className="justify-start items-center flex-row gap-3 h-full w-full">
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <Text className=" text-xl">Mostrar lojas físicas próximas a mim</Text>
                                </View>
                            </View>
                            <View className="py-2 flex-row gap-3 items-center justify-start border-b border-[#D7D7D7]">
                                <View className="justify-start items-center flex-row gap-3 h-full w-full">
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <Text className=" text-xl">Distância máxima</Text>
                                </View>
                            </View>
                            <View className=" py-2 flex-row gap-3 items-center justify-start">
                                <View className="w-full mt-1 gap-2 mt-4">
                                    <Text className="text-2xl font-normal">
                                        Buscar localidade
                                    </Text>
                                    <Select
                                        options={currencyOptions}
                                        onChangeSelect={(id: number) => console.log(id)}
                                        text={'Portugal'}
                                        SelectOption={SelectOption}
                                    />
                                </View>
                            </View>
                        </View>
                        <View className="flex-1 w-full h-full justify-end">
                            <View className=" w-full rounded-full w-20 h-20 justify-center items-center pb-8">
                                <TouchableOpacity
                                    style={{ borderRadius: 8, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                        <Feather name="check" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}
