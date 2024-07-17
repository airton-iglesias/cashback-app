import { useState, useEffect } from "react";
import {
    Image, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback,
    View, KeyboardAvoidingView, ScrollView, Keyboard
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AuthStackParamList, RootStackParamList } from '../types/navigationTypes';
import CheckBox from "../components/checkbox";

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SigninScreen() {
    const authNavigation = useNavigation<AuthNavigationProp>();
    const rootNavigation = useNavigation<RootNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [inputEmailIsFocus, setInputEmailIsFocus] = useState(false);
    const [inputEmailError, setInputEmailError] = useState(false);
    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);

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

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(email)) {
            return true;
        }
        setInputEmailError(true);
        return false;
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (text.trim() === '') {
            setInputEmailError(false);
        } else {
            setInputEmailError(!validateEmail(text));
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() === '') {
            setInputPasswordError(false);
        } else {
            setInputPasswordError(!validatePassword(text));
        }
    };

    const handleCheck = () => {
        setChecked(!isChecked);
    };

    const handleSubmit = () => {
        rootNavigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Root' }],
            })
        );

    };

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1 h-screen flex flex-col items-center">
                        <View className={`${keyboardVisible ? 'hidden' : ''} flex w-full top-14 h-52 p-5`}>
                            <View className="w-full h-full bg-neutral-200 flex justify-center items-center rounded-2xl">
                                <Text className="text-6xl font-bold">LOGO</Text>
                            </View>
                        </View>

                        <View className="w-full p-5 mt-16">
                            <Text className="text-5xl font-bold">Iniciar sessão</Text>
                        </View>

                        <View className="w-full mt-1 gap-2">
                            <Text className="text-2xl px-5 font-normal">
                                Email ou Telemovel
                            </Text>
                            <View className="relative px-5 justify-center items-center">
                                <View className={`${inputEmailIsFocus ? '' : 'hidden'} absolute border-4 w-[26.1rem] h-[4.07rem] rounded-xl ${inputEmailError ? 'border-[#DC3545] opacity-20' : 'border-[#6610F2] opacity-15'} rounded-lg`}></View>
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

                        <View className="w-full mt-1 gap-2 mt-4">
                            <Text className="text-2xl px-5 font-normal">
                                Password
                            </Text>
                            <View className="relative px-5 justify-center items-center">
                                <View className={`${inputPasswordIsFocus ? '' : 'hidden'} absolute border-4 w-[26.1rem] h-[4.07rem] rounded-xl ${inputPasswordError ? 'border-[#DC3545] opacity-20' : 'border-[#6610F2] opacity-15'} rounded-lg`}></View>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    onFocus={() => setInputPasswordIsFocus(true)}
                                    onBlur={() => setInputPasswordIsFocus(false)}
                                    onChangeText={handlePasswordChange}
                                    value={password}
                                    secureTextEntry={true}
                                    className={`border rounded-lg w-full h-14 ${inputPasswordIsFocus ? inputPasswordError ? 'border-[#DC3545]' : 'border-black' : inputPasswordError ? 'border-[#DC3545]' : 'border-gray-300'} px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>

                        <View className="flex flex-row items-center px-5 gap-3 w-full h-20">
                            <CheckBox
                                label="Esse é um checkbox"
                                labelStyle={{ color: '#fff', fontSize: 16 }}
                                iconColor="#fff"
                                checkColor="#fff600"
                                value={isChecked}
                                onChange={handleCheck}
                            />
                            <Text className="text-2xl mb-0.5">Manter-me conectado</Text>
                        </View>

                        <View className={`flex-1 w-full h-full px-5 flex flex-col ${keyboardVisible ? 'justify-start' : 'justify-end'} gap-5 pb-8`}>
                            <View className="flex w-full">
                                <TouchableHighlight onPress={handleSubmit}
                                    underlayColor="#e5e7eb"
                                    activeOpacity={0.6}
                                    style={{ borderRadius: 8 }}
                                >
                                    <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                        <FontAwesomeIcon style={{ color: 'white', padding: 11 }} icon={faArrowRight} />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View className=" w-full">
                                <TouchableHighlight
                                    underlayColor="#e5e7eb"
                                    activeOpacity={0.6}
                                    style={{ borderRadius: 8 }}
                                >
                                    <View className="flex flex-row gap-2 bg-neutral-200 h-14 w-full justify-center items-center p-4 rounded-lg">
                                        <Image source={require("../assets/icons/google-icon.png")} className="w-8 h-8" />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View className="w-full items-center">
                                <TouchableWithoutFeedback onPress={() => authNavigation.navigate('signup')}>
                                    <Text className="text-2xl text-blue-500">Criar nova conta</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View className="w-full items-center">
                                <TouchableWithoutFeedback onPress={() => authNavigation.navigate('signup')}>
                                    <Text className="text-2xl text-blue-500">Esqueceu sua senha?</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
