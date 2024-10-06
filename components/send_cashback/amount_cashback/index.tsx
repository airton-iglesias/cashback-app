import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Feather, Octicons } from '@expo/vector-icons';
import { fontSize } from '@/constants/fonts';
import { router } from 'expo-router';

export default function AmountCashback({ changeScreen }: any) {
    const [commerceID, setCommerceID] = useState<string>('');
    const [buyValue, setBuyValue] = useState<string>('0,00');
    const [discountValue, setDiscountValue] = useState<string>('0,00');

    const formatCurrency = (value: string) => {
        const formattedValue = (Number(value) / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return formattedValue;
    };

    const calculateDiscount = (value: string) => {
        const numericValue = Number(value.replace(/\D/g, '')) / 100;
        const discount = numericValue * 0.10;
        return formatCurrency((discount * 100).toString());
    };

    const handleBuyValueChange = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 11) {
            setBuyValue(formatCurrency(numericValue));
            setDiscountValue(calculateDiscount(numericValue));
        }
    };

    const handleDiscountValueChange = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 11) {
            setDiscountValue(formatCurrency(numericValue));
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
                        <TextInput
                            style={styles.textInput}
                            textAlign='center'
                            value={commerceID}
                            onChangeText={setCommerceID}
                            placeholder={'Insira o ID do comerciante aqui'}
                            onSubmitEditing={() => changeScreen("amountValue")}
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
                                <TextInput
                                    style={styles.valueInfoText}
                                    textAlign="center"
                                    value={buyValue}
                                    onChangeText={handleBuyValueChange}
                                    keyboardType="numeric"
                                    placeholder="0,00"
                                />
                            </View>
                        </View>
                    </View>

                    {buyValue !== "0,00" && (
                        <View style={{ width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.discountInfoLabel}>Desconto Imediato</Text>
                                <View style={styles.discountInfoContainer}>
                                    <View style={styles.discountInfoInnerContainer}>
                                        <TextInput
                                            style={styles.discountInfoText}
                                            textAlign="center"
                                            value={discountValue}
                                            onChangeText={handleDiscountValueChange}
                                            keyboardType="numeric"
                                            placeholder="0,00"
                                            editable={false}
                                        />
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
                                    <Text style={styles.value}>Livre</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Taxa</Text>
                                    <Text style={styles.value}>0.01</Text>
                                </View>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.buttonWrapper}
                                    onPress={() => router.push({pathname: '/(app)/send_cashback_success', params: {buyValue, discountValue}})}
                                >
                                <View style={styles.submitButton}>
                                    <Feather name="arrow-right" size={24} color={'white'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                    )}
            </View>
        </ScrollView>
        </SafeAreaView >
    );
}




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
        fontSize: fontSize.titles.extralarge,
        fontWeight: 'bold',
        marginTop: 30
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.labels.large,
    },
    valueInfoLabel: {
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
        color: 'white',
        height: '100%',
        width: '100%'
    },
    discountInfoLabel: {
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
        color: 'white',
        height: '100%',
        width: '100%'
    },
    listContainer: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        fontSize: fontSize.labels.medium,
        fontWeight: '600',
        color: '#000',
    },
    ValueContainer: {
        flexDirection: 'row'
    },
    value: {
        fontSize: fontSize.labels.medium,
        fontWeight: '600',
        color: '#000',
    },
    currency: {
        fontSize: fontSize.labels.micromini,
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
        marginTop: 25
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