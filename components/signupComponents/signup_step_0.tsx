import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Image, Dimensions, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignupStackParamList } from '../../types/navigationTypes';
import { Feather } from '@expo/vector-icons';
import { useLocale } from '../../contexts/TranslationContext';

type SignupStep1NavigationProp = NativeStackNavigationProp<SignupStackParamList>;

const windowHeight = Dimensions.get('window').height;

export default function Signup_Step_0() {
    const { t } = useLocale();
    const signupNavigation = useNavigation<SignupStep1NavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [inputEmailIsFocus, setInputEmailIsFocus] = useState(false);
    const [inputEmailError, setInputEmailError] = useState(false);
    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);
    const [inputConfirmPasswordIsFocus, setInputConfirmPasswordIsFocus] = useState(false);
    const [inputConfirmPasswordError, setInputConfirmPasswordError] = useState(false);

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
        <SafeAreaView style={styles.safeareaview}>
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>

                        <View style={styles.header}>
                            <Text style={styles.headerText}>{t('signup_step_0.header')}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputSubContainer}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>{t('signup_step_0.email')}</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[
                                            styles.inputHighlight,
                                            inputEmailIsFocus && styles.inputHighlightVisible,
                                            inputEmailError && styles.inputErrorHighlight
                                        ]}></View>
                                        <TextInput
                                            cursorColor={'#ADB5BD'}
                                            onFocus={() => setInputEmailIsFocus(true)}
                                            onBlur={() => setInputEmailIsFocus(false)}
                                            onChangeText={handleEmailChange}
                                            style={[
                                                styles.input,
                                                inputEmailIsFocus && (inputEmailError ? styles.inputError : styles.inputFocused),
                                                inputEmailError && styles.inputError
                                            ]}
                                            keyboardType={'email-address'}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>{t('signup_step_0.password')}</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[
                                            styles.inputHighlight,
                                            inputPasswordIsFocus && styles.inputHighlightVisible,
                                            inputPasswordError && styles.inputErrorHighlight
                                        ]}></View>
                                        <TextInput
                                            cursorColor={'#ADB5BD'}
                                            onFocus={() => setInputPasswordIsFocus(true)}
                                            onBlur={() => setInputPasswordIsFocus(false)}
                                            onChangeText={handlePasswordChange}
                                            value={password}
                                            secureTextEntry={true}
                                            style={[
                                                styles.input,
                                                inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                                inputPasswordError && styles.inputError
                                            ]}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>{t('signup_step_0.confirmPassword')}</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[
                                            styles.inputHighlight,
                                            inputConfirmPasswordIsFocus && styles.inputHighlightVisible,
                                            inputConfirmPasswordError && styles.inputErrorHighlight
                                        ]}></View>
                                        <TextInput
                                            cursorColor={'#ADB5BD'}
                                            onFocus={() => setInputConfirmPasswordIsFocus(true)}
                                            onBlur={() => setInputConfirmPasswordIsFocus(false)}
                                            onChangeText={handleConfirmPasswordChange}
                                            value={confirmPassword}
                                            secureTextEntry={true}
                                            style={[
                                                styles.input,
                                                inputConfirmPasswordIsFocus && (inputConfirmPasswordError ? styles.inputError : styles.inputFocused),
                                                inputConfirmPasswordError && styles.inputError
                                            ]}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.buttonContainer]}
                            >
                                <View style={styles.fullWidth}>
                                    <TouchableHighlight onPress={handleNextStep}
                                        underlayColor="#e5e7eb"
                                        activeOpacity={0.6}
                                        style={styles.buttonWrapper}
                                    >
                                        <View style={styles.submitButton}>
                                            <Feather name="arrow-right" size={24} style={styles.icon} />
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.fullWidth}>
                                    <TouchableHighlight
                                        underlayColor="#e5e7eb"
                                        activeOpacity={0.6}
                                        style={styles.buttonWrapper}
                                    >
                                        <View style={styles.googleButton}>
                                            <Image source={require("../../assets/icons/google-icon.png")} style={styles.googleIcon} />
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeareaview: {
        backgroundColor: 'white', 
        height: '100%'
    },
    container: {
        flex: 1,
        height: windowHeight,
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingBottom: 30,
    },
    header: {
        width: '100%',
        height: 54,
        padding: 5,
        marginTop: 60,
        marginBottom: 4,
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    inputGroup: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 4,
        gap: 2,
    },
    label: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 4
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        height:  '100%',
        justifyContent: 'space-between',

    },
    inputSubContainer:{
        flex: 0.5,
        gap: 30
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
        borderRadius: 10,
        opacity: 0,
    },
    inputHighlightVisible: {
        opacity: 0.15,
        borderColor: '#6610F2',
    },
    inputErrorHighlight: {
        opacity: 0.20,
        borderColor: '#DC3545',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 48,
        fontSize: 20,
        color: '#ADB5BD',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10
    },
    inputFocused: {
        borderColor: '#000000',
    },
    inputError: {
        borderColor: '#DC3545',
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        height: windowHeight,
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'flex-end',
    },
    buttonWrapper: {
        borderRadius: 8,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    googleButton: {
        flexDirection: 'row',
        gap: 2,
        backgroundColor: '#E5E7EB',
        height: 52,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    googleIcon: {
        width: 32,
        height: 32,
    },
    icon: {
        color: 'white',
        padding: 11,
    },
    fullWidth: {
        width: '100%',
        justifyContent: 'flex-end'
    },
});
