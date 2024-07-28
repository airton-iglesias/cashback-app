import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SendDiscountParamList } from '@/types/navigationTypes';
import { Feather, Octicons } from '@expo/vector-icons';

export default function Send_Discount_Value() {
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
            <ScrollView>
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
                            placeholder="Insira o ID do comerciante aqui"
                            style={[
                                styles.textInput,
                                inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                inputPasswordError && styles.inputError
                            ]}
                        />
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoInnerContainer}>
                            <View style={styles.iconCircle}></View>
                            <Text style={styles.infoText}>nome</Text>
                        </View>
                        <Octicons name="verified" size={24} color="#3b82f6" />
                    </View>


                    <View style={{ width: '100%' }}>
                        <Text style={styles.valueInfoLabel}>Valor da compra</Text>
                        <View style={styles.valueInfoContainer}>
                            <View style={styles.valueInfoInnerContainer}>
                                <Text style={styles.valueInfoText}>00,00</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <Text style={styles.discountInfoLabel}>Desconto Imediáto</Text>
                        <View style={styles.discountInfoContainer}>
                            <View style={styles.discountInfoInnerContainer}>
                                <Text style={styles.discountInfoText}>00,00</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.listContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Enviar</Text>
                            <View style={styles.ValueContainer}>
                                <Text style={styles.value}>500</Text>
                                <Text style={styles.currency}>cEUR</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Cashbak</Text>
                            <View style={styles.ValueContainer}>
                                <Text style={styles.value}>500</Text>
                                <Text style={styles.currency}>cEUR</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Burn</Text>
                            <View style={styles.ValueContainer}>
                                <Text style={styles.value}>500</Text>
                                <Text style={styles.currency}>cEUR</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Tipo</Text>
                            <Text style={styles.value}>Liver</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Taxa</Text>
                            <Text style={styles.value}>0.01</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            underlayColor="#e5e7eb"
                            activeOpacity={0.6}
                            style={styles.buttonWrapper}
                        >
                            <View style={styles.submitButton}>
                                <Feather name="arrow-right" size={24} color={'white'} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
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
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 100,
        gap: 25
    },
    header: {
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 30
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
        textAlign: 'center'
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
    infoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 64,
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoInnerContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    iconCircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        marginRight: 16,
    },
    infoText: {
        fontSize: 24,
    },
    valueInfoLabel: {
        fontSize: 17,
        marginBottom: 8,
        color: '#343A40'
    },
    valueInfoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 68,
        backgroundColor: '#343A40',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueInfoInnerContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    valueInfoText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    discountInfoLabel: {
        fontSize: 17,
        marginBottom: 8,
        color: '#0D503C'
    },
    discountInfoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 68,
        backgroundColor: '#198754',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discountInfoInnerContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    discountInfoText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    listContainer: {
        width: '100%',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    ValueContainer: {
        flexDirection: 'row'
    },
    value: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    currency: {
        fontSize: 10,
        fontWeight: '600',
        color: '#000',
        marginLeft: 2
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        paddingBottom: 8,
        justifyContent: 'flex-end',
        marginTop: 5
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

});
