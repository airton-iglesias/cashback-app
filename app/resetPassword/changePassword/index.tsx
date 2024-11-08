import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/input';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import { getPasswordSchema, PasswordData } from '@/schemas/authSchemas';


export default function SignUp() {
    // State variables for loading state
    const [loading, setLoading] = useState(false);

    // Translation function
    const { t } = useLocale();

    // React Hook Form setup
    const passwordSchema = React.useMemo(() => getPasswordSchema(t), [t]);
    const { control, handleSubmit, formState: { errors }, } = useForm<PasswordData>({
        resolver: zodResolver(passwordSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: PasswordData) => {
        setLoading(true);
        try {
            //Make the request to api here

            setTimeout(() => {
                setLoading(false);
                router.push({
                    pathname: '/resetPassword/resetPasswordCompleted',
                    params: {
                        RequestSuccessful: 'true'
                    },
                });
            }, 1000);

        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return (


        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.wrapper}>
                        <View>
                            {/* Header section */}
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{t('recoveryDatas.newPasswordLabel')}</Text>
                            </View>
                            {/* Form section */}
                            <View style={styles.form}>

                                {/* Password input field */}
                                <View style={styles.inputGroup}>
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label={t('recoveryDatas.password')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value || ''}
                                                type="password"
                                                error={errors.password?.message}
                                            />
                                        )}
                                    />
                                </View>
                                {/* Enf of component */}

                                {/* Confirm password input field */}
                                <View style={styles.inputGroup}>
                                    <Controller
                                        control={control}
                                        name="confirmPassword"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label={t('recoveryDatas.confirmPassword')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value || ''}
                                                type="password"
                                                error={errors.confirmPassword?.message}
                                            />
                                        )}
                                    />
                                </View>
                                {/* Enf of component */}
                            </View>
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
                                    {loading ?
                                        <ActivityIndicator size={24} color="#fff" />
                                        :
                                        <Feather name="arrow-right" size={24} color={'white'} />
                                    }
                                </View>
                            </TouchableOpacity>
                            {/* Enf of component */}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 70,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    form: {
        gap: 10,
        flex: 1,
        marginBottom: 30
    },
    header: {
        width: '100%',
        marginBottom: 15,
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
