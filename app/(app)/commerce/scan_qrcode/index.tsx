import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import QRCodeHole from '@/components/qrcodeHole';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';

export default function commerce_scan_qrcode() {
    const [hasPermission, setHasPermission] = useState<null | boolean>(false);
    const [scanned, setScanned] = useState(false);
    const { t } = useLocale();

    const requestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setTimeout(() => {
            setScanned(false);
        }, 3000);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {hasPermission ? (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{t("dashboardQRCode.label")}</Text>
                    </View>
                    <QRCodeHole />
                    <View style={styles.cameraContainer}>
                        <CameraView
                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                            barcodeScannerSettings={{
                                barcodeTypes: ['qr', 'pdf417'],
                            }}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.permissionContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{t("dashboardQRCode.label")}</Text>
                    </View>
                    <View style={[styles.cameraContainer, { marginBottom: 120 }]}>
                        <Text style={styles.permissionText}>
                            {t("dashboardQRCode.noPermission")}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.button}
                            onPress={requestCameraPermission}
                        >
                            <Text style={styles.buttonText}>{t("dashboardQRCode.permissionButton")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: 106,
        paddingTop: 8,
        zIndex: 20,
    },
    headerText: {
        color: 'white',
        fontSize: fontSize.titles.medium,
        fontWeight: 'bold',
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionText: {
        color: 'white',
        fontSize: fontSize.labels.medium,
        textAlign: 'center',
        paddingHorizontal: 60
    },
    button: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: fontSize.labels.medium,
        textAlign: 'center',
    },
});
