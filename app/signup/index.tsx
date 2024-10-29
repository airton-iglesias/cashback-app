import React, { useState } from 'react';
import {
    Image, Dimensions, KeyboardAvoidingView, SafeAreaView,
    Text, View, StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import Input from '@/components/input';
import { router } from 'expo-router';
import { fontSize } from '@/constants/fonts';

export default function Signup_Step_0() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const { t } = useLocale();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (password === confirmPassword) {
            /* make the request to the API here
            Example: 
            
            const loginReponse = await
                fetch('domain of application here', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .catch((error) => {
                    console.log(error)
                });
            */
        }
        setTimeout(() => {
            setLoading(false);
            router.navigate("/signup/step2");
        }, 1000);
    }

    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <View style={styles.scrollViewContent}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>{t('signup.signup_step_0.header')}</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('signup.signup_step_0.email')}
                            onChange={(text: string) => setEmail(text)}
                            type={'email'}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('signup.signup_step_0.password')}
                            onChange={(text: string) => setPassword(text)}
                            type={'password'}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('signup.signup_step_0.confirmPassword')}
                            onChange={(text: string) => setConfirmPassword(text)}
                            type={'password'}
                        />
                    </View>

                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <View style={styles.submitButton}>
                            {loading ?
                                <ActivityIndicator size={24} color="#fff" />
                                :
                                <Feather name="arrow-right" size={24} color={'white'} />
                            }
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                        disabled={loading}
                    >
                        <View style={styles.googleButton}>
                            <Image source={require("@/assets/icons/google-icon.png")} style={styles.googleIcon} />
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 70,
        paddingBottom: 35
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        gap: 10
    },
    header: {
        width: '100%',
        marginBottom: 15
    },
    headerText: {
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        marginTop: 1,
    },
    label: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 8,
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
    linkWrapper: {
        gap: 15,
        height: 56,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
        marginTop: 15
    },
});
