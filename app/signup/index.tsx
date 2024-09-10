import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    Image, Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView,
    Text, TouchableHighlight, View, StyleSheet,
    TouchableOpacity
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import Input from '@/components/input';
import { Link } from 'expo-router';

export default function Signup_Step_0() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { t } = useLocale();

    return (
        <SafeAreaView style={styles.safeareaview}>
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>

                        <View style={styles.header}>
                            <Text style={styles.headerText}>{t('signup.signup_step_0.header')}</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputSubContainer}>

                                <View style={styles.inputGroup}>
                                    <Input
                                        label={t('signup.signup_step_0.email')}
                                        type={'email'}
                                        onChange={(text: string) => setEmail(text)}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Input
                                        label={t('signup.signup_step_0.password')}
                                        type={'password'}
                                        onChange={(text: string) => setPassword(text)}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Input
                                        label={t('signup.signup_step_0.confirmPassword')}
                                        type={'password'}
                                        onChange={(text: string) => setConfirmPassword(text)}
                                    />
                                </View>
                            </View>

                            <View style={[styles.buttonContainer]}
                            >
                                <Link href={{ pathname: '/signup/step2', params: { email: email, password: password } }} asChild>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.buttonWrapper}
                                    >
                                        <View style={styles.submitButton}>
                                            <Feather name="arrow-right" size={24} style={styles.icon} />
                                        </View>
                                    </TouchableOpacity>
                                </Link>
                                <View>
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
};

const windowHeight = Dimensions.get('window').height;
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
        height: '100%',
        justifyContent: 'space-between',

    },
    inputSubContainer: {
        flex: 0.5,
        gap: 50
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

});
