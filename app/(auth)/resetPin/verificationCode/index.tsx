import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Octicons, Feather } from '@expo/vector-icons';
import Input from "@/components/input";
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getEmailVerificationSchema, EmailVerificationData } from '@/schemas/authSchemas';
import { fontSize } from "@/constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationCode() {

    const [code, setCode] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [codeError, setCodeError] = useState<boolean>(false);
    const { t } = useLocale();

    const signInSchema = React.useMemo(() => getEmailVerificationSchema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<EmailVerificationData>({
        resolver: zodResolver(signInSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: EmailVerificationData) => {
        setLoading(true);
        // make the request to the API here
        //email code to pass in the params of request
        console.log(data.code)

        // if the request is successful, navigate to the next screen passing the sentence as a param
        setTimeout(() => {
            setLoading(false);
            router.replace("/resetPin/pin");
        }, 1000);
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{t("signup.verificationCode.title")}</Text>
                    </View>

                    {/* Error Message */}
                    {codeError && (
                        <View style={styles.errorMessageContainer}>
                            <View style={styles.errorMessageWrapper}>
                                <Text style={styles.errorMessage}>{t('signup.verificationCode.wrongCode')}</Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.inputWrapper}>

                        <Controller
                            control={control}
                            name="code"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label={t('signup.verificationCode.subtitle')}
                                    onChange={(text: string) => {
                                        onChange(text);
                                    }}
                                    onBlur={onBlur}
                                    value={value}
                                    type="numeric"
                                    error={errors.code?.message}
                                    keyboardType={'numeric'}
                                    maxLength={6}
                                />
                            )}
                        />
                    </View>
                </View>
                <View style={styles.resendCodeContainer}>
                    <Text style={{ fontSize: fontSize.labels.medium }}>{t("signup.verificationCode.dontReceiveCode")}</Text>
                    <TouchableOpacity>
                        <Text style={{ color: '#1E40AF', fontSize: fontSize.labels.medium }}>{t("signup.verificationCode.resendCode")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
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
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 40,
        backgroundColor: 'white'
    },
    headerContainer: {

    },
    headerText: {
        fontSize: fontSize.titles.medium,
        fontWeight: '700',
        left: 15,
        marginBottom: 4
    },
    inputWrapper: {
        paddingHorizontal: 15,
        marginTop: 15
    },
    buttonContainer: {
        flex: 0.2,
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 8,
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        marginBottom: 15
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
    resendCodeContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 15,
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50
    },
    errorMessageContainer: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 20
    },
    errorMessageWrapper: {
        borderRadius: 10,
        backgroundColor: '#F8D7DA',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessage: {
        textAlign: 'center',
        color: '#B02A37',
    }
});