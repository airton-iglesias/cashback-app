import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/input';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import { getPasswordSchema, PasswordData } from '@/schemas/authSchemas';
import { SafeAreaView } from 'react-native-safe-area-context';


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
            //pass the data.password as parameter to the API call

            //{...}

            // The Timeout is to simulate an API call delay, you can remove it when making the API call
            // the parameter need to be a "string boolean", cause the parameter in router.push() don't accept boolean
            setTimeout(() => {
                setLoading(false);
                router.push({
                    pathname: '/resetPassword/resetPasswordCompleted',
                    params: {
                        RequestSuccessful: 'true'
                    },
                });
            }, 1000);

        }
        catch (error) {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flex: 1, paddingTop: 40 }}>
                    {/* Header section */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{t('recoveryDatas.newPasswordLabel')}</Text>
                    </View>
                    {/* End of header*/}

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
                        {/* Enf of password input field */}

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
                        {/* Enf of confirm password input field */}
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
                    {/* Enf of submit button */}
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
        paddingHorizontal: 15
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
});
