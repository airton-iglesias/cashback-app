import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, CommonActions } from "@react-navigation/native";
import Topbar from '../components/header';
import InfoCloudIcon from '../assets/icons/infoCloudIcon';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Points() {

    const rootNavigation = useNavigation<RootNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView>
                <ScrollView className='relative'>
                    <Topbar />
                    <View className='relative'>
                        <View className='absolute right-6 top-4 items-center z-10'>
                            <TouchableOpacity style={{ flexDirection: 'row', gap: 5 }}
                                onPress={() => setModalVisible(true)}
                            >
                                <InfoCloudIcon size={26} color={'#3b82f6'} />
                                <Text className='text-blue-500 text-2xl'>Info</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="w-full py-8 px-6 items-center justify-center mt-4">
                            <View className='flex-row gap-2'>
                                <Feather name="star" size={13} color="gray" />
                                <Feather name="star" size={13} color="gray" />
                                <Feather name="star" size={13} color="black" />
                                <Feather name="star" size={13} color="gray" />
                                <Feather name="star" size={13} color="gray" />
                            </View>
                            <Text className="text-7xl font-bold mt-8">2.552</Text>
                        </View>
                        <View className="px-6 relative border-b pb-5 border-[#D8D8D8] bg-gray-100 pt-6 mt-2">
                            <View className="relative flex-row">
                                <Image source={require('../assets/images/sorveteria.png')} className="h-24 w-24" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da loja</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-green-100 p-1 w-24 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-green-800">Permanente</Text>
                                    </View>
                                </View>
                                <View className="absolute h-12 bg-[#B2B2B2] w-1 -bottom-12 left-11"></View>
                            </View>

                            <View className="relative flex-row mt-10">
                                <Image source={require('../assets/images/sorveteria2.png')} className="h-24 w-24 rounded-full" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da promoção</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-cyan-100 p-1 w-20 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-cyan-800">Promoção</Text>
                                    </View>
                                </View>
                                <View className="absolute h-12 bg-[#B2B2B2] w-1 -bottom-12 left-11"></View>
                            </View>

                            <View className="relative flex-row mt-10">
                                <Image source={require('../assets/images/sorveteria3.png')} className="h-24 w-24 rounded-full" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome do evento</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-yellow-100 p-1 w-16 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-yellow-800">Evento</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="py-8 px-6 relative">
                            <View className="relative flex-row ">
                                <Image source={require('../assets/images/bar1.png')} className="h-24 w-24" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da loja</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-green-100 p-1 w-24 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-green-800">Permanente</Text>
                                    </View>
                                </View>

                            </View>
                            <View className="relative flex-row mt-10">
                                <Image source={require('../assets/images/bar2.png')} className="h-24 w-24 rounded-full" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da promoção</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-cyan-100 p-1 w-20 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-cyan-800">Promoção</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >


                    <View className='items-center pt-16'>
                        <View className='items-center'>
                            <View className='w-16 h-16 items-center justify-center bg-[#E5EFFF] rounded-lg'>
                                <InfoCloudIcon width={36} height={36} color={'#3b82f6'} />
                            </View>
                            <View className='items-center mt-6'>
                                <Text className='text-3xl text-blue-600'>Vantagens dos</Text>
                                <Text className='text-3xl text-blue-600'>Pontos na Promoção</Text>
                            </View>
                        </View>

                        <View className='gap-6 mt-6'>
                            <View className='items-center'>
                                <Text className='text-gray-600 font-bold text-xl'>Dedução de Pontos</Text>
                                <Text className='text-gray-600 text-xl text-center'>1 ponto é retirado a cada apresentação.</Text>
                            </View>
                            <View className='items-center'>
                                <Text className='text-teal-600 font-bold text-xl'>Adição de Pontos</Text>
                                <Text className='text-gray-600 text-xl text-center'>1 ponto é adicionado a cada $0.01 em créditos movimentados.</Text>
                            </View>
                        </View>
                    </View>

                </Modal>


            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
