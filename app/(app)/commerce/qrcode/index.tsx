import React, { useRef, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import CommerceHeader from '@/components/commerceHeader';
import { useLocale } from "@/contexts/TranslationContext";
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { printAsync } from 'expo-print';
import { router } from 'expo-router';

export default function Commerce_Qrcode() {
    const [commerceID, setCommerceID] = useState('#DF56G4DF');
    const { t } = useLocale();
    const qrCodeRef = useRef<any>(null);

    const copyToClipboard = () => {
        Clipboard.setStringAsync(commerceID);
    };



    const handlePrint = async () => {
        if (qrCodeRef.current) {
            qrCodeRef.current.toDataURL(async (data: string) => {
                const htmlContent = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
                        <img src="data:image/png;base64,${data}" alt="QR Code" />
                    </div>
                `;

                await printAsync({
                    html: htmlContent,
                });
            });
        }
    }


    return (
        <SafeAreaView style={styles.safeArea}>

            <CommerceHeader
                Title={t("commerce.qrcode.headerLabel")}
                ScreenGoback={() => router.back()}
            />

            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>{t("commerce.qrcode.title")}</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={[styles.qrcodeText, { marginLeft: 5, marginBottom: 5 }]}>{t("commerce.qrcode.id")}</Text>
                    <View>
                        <TextInput
                            value={commerceID}
                            editable={false}
                            style={styles.textInput}
                            textAlign='center'
                        />
                        <TouchableOpacity style={styles.copyIconContainer} onPress={copyToClipboard} activeOpacity={0.7}>
                            <Ionicons name="copy-outline" size={18} color="#495057" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.qrcodeContainer}>
                    <View style={styles.qrcodeWrapper}>
                        <QRCode
                            value={commerceID}
                            size={230}
                            color="white"
                            backgroundColor="black"
                            getRef={(ref) => (qrCodeRef.current = ref)}
                            quietZone={-1}
                        />
                    </View>

                    <View style={styles.qrcodeTextContainer}>
                        <Text style={styles.qrcodeText}>{t("commerce.qrcode.description1")}</Text>
                        <Text style={styles.qrcodeText}>{t("commerce.qrcode.description2")}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.printerLabel}
                    onPress={handlePrint}
                >
                    <Feather name="printer" size={20} color='#0D6EFD' />
                    <Text style={[styles.qrcodeText, { color: '#0D6EFD' }]}>Imprimir</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        paddingHorizontal: 40,
        alignItems: 'center',
        gap: 35
    },
    header: {
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 30
    },
    qrcodeContainer: {
        width: '90%'
    },
    qrcodeWrapper: {
        width: '100%',
        height: 280,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#B3B3B3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrcodeIcon: {
        backgroundColor: '#B3B3B3',
        borderRadius: 15,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrcodeTextContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    qrcodeText: {
        fontSize: 20,
        fontWeight: '400'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: 18,
        color: '#000',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
    },
    inputWrapper: {
        position: 'relative',
        width: '90%'
    },
    copyIconContainer: {
        position: 'absolute',
        height: '100%',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#F3F4F6',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderColor: '#E9ECEF',
        borderWidth: 1,
        zIndex: 10,
    },
    printerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
});