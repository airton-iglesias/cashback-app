import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function WallatTokens({ tokensAmount, tokensBlockedAmount, token, blockChain, wallatLink }: any) {

    const copyToClipboard = () => {
        Clipboard.setStringAsync(wallatLink);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.currencyContainer}>
                <View style={styles.currencyAmountContainer}>
                    <Text
                        numberOfLines={1}
                        style={[styles.currencyAmountText, { color: '#0D6EFD' }]}
                    >{tokensAmount}</Text>
                    <View style={styles.tokensCurrencyContainer}>
                        <Text style={[styles.CurrencyText, { color: '#0D6EFD' }]}>Zoi</Text>
                    </View>
                </View>
            </View>

            <View style={styles.currencyContainer}>
                <View style={styles.currencyAmountContainer}>
                    <Text
                        numberOfLines={1}
                        style={[styles.currencyAmountText, { color: '#495057' }]}
                    >{tokensBlockedAmount}</Text>
                    <View style={styles.tokensCurrencyContainer}>
                        <Feather name="lock" size={15} color="#495057" style={{ marginTop: 3 }} />
                        <Text style={[styles.CurrencyText, { color: '#495057', marginLeft: 5 }]}>Zoi</Text>
                    </View>
                </View>
            </View>

            <View style={styles.depositSection}>
                <Text style={styles.depositTitle}>Depositar token</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Token</Text>
                    <Text numberOfLines={1} style={styles.detailValue}>{token}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Blockchain</Text>
                    <Text numberOfLines={1} style={styles.detailValue}>{blockChain}</Text>
                </View>
                <View style={styles.walletContainer}>
                    <Text style={styles.walletLabel}>Carteira de depósito</Text>
                    <View style={styles.walletRow}>
                        <Text numberOfLines={1} style={styles.walletLink}>{wallatLink}</Text>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Ionicons style={styles.copyIcon} name="copy-outline" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.warningContainer}>
                    <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                    <Text style={styles.warningText}>
                        Qualquer dado mal colocado pode levar a perda irreversível do seu deposito.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 96,
        paddingHorizontal: 15,
    },
    currencyContainer: {
        paddingTop: 16,
    },
    currencyAmountContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        padding: 16,
        marginTop: 8,
    },
    currencyAmountText: {
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1
    },
    tokensCurrencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    CurrencyText: {
        fontSize: 24,
        fontWeight: '700',
        marginRight: 8,
    },
    card: {
        width: '48%',
        height: 160,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tokensCard: {
        backgroundColor: '#D2F4EA',
    },
    creditsCard: {
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tokensAmount: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#004D40',
    },
    tokensText: {
        fontSize: 24,
        color: '#004D40',
        fontWeight: 'bold',
    },
    creditsAmount: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#B91C1C',
    },
    creditsText: {
        fontSize: 24,
        color: '#B91C1C',
        fontWeight: 'bold',
    },
    depositSection: {
        marginTop: 25,
        marginBottom: 20

    },
    depositTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    detailsContainer: {

    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        paddingVertical: 14,
    },
    detailLabel: {
        fontSize: 20,
    },
    detailValue: {
        fontSize: 20,
        color: '#3B82F6',
    },
    walletContainer: {
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        paddingBottom: 14,
    },
    walletLabel: {
        fontSize: 20,
        marginBottom: 5,
    },
    walletRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletLink: {
        fontSize: 20,
        color: '#3B82F6',
    },
    copyIcon: {
        marginLeft: 10,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        borderColor: '#FCD34D',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    warningText: {
        fontSize: 18,
        color: '#997404',
        marginLeft: 10,
        flexWrap: 'wrap',
        width: '90%'
    },
});
