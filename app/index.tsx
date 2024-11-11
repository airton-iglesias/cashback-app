import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Text,
    TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet,
    Platform, ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getSignInSchema, SignInData } from '@/schemas/authSchemas';
import CheckBox from '@/components/checkbox';
import Input from '@/components/input';
import LanguageModal from '@/components/languageModal';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StorageService } from '@/services/storageService';

export default function SigninScreen() {
    // State variables for UI 
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [requestError, setRequestError] = useState<boolean>(false);

    // Translation function
    const { t } = useLocale();

    // React Hook Form setup
    const signInSchema = React.useMemo(() => getSignInSchema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        mode: 'onChange',
    });

    // Effect to handle keyboard visibility changes
    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardIsVisible(true));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardIsVisible(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    // Effect to display the language modal after a delay
    useEffect(() => {
        const timer = setTimeout(async () => {
            const userLanguage = await StorageService.getItem('USER_LANGUAGE');
            if (!userLanguage) {
                setModalVisible(true);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const onSubmit = async (data: SignInData) => {
        if (requestError) {
            setRequestError(!requestError);
        }
        setLoading(true);

        try {
            // Make the request to API here. The params is data.email and data.password

            // After successful authentication
            // Check if the user has a valid 17-word phrase in storage
            const walletPhrase = await StorageService.getItem('walletPhrase');

            //console.log(walletPhrase)

            // The Timeout is to simulate an API call delay, you can remove it when making the API call
            setTimeout(() => {
                if (walletPhrase) {
                    setLoading(false);
                    router.push({
                        pathname: "/signinSuccess",
                        params: {
                            RequestSuccessful: 'true'
                        },
                    });
                    return;
                }

                setLoading(false);
                // If no valid 17-word phrase is found
                router.replace('/walletRecovery');
            }, 2000)
        }
        catch (error) {
            setLoading(false);
            setRequestError(true);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Modal for language selection */}
            <LanguageModal
                modalVisible={modalVisible}
                handleCloseModal={() => setModalVisible(!modalVisible)}
            />
            {/* End of language modal */}

            {/* Logo section, hidden when the keyboard is visible */}
            {!keyboardIsVisible && (
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Image
                            source={require('@/assets/images/logo-light.png')}
                            resizeMode="contain"
                            style={styles.logoImage}
                        />
                    </View>
                </View>
            )}
            {/* End of logo section */}

            {/* Error message section */}
            {requestError && (
                <View style={[styles.errorMessageContainer, keyboardIsVisible && { marginTop: 20 }]}>
                    <View style={styles.errorMessageWrapper}>
                        <Text style={styles.errorMessage}>{t("signin.InvalidCrentials")}</Text>
                    </View>
                </View>
            )}
            {/* End of error message section */}

            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Main content */}
                    <View style={styles.contentWrapper}>
                        {/* Form */}
                        <View>
                            {/* Title */}
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{t('signin.header')}</Text>
                            </View>
                            {/* End of Title */}

                            <View style={styles.form}>
                                {/* Email input field */}
                                <View style={styles.inputGroup}>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label={t('signin.email')}
                                                onChange={(text: string) => {
                                                    onChange(text.toLowerCase());
                                                }}
                                                onBlur={onBlur}
                                                value={value}
                                                type="email"
                                                error={errors.email?.message}
                                                keyboardType={"email-address"}
                                            />
                                        )}
                                    />
                                </View>
                                {/* End of email input field */}


                                {/* Password input field */}
                                <View style={styles.inputGroup}>
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label={t('signin.password')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                type="password"
                                                error={errors.password?.message}
                                            />
                                        )}
                                    />
                                </View>
                                {/* End of password input field */}

                                {/* "Keep me logged in" checkbox */}
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        labelStyle={{ color: '#fff000', fontSize: 16 }}
                                        iconColor="#fff"
                                        checkColor="#fff600"
                                        value={isChecked}
                                        onChange={() => setChecked(!isChecked)}
                                    />
                                    <Text style={styles.checkboxLabel}>{t('signin.keepLogged')}</Text>
                                </View>
                                {/* End ofKeep me logged in input field */}
                            </View>
                        </View>
                        {/* End of Form */}

                        {/* Button container */}
                        <View style={styles.buttonContainer}>
                            {/* Submit button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.buttonWrapper}
                                onPress={handleSubmit(onSubmit)}
                                disabled={loading}
                            >
                                <View style={styles.submitButton}>
                                    {loading ? (
                                        <ActivityIndicator size={24} color="#fff" />
                                    ) : (
                                        <Feather name="arrow-right" size={24} color="white" />
                                    )}
                                </View>
                            </TouchableOpacity>
                            {/* End of submit button */}

                            {/* Google Sign-In button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.buttonWrapper}
                                disabled={loading}
                            >
                                <View style={styles.googleButton}>
                                    <Image
                                        source={require('@/assets/icons/google-icon.png')}
                                        style={styles.googleIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                            {/* End of Google Sign-In button */}

                            {/* Links for sign-up and password recovery */}
                            <View style={styles.linkWrapper}>
                                {/* Link to the sign-up screen */}
                                <Link href="/signup" asChild>
                                    <TouchableWithoutFeedback>
                                        <Text style={styles.link}>{t('signin.createAccount')}</Text>
                                    </TouchableWithoutFeedback>
                                </Link>
                                {/* End of link to the sign-up screen */}

                                {/* Link to the password recovery screen */}
                                <Link
                                    href={{ pathname: '/resetPassword', params: { type: 'password' } }}
                                    asChild
                                >
                                    <TouchableWithoutFeedback>
                                        <Text style={styles.link}>{t('signin.forgotPassword')}</Text>
                                    </TouchableWithoutFeedback>
                                </Link>
                                {/* End of link to the password recovery screen */}
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 35,
    },
    contentWrapper: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    form: {
        marginTop: 20
    },
    header: {
        marginTop: 20,
    },
    headerText: {
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
    },
    inputGroup: {
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        fontSize: fontSize.labels.medium,
        marginLeft: 5,
    },
    buttonContainer: {
        width: '100%',
        alignSelf: 'flex-end',
    },
    buttonWrapper: {
        borderRadius: 8,
        marginBottom: 15,
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
        marginTop: 15,
        alignItems: 'center',
    },
    link: {
        fontSize: fontSize.labels.medium,
        color: '#1E40AF',
        marginBottom: 10,
    },
    logoContainer: {
        width: '100%',
        height: 150,
        padding: 5,
        marginTop: 40,
    },
    logo: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    logoImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    errorMessageContainer: {
        width: '100%',
        height: 60,
        paddingHorizontal: 15
    },
    errorMessageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#F8D7DA',
        marginBottom: 10,
        height: '100%',
        width: '100%'
    },
    errorMessage: {
        textAlign: 'center',
        color: '#B02A37',
    },
});

