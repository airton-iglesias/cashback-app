import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ActivityIndicator, TextInput, Keyboard } from "react-native";
import { Ionicons, Feather, Octicons } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

import { getWalletRecoverySchema, WalletRecoveryData } from '@/schemas/authSchemas';
import { fontSize } from "@/constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageService } from '@/services/storageService';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function WalletRecovery() {
    // State variables for UI
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [requestError, setRequestError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const { t } = useLocale();

    // React Hook Form setup
    const walletRecoverySchema = React.useMemo(() => getWalletRecoverySchema(t), [t]);
    const { control, handleSubmit, setValue, trigger, formState: { errors, isValid } } = useForm<WalletRecoveryData>({
        resolver: zodResolver(walletRecoverySchema),
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

    // Function to paste text from the clipboard
    const pasteFromClipboard = async () => {
        const clipboardContent = await Clipboard.getStringAsync();
        const sanitizedContent = clipboardContent.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');

        setValue('phrase', sanitizedContent);
        await trigger('phrase');
        setText(sanitizedContent);
    };

    // Function to validate and save the 17-word phrase
    const onSubmit = async () => {
        if (requestError) { setRequestError(!requestError) }
        setLoading(true);

        // Make the request to API here. 

        try {
            await StorageService.setItem('walletPhrase', text);
            setLoading(false);

            router.push({
                pathname: '/walletRecovery/walletRecoverySuccess',
                params: {
                    RequestSuccessful: 'true'
                },
            });

        } catch (error) {
            setLoading(false);
            setRequestError(true);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{t("walletRecovery.title")}</Text>
                    </View>
                    {/* End of Header */}

                    {/* Error Input section */}
                    {errors.phrase && (
                        <View style={[styles.errorMessageContainer]}>
                            <View style={styles.errorMessageWrapper}>
                                <Text style={styles.errorMessage}>
                                    <Text style={styles.errorText}>{errors.phrase.message}</Text>
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Error message section */}
                    {requestError && (
                        <View style={[styles.errorMessageContainer]}>
                            <View style={styles.errorMessageWrapper}>
                                <Text style={styles.errorMessage}>
                                    {t("walletRecovery.errorMessage")}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Sentence text */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputLabelWrapper}>
                            {/* Label */}
                            <View style={styles.inputLabelSubWrapper}>
                                <Text style={styles.inputLabel}>{t("walletRecovery.label")}</Text>
                            </View>
                            {/* End of Label */}

                            {/* Paste button */}
                            <TouchableOpacity
                                style={styles.pasteButton}
                                activeOpacity={0.7}
                                onPress={pasteFromClipboard}
                            >
                                <Octicons name="paste" size={12} color="#fff" />
                                <Text style={styles.pasteText}>{t("walletRecovery.paste")}</Text>
                            </TouchableOpacity>
                            {/* End of Paste button */}
                        </View>
                        <View style={[styles.input, keyboardIsVisible ? { height: 100 } : { height: 200 }]}>
                            {/* Sentence input */}
                            <Controller
                                control={control}
                                name="phrase"
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        style={styles.inputText}
                                        textAlignVertical="top"
                                        multiline
                                        onChangeText={(value) => {
                                            const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');
                                            onChange(filteredValue);
                                            setText(filteredValue);
                                        }}
                                        value={text}
                                    />
                                )}
                            />
                            {/* End of sentence */}
                        </View>
                    </View>
                    {/* End of Sentence text */}

                    {/* Warning */}
                    <View style={styles.warningContainer}>
                        <View style={styles.warningItemsWrapper}>
                            <View style={styles.warningIconWrapper}>
                                <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                            </View>
                            <View style={styles.warningTextWrapper}>
                                <Text style={styles.warningText}>{t("walletRecovery.warning")}</Text>
                            </View>
                        </View>
                    </View>
                    {/* End of Warning */}
                </View>

                {/* Submit button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.buttonWrapper}
                        onPress={handleSubmit(onSubmit)}
                        disabled={loading || !isValid}
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
                        activeOpacity={0.6}
                        style={styles.buttonWrapper}
                        onPress={() => router.navigate("/walletLost")}
                        disabled={loading}
                    >
                        <View style={styles.lostWalletButton}>
                            <Text style={styles.lostWalletText}>{t("walletRecovery.lostPhraseButton")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* End of Submit button */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 40
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    headerText: {
        fontSize: fontSize.titles.medium,
        fontWeight: '700',
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
    lostWalletButton: {
        flexDirection: 'row',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    lostWalletText: {
        color: '#0D6EFD',
        fontSize: fontSize.labels.medium
    },
    warningContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginTop: 20
    },
    warningItemsWrapper: {
        backgroundColor: '#FFE69C',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        borderRadius: 6,
        padding: 15,
        gap: 10,
    },
    warningIconWrapper: {
        height: '100%',
        marginRight: 10,
        justifyContent: 'center'
    },
    warningTextWrapper: {
        height: '100%',
        flex: 1,
        justifyContent: 'center'
    },
    warningText: {
        color: "#997404",
        fontSize: fontSize.labels.medium
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
        paddingTop: 10
    },
    inputText: {
        fontSize: fontSize.labels.medium,
        height: '100%',
        textAlignVertical: 'top',
    },
    inputLabelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLabelSubWrapper: {
        justifyContent: 'flex-end'
    },
    inputLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4,
    },
    pasteButton: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 6,
        marginBottom: 3,
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pasteText: {
        fontSize: fontSize.labels.medium,
        color: '#fff'
    },
    errorMessageContainer: {
        width: '100%',
        height: 60,
        paddingHorizontal: 15,
        marginTop: 5
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
    errorText: {
        color: '#DC3545',
        fontSize: fontSize.labels.medium,
        marginTop: 5,
    },
});
