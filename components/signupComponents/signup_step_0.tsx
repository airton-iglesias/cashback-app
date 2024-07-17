import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Image, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SignupStackParamList } from '../../types/navigationTypes';

type SignupStep1NavigationProp = NativeStackNavigationProp<SignupStackParamList>;

export default function Signup_Step_0() {

    const signupNavigation = useNavigation<SignupStep1NavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [inputEmailIsFocus, setInputEmailIsFocus] = useState(false);
    const [inputEmailError, setInputEmailError] = useState(false);
    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);
    const [inputConfirmPasswordIsFocus, setInputConfirmPasswordIsFocus] = useState(false);
    const [inputConfirmPasswordError, setInputConfirmPasswordError] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (text.trim() === '') {
            setInputEmailError(false);
        } else {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setInputEmailError(!re.test(text));
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() === '') {
            setInputPasswordError(false);
        } else {
            setInputPasswordError(text.length < 6);
        }
    };

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        if (text.trim() === '') {
            setInputConfirmPasswordError(false);
        } else {
            setInputConfirmPasswordError(text.length < 6);
        }
    };

    const handleNextStep = () => {
        signupNavigation.navigate('signup_step_1', { email, password });
    };

    return (
        <SafeAreaView className={"flex-1"}>
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className={"flex-1 h-screen flex flex-col items-center"}>

                        <View className={"w-full p-5 mt-20 mb-4"}>
                            <Text className={"text-5xl font-bold"}>Nova conta</Text>
                        </View>

                        <View className={"w-full mt-1 gap-2"}>
                            <Text className={"text-2xl px-5 font-normal"}>
                                Email ou Telemovel
                            </Text>
                            <View className={"relative px-5 justify-center items-center"}>
                                <View className={`${inputEmailIsFocus ? 'block' : 'hidden'} absolute border-4 w-[26.1rem] h-[4.07rem] rounded-xl ${inputEmailError ? 'border-[#DC3545] opacity-20' : 'border-[#6610F2] opacity-15'} rounded-lg`}></View>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    onFocus={() => setInputEmailIsFocus(true)}
                                    onBlur={() => setInputEmailIsFocus(false)}
                                    onChangeText={handleEmailChange}
                                    className={`border rounded-lg w-full h-14 ${inputEmailIsFocus ? inputEmailError ? 'border-[#DC3545]' : 'border-black' : inputEmailError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                    keyboardType={'email-address'}
                                />
                            </View>
                        </View>

                        <View className={"w-full mt-1 gap-2 mt-4"}>
                            <Text className={"text-2xl px-5 font-normal"}>
                                Password
                            </Text>
                            <View className={"relative px-5 justify-center items-center"}>
                                <View className={`${inputPasswordIsFocus ? 'block' : 'hidden'} absolute border-4 w-[26.1rem] h-[4.07rem] rounded-xl ${inputPasswordError ? 'border-[#DC3545] opacity-20' : 'border-[#6610F2] opacity-15'} rounded-lg`}></View>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    onFocus={() => setInputPasswordIsFocus(true)}
                                    onBlur={() => setInputPasswordIsFocus(false)}
                                    onChangeText={handlePasswordChange}
                                    className={`border rounded-lg w-full h-14 ${inputPasswordIsFocus ? inputPasswordError ? 'border-[#DC3545]' : 'border-black' : inputPasswordError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                    value={password}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>

                        <View className={"w-full mt-1 gap-2 mt-4"}>
                            <Text className={"text-2xl px-5 font-normal"}>
                                Confirme o Password
                            </Text>
                            <View className={"relative px-5 justify-center items-center"}>
                                <View className={`${inputConfirmPasswordIsFocus ? 'block' : 'hidden'} absolute border-4 w-[26.1rem] h-[4.07rem] rounded-xl ${inputConfirmPasswordError ? 'border-[#DC3545] opacity-20' : 'border-[#6610F2] opacity-15'} rounded-lg`}></View>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    onFocus={() => setInputConfirmPasswordIsFocus(true)}
                                    onBlur={() => setInputConfirmPasswordIsFocus(false)}
                                    onChangeText={handleConfirmPasswordChange}
                                    className={`border rounded-lg w-full h-14 ${inputConfirmPasswordIsFocus ? inputConfirmPasswordError ? 'border-[#DC3545]' : 'border-black' : inputConfirmPasswordError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                    value={confirmPassword}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>

                        <View className={`flex-1 flex w-full h-full px-5 flex flex-col ${keyboardVisible ? 'justify-start' : 'justify-end'} items-start gap-5 pb-8 mt-8`}>
                            <View className="w-full">
                                <TouchableHighlight onPress={handleNextStep}
                                    underlayColor="#e5e7eb"
                                    activeOpacity={0.6}
                                    style={{ borderRadius: 8 }}
                                >
                                    <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                        <FontAwesomeIcon style={{ color: 'white', padding: 11 }} icon={faArrowRight} />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View className="w-full">
                                <TouchableHighlight
                                    underlayColor="#e5e7eb"
                                    activeOpacity={0.6}
                                    style={{ borderRadius: 8 }}
                                >
                                    <View className="flex flex-row gap-2 bg-gray-200 h-14 w-full justify-center items-center p-4 rounded-lg">
                                        <Image source={require("../../assets/icons/google-icon.png")} className="w-8 h-8" />
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