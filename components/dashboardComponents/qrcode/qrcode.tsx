import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import QRCodeHole from './qrcodeHole';
import { useLocale } from '@/contexts/TranslationContext';

export default function Qrcode() {
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [scanned, setScanned] = useState(false);
    const { t } = useLocale();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setTimeout(() => {
            setScanned(false);
        }, 3000);
    };

    if (hasPermission === null) {
        return <Text style={styles.text}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
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
        fontSize: 30,
        fontWeight: 'bold',
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginTop: 20,
    },
});
