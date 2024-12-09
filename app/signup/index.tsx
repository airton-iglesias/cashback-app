import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/input';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import { getSignUpSchema, SignUpData } from '@/schemas/authSchemas';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp() {
    // State variables for loading state
    const [loading, setLoading] = useState(false);

    // Translation function
    const { t } = useLocale();

    /// React Hook Form setup
    const signUpStep1Schema = React.useMemo(() => getSignUpSchema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        resolver: zodResolver(signUpStep1Schema),
        mode: 'onChange',
    });

    // Function to handle form submission
    const onSubmit = async (data: SignUpData) => {
        router.push({
            pathname: '/signup/userInfos',
            params: {
                email: data.email,
                password: data.password,
            },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    {/* Header section */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{t('signup.begin.header')}</Text>
                    </View>
                    {/* End of header section */}

                    {/* Form section */}
                    <View style={styles.form}>
                        {/* Email input field */}
                        <View style={styles.inputGroup}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        label={t('signup.begin.email')}
                                        onChange={(text: string) => onChange(text.toLowerCase())}
                                        onBlur={onBlur}
                                        value={value || ''}
                                        type="email"
                                        error={errors.email?.message}
                                    />
                                )}
                            />
                        </View>
                        {/* Enf of email input field */}

                        {/* Password input field */}
                        <View style={styles.inputGroup}>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        label={t('signup.begin.password')}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value || ''}
                                        type="password"
                                        error={errors.password?.message}
                                    />
                                )}
                            />
                        </View>
                        {/* Enf of password input field */}

                        {/* Confirm password input field */}
                        <View style={styles.inputGroup}>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        label={t('signup.begin.confirmPassword')}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value || ''}
                                        type="password"
                                        error={errors.confirmPassword?.message}
                                    />
                                )}
                            />
                        </View>
                        {/* Enf of confirm password input field */}
                    </View>
                    {/* End of form section */}
                </View>

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
                            <Feather name="arrow-right" size={24} color="white" />
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
                    {/* Enf of Google Sign-In button */}
                </View>
                {/* End of button container */}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        height: '100%'
    },
    form: {
        gap: 10,
        flex: 1,
        marginBottom: 30,
        paddingHorizontal: 15
    },
    header: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 15
    },
    headerText: {
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        marginTop: 1,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'flex-end',
        paddingBottom: 35,
        paddingHorizontal: 15,
        zIndex: 10
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
});
