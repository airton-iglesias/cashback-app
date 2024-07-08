import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Alert, TouchableHighlight, StyleSheet } from "react-native";
import { Camera, CameraView } from 'expo-camera';
import QRCodeHole from './qrcodeHole';

export default function Qrcode() {

    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
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
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-none flex-row items-center px-4 justify-center bg-black w-full h-[106px] pt-8 z-20">
                <Text className="text-white text-3xl font-bold">Aponte para o QR Code</Text>
            </View>

            <QRCodeHole/>

            <View className="flex-1 h-full w-full items-center">
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
                
            </View>
        </SafeAreaView>
    );
}