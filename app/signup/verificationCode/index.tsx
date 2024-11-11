import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ActivityIndicator, Modal } from "react-native";
import { Fontisto, Feather } from '@expo/vector-icons';
import Input from "@/components/input";
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getCodeVerificationSchema, CodeVerificationData } from '@/schemas/authSchemas';
import { fontSize } from "@/constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageService } from '@/services/storageService';

export default function VerificationCode() {

    // State variables for UI 
    const [loading, setLoading] = useState<boolean>(false);
    const [codeError, setCodeError] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { t } = useLocale();

    // React Hook Form setup
    const signInSchema = React.useMemo(() => getCodeVerificationSchema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<CodeVerificationData>({
        resolver: zodResolver(signInSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: CodeVerificationData) => {
        setLoading(true);

        try {
            // Use data.code as parameter to make the request to the API here
            //console.log(data.code)
            // {...}

            // Temporary sentence to simulate the API response
            const sentence = "natureza brilho sonho pássaro estrela oceano força energia mundo futuro coragem vitória equilíbrio paz luz céu vida";
            await StorageService.setItem('walletPhrase', sentence);

            // if all is alright, navigate to the next screen passing the sentence as a param
            // The Timeout is to simulate an API call delay, you can remove it when making the API call
            setTimeout(() => {
                setLoading(false);
                router.push({
                    pathname: "/signup/sentenceWallet",
                    params: {
                        sentence: sentence,
                    },
                });
            }, 1000);
        } catch (error) {
            setLoading(false);
        }
    };

    // Function to handle the resend email code
    const resendEmailCode = () => {
        setIsModalVisible(!isModalVisible)
        // make the request to the API here

        //{...}
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    {/* Header */}
                    <View>
                        <Text style={styles.headerText}>{t("signup.verificationCode.title")}</Text>
                    </View>
                    {/* End of Header */}

                    {/* Error Message */}
                    {codeError && (
                        <View style={styles.errorMessageContainer}>
                            <View style={styles.errorMessageWrapper}>
                                <Text style={styles.errorMessage}>{t('signup.verificationCode.wrongCode')}</Text>
                            </View>
                        </View>
                    )}
                    {/* End of Error Message */}

                    {/* Verification code inputs */}
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
                    {/* end of Verification code inputs */}
                </View>

                {/* dont received email Button */}
                <View style={styles.resendCodeContainer}>
                    <Text style={{ fontSize: fontSize.labels.medium }}>{t("signup.verificationCode.dontReceiveCode")}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={resendEmailCode}>
                        <Text style={{ color: '#1E40AF', fontSize: fontSize.labels.medium }}>{t("signup.verificationCode.resendCode")}</Text>
                    </TouchableOpacity>
                </View>
                {/* End of dont received email Button */}

                {/* Submit Button */}
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
                {/* End of Submit Button */}
            </View>

            {/* Resended email warning modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(!isModalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={styles.iconContainer}>
                                <Fontisto name="email" size={24} color="#664D03" />
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={styles.modalText}>{t("recoveryDatas.emailResend")}</Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setIsModalVisible(!isModalVisible)}
                            style={styles.modalSaveButton}
                        >
                            <View style={styles.modalButtonSaveContent}>
                                <Feather name="check" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* End of Resended email warning modal */}
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        zIndex: 10
    },
    modalText: {
        fontSize: 18,
        marginVertical: 20,
        color: '#fff',
        textAlign: 'center'
    },
    iconContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#FFF3CD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        shadowRadius: 4,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        gap: 20,
        width: '100%'
    },
    modalSaveButton: {
        width: '100%',
        borderRadius: 8,
    },
    modalButtonSaveContent: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    }
});