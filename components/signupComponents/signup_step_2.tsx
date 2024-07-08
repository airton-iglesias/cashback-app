import React, { useState } from 'react';
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SignupStackParamList } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Feather } from '@expo/vector-icons';
import Select from '../select';
import SelectOption from '../selectOption';

type SignupStep2NavigationProp = NativeStackNavigationProp<SignupStackParamList, 'SignupStep2'>;

export default function SignupStep2({ route }:any) {

    const signupNavigation = useNavigation<SignupStep2NavigationProp>();

    const { email, password } = route.params;

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
    const [country, setCountry] = useState<number>(0);
    const [currency, setCurrency] = useState<number>(0);

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

    const handleNextStep = () => {
        signupNavigation.navigate('SignupStep3', { email, password, country, currency, image });
    };

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1 h-screen flex flex-col items-center px-5 pt-14">
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
                                        <Image source={require("../../assets/user-icon.png")} className="text-xl h-32 w-32 border border-gray-100 font-bold bg-gray-200 p-12 rounded-full" />
                                        <View className='absolute -bottom-4 -right-2 w-12 h-12 bg-gray-200 border-4 border-neutral-100  rounded-full justify-center items-center'>
                                            <Feather name="camera" size={20} color="black" />
                                        </View>
                                    </View>
                                )}
                            </TouchableWithoutFeedback>
                        </View>

                        <View className={"w-full mt-1 gap-2 mt-4"}>
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
                                    className={`border-2 rounded-lg w-full h-14 ${inputNameIsFocus ? inputNameError ? 'border-[#DC3545]' : 'border-black' : inputNameError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>

                        <View className="flex-1 justify-center items-center">
                            <View className="w-full mt-1 gap-2 mt-4">
                                <Text className="text-2xl font-normal">
                                    País
                                </Text>
                                <Select
                                    options={countryOptions} 
                                    onChangeSelect={(id: number) => setCountry(id)}
                                    text={'Selecione o país'}
                                    SelectOption={SelectOption}
                                />
                            </View>
                            
                            <View className="w-full mt-1 gap-2 mt-4">
                                <Text className="text-2xl font-normal">
                                    Moeda
                                </Text>
                                <Select
                                    options={currencyOptions} 
                                    onChangeSelect={(id: number) => setCurrency(id)}
                                    text={'Selecione a moeda'}
                                    SelectOption={SelectOption}
                                />
                            </View>
                        </View>

                        <View className={"w-full mt-1 gap-0 mt-4"}>
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
                                    className={`border-2 rounded-lg w-full h-14 ${inputCodeBonusIsFocus ? inputCodeBonusError ? 'border-[#DC3545]' : 'border-black' : inputCodeBonusError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>
                        <View className={`flex-1 w-full h-full px-5 flex flex-col justify-end gap-5 `}>
                            <View className="flex w-full">
                                <TouchableHighlight
                                    underlayColor="#e5e7eb"
                                    activeOpacity={0.6}
                                    style={{ borderRadius: 8 }}
                                    onPress={handleNextStep}
                                >
                                    <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                        <FontAwesomeIcon style={{ color: 'white', padding: 11 }} icon={faArrowRight} />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
