import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import Select from '../components/select';
import SelectOption from '../components/selectOption';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, CommonActions } from "@react-navigation/native";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {

    const rootNavigation = useNavigation<RootNavigationProp>();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const countryOptions = [
        { id: 1, text: 'Portugal', flag: 'PT' },
        { id: 2, text: 'Brasil', flag: 'BR' },
        { id: 3, text: 'Estados Unidos', flag: 'US' },

    ];
    const currencyOptions = [
        { id: 1, text: 'EUR', flag: 'EU' },
        { id: 2, text: 'BRL', flag: 'BR' },
        { id: 3, text: 'USD', flag: 'US' },
    ];


    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [codeBonus, setCodeBonus] = useState<string>('');

    const [inputNameIsFocus, setInputNameIsFocus] = useState(false);
    const [inputNameError, setInputNameError] = useState(false);
    const [inputCodeBonusIsFocus, setInputCodeBonusIsFocus] = useState(false);
    const [inputCodeBonusError, setInputCodeBonusError] = useState(false);


    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setImage(pickerResult.assets[0].uri);
        }
    };


    const handleNameChange = (text: string) => {
        setName(text);
    }

    const handleBonusCodeChange = (text: string) => {
        setCodeBonus(text)
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1 h-screen flex flex-col items-center px-5 pt-14">
                        <View className='flex-row justify-between w-full'>
                            <TouchableOpacity
                                onPress={()=> rootNavigation.goBack()}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 4

                                }}
                            >
                                <Ionicons name="chevron-back" size={20} color="black" />
                                <Text className='text-2xl font-normal'> Voltar</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 4

                                }}
                            >
                                <Text className='text-2xl font-normal text-blue-500'>Salvar</Text>
                                <Feather name="check" size={24} color="#0D6EFD" />
                            </TouchableOpacity>
                        </View>
                        <View className='h-48 w-full flex justify-center items-center'>
                            <TouchableWithoutFeedback onPress={handleImagePick} style={{ borderRadius: 8 }}>
                                {image ? (
                                    <View>
                                        <Image source={{ uri: image }} className="text-xl h-32 w-32 border border-gray-100 font-bold bg-gray-200 p-12 rounded-full" />
                                        <View className='absolute -bottom-4 -right-2 w-12 h-12 bg-gray-200 border-4 border-neutral-100  rounded-full justify-center items-center'>
                                            <Feather name="camera" size={20} color="black" />
                                        </View>
                                    </View>
                                ) : (
                                    <View>
                                        <Image source={require("../assets/icons/user-icon.png")} className="text-xl h-32 w-32 border border-gray-100 font-bold bg-gray-200 p-12 rounded-full" />
                                        <View className='absolute -bottom-4 -right-2 w-12 h-12 bg-gray-200 border-4 border-neutral-100  rounded-full justify-center items-center'>
                                            <Feather name="camera" size={20} color="black" />
                                        </View>
                                    </View>
                                )}
                            </TouchableWithoutFeedback>
                        </View>

                        <View className={"w-full gap-2"}>
                            <Text className={"text-2xl font-normal"}>
                                Nome
                            </Text>
                            <View className={"relative justify-center items-center"}>
                                <View className={`${inputNameIsFocus ? '' : 'hidden'} absolute border-4 w-[26.1rem] h-[4.07rem] rounded-xl ${inputNameError ? 'border-[#DC3545] opacity-20' : 'border-[#6610F2] opacity-15'} rounded-lg`}></View>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    onFocus={() => {
                                        setInputNameIsFocus(true);
                                    }}
                                    onBlur={() => {
                                        setInputNameIsFocus(false);
                                    }}
                                    onChangeText={handleNameChange}
                                    value={name}
                                    className={`border rounded-lg w-full h-14 ${inputNameIsFocus ? inputNameError ? 'border-[#DC3545]' : 'border-black' : inputNameError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>

                        <View className="justify-center items-center mt-4">
                            <View className="w-full gap-2">
                                <Text className="text-2xl font-normal">
                                    País
                                </Text>
                                <Select
                                    options={countryOptions}
                                    onChangeSelect={(id: number) => console.log(id)}
                                    text={'Selecione o país'}
                                    SelectOption={SelectOption}
                                />
                            </View>

                            <View className="w-full gap-2 mt-4">
                                <Text className="text-2xl font-normal">
                                    Moeda
                                </Text>
                                <Select
                                    options={currencyOptions}
                                    onChangeSelect={(id: number) => console.log(id)}
                                    text={'Selecione a moeda'}
                                    SelectOption={SelectOption}
                                />
                            </View>
                        </View>

                        <View className={"w-full mt-4"}>
                            <View className='relative flex flex-row justify-between'>
                                <Text className={"text-2xl font-normal"}>
                                    Código Bonus
                                </Text>
                                <Text className={"bottom-1 text-md bg-gray-200 text-gray-600 p-2 font-semibold rounded-lg"}>
                                    Opcional
                                </Text>
                            </View>
                            <View className={"relative justify-center items-center"}>
                                <View className={`${inputCodeBonusIsFocus ? '' : 'hidden'} absolute border-4 w-[26.1rem] h-[4.07rem] rounded-xl ${inputCodeBonusError ? 'border-[#DC3545] opacity-20' : 'border-[#6610F2] opacity-15'} rounded-lg`}></View>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    onFocus={() => {
                                        setInputCodeBonusIsFocus(true);
                                    }}
                                    onBlur={() => {
                                        setInputCodeBonusIsFocus(false);
                                    }}
                                    onChangeText={handleBonusCodeChange}
                                    value={codeBonus}
                                    className={`border rounded-lg w-full h-14 ${inputCodeBonusIsFocus ? inputCodeBonusError ? 'border-[#DC3545]' : 'border-black' : inputCodeBonusError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>
                        <View className={"w-full mt-4"}>
                            <View className='relative flex flex-row justify-between border-b border-[#D2D2D2] pb-2'>
                                <Text className={"text-2xl font-normal"}>
                                    Localização
                                </Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                            <View className={"relative flex-row justify-between items-center border-b border-[#D2D2D2] py-4"}>
                                <Text className='text-blue-500 text-2xl font-normal'>Alterar Pin</Text>
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                            <View className={"relative flex-row justify-between items-center border-b border-[#D2D2D2] py-4"}>
                                <Text className='text-blue-500 text-2xl font-normal'>Alterar Password</Text>
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
