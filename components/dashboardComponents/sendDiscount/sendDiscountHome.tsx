import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SendDiscountParamList } from '@/types/navigationTypes';
import { AntDesign } from '@expo/vector-icons';

export default function Send_Discount_Home() {
    const withdrawNavigation = useNavigation<NavigationProp<SendDiscountParamList>>();

    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);
    const [password, setPassword] = useState('');

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() === '') {
            setInputPasswordError(false);
        } else {
            setInputPasswordError(!validatePassword(text));
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>Obter desconto</Text>
                </View>

                <View style={styles.inputWrapper}>
                    <View
                        style={[
                            styles.inputHighlight,
                            inputPasswordIsFocus && styles.inputHighlightVisible,
                            inputPasswordError && styles.inputErrorHighlight
                        ]}
                    ></View>
                    <TextInput
                        cursorColor={'#ADB5BD'}
                        onFocus={() => setInputPasswordIsFocus(true)}
                        onBlur={() => setInputPasswordIsFocus(false)}
                        onChangeText={handlePasswordChange}
                        value={password}
                        textAlign='center'
                        placeholder="Insira o ID do comerciante aqui"
                        style={[
                            styles.textInput,
                            inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                            inputPasswordError && styles.inputError
                        ]}
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
        paddingTop: 110,
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
        fontSize: 17,
        fontWeight: '400'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: 18,
        color: '#ADB5BD',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
        borderRadius: 10,
        opacity: 0,
    },
    inputHighlightVisible: {
        opacity: 0.15,
        borderColor: '#6610F2',
    },
    inputFocused: {
        borderColor: '#000000',
    },
    inputError: {
        borderColor: '#DC3545',
    },
    inputErrorHighlight: {
        opacity: 0.20,
        borderColor: '#DC3545',
    },
});
