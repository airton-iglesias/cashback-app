import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../types/navigationTypes';
import { AntDesign } from '@expo/vector-icons';
import CommerceHeader from './CommerceHeader';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function Commerce_Qrcode() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [commerceID, setCommerceID] = useState('#DF56G4DF');

    return (
        <SafeAreaView style={styles.safeArea}>

            <CommerceHeader
                Title={'Voltar'}
                ScreenGoback={() => commerceNavigation.goBack()}
            />

            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>Qrcode</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={[styles.qrcodeText, {marginLeft: 5, marginBottom: 5}]}>ID</Text>
                    <TextInput
                        value={commerceID}
                        editable={false}
                        style={styles.textInput}
                        textAlign='center'
                    />
                </View>

                <View>
                    <View style={styles.qrcodeContainer}>
                        <View style={styles.qrcodeSubContainer}>
                            <AntDesign name="qrcode" size={150} color="white" />
                        </View>
                    </View>

                    <View style={styles.qrcodeTextContainer}>
                        <Text style={styles.qrcodeText}>Scan QR code</Text>
                        <Text style={styles.qrcodeText}>do comerciante</Text>
                    </View>
                </View>
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
        gap: 30
    },
    header: {
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 30
    },
    qrcodeContainer: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#B3B3B3',
        alignItems: 'center',
        padding: 15,
        marginTop: 50
    },
    qrcodeSubContainer: {
        backgroundColor: '#B3B3B3',
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
});
