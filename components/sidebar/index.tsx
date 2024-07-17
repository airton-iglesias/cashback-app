import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AiIcon from "../../assets/icons/AiIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootStackParamList } from "../../types/navigationTypes";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Sidebar({ closeSidebar, isSidebarOpen }: any) {
    const rootNavigation = useNavigation<RootNavigationProp>();

    const sidebarOffset = useSharedValue(400);

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
            <Animated.View style={[animatedSidebarStyle, { backgroundColor: '#212121', height: '100%', width: '90%', position: 'absolute', right: 0, zIndex: 20 }]}>
                <View className="flex-1 pt-12">
                    <View className="w-full items-end px-5">
                        <TouchableOpacity onPress={handleCloseSidebar} style={{ padding: 4, alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name="close-circle-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-1 px-5 pb-10">
                        <View className="flex-1 h-full">
                            <View className="px-4 py-6 flex-row gap-3 items-center justify-start border-b border-[#373737]">
                                <TouchableOpacity
                                    onPress={()=> rootNavigation.navigate('profile')}
                                    style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 8, height: '100%', width: '100%' }}
                                >
                                    <Feather name="user" size={24} color="white" />
                                    <Text className="text-white text-xl">Meu perfil</Text>
                                </TouchableOpacity>

                            </View>
                            <View className="px-4 py-6 flex-row gap-3 items-center justify-start border-b border-[#373737]">
                                <TouchableOpacity
                                    onPress={()=> rootNavigation.navigate('points')}
                                    style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 8, height: '100%', width: '100%' }}
                                >
                                    <Feather name="star" size={24} color="white" />
                                    <Text className="text-white text-xl">Pontos</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex-1 h-full justify-end">
                            <View className="px-4 py-6 flex-row gap-3 items-center justify-start border-b border-[#373737]">
                                <TouchableOpacity
                                    style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 8, height: '100%', width: '100%' }}
                                >
                                    <AiIcon size={24} color="white" />
                                    <Text className="text-white text-xl">Sobre nós</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="px-4 py-6 flex-row gap-3 items-center justify-start border-b border-[#373737]">
                                <TouchableOpacity
                                    style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 8, height: '100%', width: '100%' }}
                                >
                                    <Feather name="help-circle" size={24} color="white" />
                                    <Text className="text-white text-xl">Ajuda</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="px-4 py-6 flex-row gap-3 items-center justify-start border-b border-[#373737]">
                                <TouchableOpacity
                                    style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 8, height: '100%', width: '100%' }}
                                    onPress={() => {
                                        rootNavigation.dispatch(
                                            CommonActions.reset({
                                                index: 1,
                                                routes: [{ name: 'signin' }],
                                            })
                                        );
                                    }}
                                >
                                    <LogoutIcon size={24} color="white" />
                                    <Text className="text-white text-xl">Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}
