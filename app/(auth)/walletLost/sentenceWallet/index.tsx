import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { router, useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

import { fontSize } from "@/constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SentenceWallet() {
    // Sentence received from the previous screen
    const { sentence } = useLocalSearchParams();

    // State variables for UI
    const [loading, setLoading] = useState<boolean>(false);
    const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
    const { t } = useLocale();

    // Function to copy the sentence to the clipboard
    const copyToClipboard = (item: string) => {
        Clipboard.setStringAsync(item);
        setCopiedSuccess(true);

        setTimeout(() => {
            setCopiedSuccess(false);
        }, 2000);
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    {/* Header */}
                    <View>
                        <Text style={styles.headerText}>{t("signup.sentenceWallet.title")}</Text>
                    </View>
                    {/* End of Header */}

                    {/* Error message section */}
                    {copiedSuccess && (
                        <View style={[styles.copiedMessageContainer]}>
                            <View style={styles.copiedMessageWrapper}>
                                <Text style={styles.copiedMessage}>
                                    {t("signup.sentenceWallet.copiedSuccess")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {/* End of Error message section */}

                    {/* Sentence text section */}
                    <View style={styles.inputWrapper}>
                        {/* Input label */}
                        <View style={styles.inputLabelWrapper}>
                            {/* Label */}
                            <View style={styles.inputLabelSubWrapper}>
                                <Text style={styles.inputLabel}>{t("signup.sentenceWallet.label")}</Text>
                            </View>
                            {/* End of Label */}

                            {/* Copy button */}
                            <TouchableOpacity
                                style={styles.copyButton}
                                activeOpacity={0.7}
                                onPress={() => copyToClipboard(sentence as string || '')}
                            >
                                <Ionicons name="copy-outline" size={12} color="#fff" />
                                <Text style={styles.copyText}>{t("signup.sentenceWallet.copy")}</Text>
                            </TouchableOpacity>
                            {/* End of Copy button */}
                        </View>
                        {/* End of Input label */}

                        {/* Input of sentence */}
                        <View style={styles.input}>
                            {/* sentence */}
                            <Text style={styles.inputText} selectable>
                                {sentence}
                            </Text>
                            {/* End of sentence */}
                        </View>
                        {/* End of Input of sentence */}
                    </View>
                </View>
                {/* End of Sentence text section */}

                {/* Warning */}
                <View style={styles.warningContainer}>
                    <View style={styles.warningItemsWrapper}>
                        <View style={styles.warningIconWrapper}>
                            <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                        </View>
                        <View style={styles.warningTextWrapper}>
                            <Text style={styles.warningText}>{t("signup.sentenceWallet.warning1")}</Text>
                            <Text style={styles.warningText}>{t("signup.sentenceWallet.warning2")}</Text>
                            <Text style={styles.warningText}>{t("signup.sentenceWallet.warning3")}</Text>
                            <Text style={styles.warningText}>{t("signup.sentenceWallet.warning4")}</Text>
                        </View>
                    </View>
                </View>
                {/* End of Warning */}

                {/* Submtit button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.buttonWrapper}
                        onPress={() => router.push({
                            pathname: "/walletLost/walletLostSuccess",
                            params: { RequestSuccessful: 'true' }
                        })}
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
                {/* End of Submtit button */}
            </View>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 40
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
    warningContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 15,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    warningItemsWrapper: {
        backgroundColor: '#FFE69C',
        width: '100%',
        height: 200,
        flexDirection: 'row',
        borderRadius: 6,
        padding: 25,
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
        justifyContent: 'space-between',
    },
    warningText: {
        color: "#997404",
        fontSize: fontSize.labels.medium
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 200,
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
        paddingTop: 10
    },
    inputText: {
        fontSize: fontSize.labels.medium,
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
    copyButton: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 6,
        marginBottom: 3,
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    copyText: {
        fontSize: fontSize.labels.medium,
        color: '#fff'
    },
    copiedMessageContainer: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 20
    },
    copiedMessageWrapper: {
        borderRadius: 10,
        backgroundColor: '#D1E7DD',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    copiedMessage: {
        textAlign: 'center',
        color: '#146C43',
    }

});