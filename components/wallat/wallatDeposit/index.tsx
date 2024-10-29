import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import { Skeleton } from 'moti/skeleton';

export default function WallatDeposit({ token, blockChain, wallatLink, loading }: any) {
    const { t } = useLocale();
    const copyToClipboard = () => {
        Clipboard.setStringAsync(wallatLink);
    };

    return (
        <View style={styles.container}>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t("dashboardWallat.creditsScreen.token")}</Text>
                <Skeleton
                    show={loading}
                    width={100}
                    height={24}
                    colorMode='light'
                >
                    {loading ? null : <Text numberOfLines={1} style={styles.detailValue}>{token}</Text>}
                </Skeleton>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{t("dashboardWallat.creditsScreen.blockchain")}</Text>
                <Skeleton
                    show={loading}
                    width={100}
                    height={24}
                    colorMode='light'
                >
                    {loading ? null : <Text numberOfLines={1} style={styles.detailValue}>{blockChain}</Text>}
                </Skeleton>
            </View>
            <View style={styles.walletContainer}>
                <Text style={styles.walletLabel}>{t("dashboardWallat.creditsScreen.depositWallat")}</Text>
                <View style={styles.walletRow}>
                    <Skeleton
                        show={loading}
                        colorMode='light'
                        height={24}
                        width={200}
                    >
                        {loading ? null : <Text numberOfLines={1} style={styles.walletLink}>{wallatLink}</Text>}
                    </Skeleton>
                    <Skeleton
                        show={loading}
                        colorMode='light'
                        height={24}
                        width={30}
                    >
                        {loading ? null :
                            <TouchableOpacity onPress={copyToClipboard}>
                                <Ionicons style={styles.copyIcon} name="copy-outline" size={20} color="black" />
                            </TouchableOpacity>
                        }
                    </Skeleton>
                </View>
            </View>
            <View style={styles.warningContainer}>
                <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                <Text style={styles.warningText}>
                    {t("dashboardWallat.creditsScreen.warning")}
                </Text>
            </View>
            <View style={styles.warningContainer}>
                <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                <Text style={styles.warningText}>
                    {t("dashboardWallat.creditsScreen.warning2")}
                </Text>
            </View>

        </View>
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
        fontSize: fontSize.titles.medium,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1
    },
    tokensCurrencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    CurrencyText: {
        fontSize: fontSize.titles.medium,
        fontWeight: '700',
        marginRight: 8,
    },
    depositSection: {
        marginTop: 25,
        marginBottom: 20
    },
    depositTitle: {
        fontSize: fontSize.titles.mini,
        fontWeight: 'bold',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        paddingVertical: 14,
        alignItems: 'center'
    },
    detailLabel: {
        fontSize: fontSize.labels.medium,
    },
    detailValue: {
        fontSize: fontSize.labels.medium,
        color: '#3B82F6',
        alignSelf: 'flex-end'
    },
    walletContainer: {
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        paddingBottom: 14,
    },
    walletLabel: {
        fontSize: fontSize.labels.medium,
        marginBottom: 5,
    },
    walletRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletLink: {
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.labels.medium,
        color: '#997404',
        marginLeft: 10,
        flexWrap: 'wrap',
        width: '90%'
    },
});
