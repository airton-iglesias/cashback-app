import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import InfoCloudIcon from '@/assets/icons/infoCloudIcon';
import LinearGraph from '@/components/LinearGraph';
import { Skeleton } from 'moti/skeleton';

export default function WallatTokens({ openExtract }: any) {
    const [currentComponent, setCurrentComponent] = useState<string>("graphic");
    const [modalZoiVisible, setModalZoiVisible] = useState(false);
    const [modalPoolVisible, setModalPoolVisible] = useState(false);
    const totalSegments = 9;
    const activeSegments = 1.5;
    const { t } = useLocale();
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState<any>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDatas({
                tokensAmount: "999999999999999,00",
                zoiAmount: "999999999999999,00",
                token: "X",
                blockChain: "XXXX",
                wallatLink: "https://www.google.com",
                poolPorcentage: '2%'
            });
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.currencyContainer}>
                <View style={styles.currencyAmountContainer}>
                    <Skeleton
                        show={loading}
                        colorMode='light'
                        width={150}
                    >
                        {loading ? null :
                            <Text
                                numberOfLines={1}
                                style={[styles.currencyAmountText, { color: '#0D6EFD' }]}
                            >
                                {datas?.tokensAmount}
                            </Text>
                        }
                    </Skeleton>
                    <View style={styles.tokensCurrencyContainer}>
                        <Text style={[styles.CurrencyText, { color: '#0D6EFD' }]}>Tokens</Text>
                    </View>
                </View>
            </View>

            <View style={styles.currencyContainer}>
                <View style={styles.currencyAmountContainer}>
                    <Skeleton
                        show={loading}
                        colorMode='light'
                        width={150}
                    >
                        {loading ? null :
                            <Text
                                numberOfLines={1}
                                style={[styles.currencyAmountText, { color: '#495057' }]}
                            >
                                {datas?.zoiAmount}
                            </Text>
                        }
                    </Skeleton>
                    <View style={styles.tokensCurrencyContainer}>
                        <Feather name="lock" size={15} color="#495057" style={{ marginTop: 3 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text style={[styles.CurrencyText, { color: '#495057', marginLeft: 5 }]}>Zoi</Text>
                            <TouchableOpacity onPress={() => setModalZoiVisible(true)}>
                                <Feather name="info" size={12} color="#6C757D" style={{ marginTop: 2 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.fidelityHeader}>
                <View style={styles.fidelityTitleContainer}>
                    <TouchableOpacity style={styles.fidelityButton} activeOpacity={0.7} onPress={() => setCurrentComponent("graphic")}>
                        <Text style={[styles.fidelityTitle, currentComponent === "graphic" ? { color: '#0D6EFD' } : { color: '#000' }]}>{t("dashboardWallat.tokensScreen.graphic")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fidelityButton} activeOpacity={0.7} onPress={() => setCurrentComponent("win")}>
                        <Text style={[styles.fidelityTitle, currentComponent === "win" ? { color: '#0D6EFD' } : { color: '#000' }]}>{t("dashboardWallat.tokensScreen.win")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fidelityButton} activeOpacity={0.7} onPress={openExtract}>
                        <Text style={[styles.fidelityTitle, { color: '#000' }]}>{t("dashboardWallat.tokensScreen.extract")}</Text>
                        <Feather style={{ marginBottom: 7, marginLeft: 5 }} name="list" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {currentComponent === "graphic" && (

                <View style={{ flex: 1 }}>

                    <LinearGraph loading={loading} />

                    <View style={[styles.warningContainer, { marginHorizontal: 15, top: 5, paddingRight: 16 }]}>
                        <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                        <Text style={styles.warningText}>
                            {t("dashboardWallat.tokensScreen.warning")}
                        </Text>
                    </View>
                </View>
            )}

            {currentComponent === "win" && (
                <View>
                    <View style={styles.detailsContainer}>
                        <View style={[styles.detailRow]}>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text style={styles.detailLabel}>{t("dashboardWallat.tokensScreen.tax_distribution")}</Text>
                                <TouchableOpacity onPress={() => setModalPoolVisible(true)}>
                                    <Feather name="info" size={12} color="#0052FF" style={{ marginTop: 2 }} />
                                </TouchableOpacity>
                            </View>
                            <Feather name="check-circle" size={24} color="#4ade80" />
                        </View>

                        <View style={[styles.walletContainer]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <View style={{ flexDirection: 'row', gap: 5 }}>
                                        <Skeleton
                                            show={loading}
                                            colorMode='light'
                                            height={16}
                                            width={100}
                                        >
                                            {loading ? null : <Text style={styles.walletLabel}>{t("dashboardWallat.tokensScreen.pool_distribution")} {datas?.poolPorcentage}</Text>}
                                        </Skeleton>
                                        <TouchableOpacity onPress={() => setModalPoolVisible(true)}>
                                            <Feather name="info" size={12} color="#0052FF" style={{ marginTop: 2 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.walletRow}>
                                        <Skeleton
                                            show={loading}
                                            colorMode='light'
                                            height={16}
                                            width={160}
                                        >
                                            {
                                            loading ? null : <Text numberOfLines={1} style={styles.walletLabel}>{t("dashboardWallat.tokensScreen.next_distribution")}: 03/04/2024</Text>}
                                        </Skeleton>
                                    </View>
                                </View>
                                <Feather name="check-circle" size={24} color="#4ade80" />
                            </View>
                            <View style={styles.poolGraphicContainer}>
                                <Skeleton
                                    show={loading}
                                    width={'100%'}
                                    height={'100%'}
                                    colorMode='light'
                                >
                                    {loading ? null :
                                        <View style={styles.poolGraphic}>
                                            {Array.from({ length: totalSegments }).map((_, index) => {
                                                let fillStyle = styles.inactiveSegment;

                                                if (index < Math.floor(activeSegments)) {
                                                    fillStyle = styles.activeSegment;
                                                } else if (index === Math.floor(activeSegments) && activeSegments % 1 !== 0) {
                                                    fillStyle = styles.halfActiveSegment;
                                                }

                                                return (
                                                    <View
                                                        key={index}
                                                        style={[styles.segment]}
                                                    >
                                                        <View
                                                            style={[fillStyle]}
                                                        />
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    }
                                </Skeleton>
                            </View>
                        </View>
                    </View>
                </View>
            )}

            <Modal
                animationType="slide"
                visible={modalZoiVisible}
                onRequestClose={() => setModalZoiVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalIconContainer}>
                        <View style={styles.modalIconBackground}>
                            <InfoCloudIcon width={36} height={36} color={'#3b82f6'} />
                        </View>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>{t("dashboardWallat.tokensScreen.modal.zoi.title1")}</Text>
                            <Text style={styles.modalTitle}>{t("dashboardWallat.tokensScreen.modal.zoi.title2")}</Text>
                        </View>
                    </View>
                    <View style={styles.modalContent}>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalSectionTitle}>{t("dashboardWallat.tokensScreen.modal.zoi.criterionTitle")}</Text>
                            <Text style={styles.modalSectionText}>{t("dashboardWallat.tokensScreen.modal.zoi.criterionDescription")}</Text>
                        </View>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalSectionTitleAdd}>{t("dashboardWallat.tokensScreen.modal.zoi.importantTitle")}</Text>
                            <Text style={styles.modalSectionText}>{t("dashboardWallat.tokensScreen.modal.zoi.importantDescription")}</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                visible={modalPoolVisible}
                onRequestClose={() => setModalPoolVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalIconContainer}>
                        <View style={styles.modalIconBackground}>
                            <InfoCloudIcon width={36} height={36} color={'#3b82f6'} />
                        </View>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>{t("dashboardWallat.tokensScreen.modal.pool.title1")}</Text>
                            <Text style={styles.modalTitle}>{t("dashboardWallat.tokensScreen.modal.pool.title2")}</Text>
                        </View>
                    </View>
                    <View style={styles.modalContent}>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalSectionTitle}>{t("dashboardWallat.tokensScreen.modal.pool.taxTitle")}</Text>
                            <Text style={styles.modalSectionText}>{t("dashboardWallat.tokensScreen.modal.pool.taxDescription")}</Text>
                        </View>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalSectionTitleAdd}>{t("dashboardWallat.tokensScreen.modal.pool.poolTitle")}</Text>
                            <Text style={styles.modalSectionText}>{t("dashboardWallat.tokensScreen.modal.pool.poolDescription")}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 96,

    },
    currencyContainer: {
        paddingTop: 16,
        paddingHorizontal: 15
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
    },
    depositSection: {
        marginTop: 25,
        marginBottom: 20
    },
    depositTitle: {
        fontSize: fontSize.titles.mini,
        fontWeight: 'bold',
    },
    detailsContainer: {
        paddingHorizontal: 15
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
    },
    walletContainer: {
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        paddingBottom: 14,
        gap: 10
    },
    walletLabel: {
        fontSize: fontSize.labels.medium,
    },
    walletRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
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
    fidelityHeader: {
        height: 45,
        marginTop: 32,
        paddingHorizontal: 15
    },
    fidelityTitleContainer: {
        borderBottomWidth: 1,
        paddingVertical: 4,
        borderColor: '#DEE2E6',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fidelityTitle: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    fidelityButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 15
    },
    modalIconContainer: {
        alignItems: 'center',
    },
    modalIconBackground: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5EFFF',
        borderRadius: 16,
    },
    modalTitleContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    modalTitle: {
        fontSize: fontSize.titles.medium,
        color: '#3b82f6',
    },
    modalContent: {
        gap: 24,
        marginTop: 24,
    },
    modalSection: {
        alignItems: 'center',
    },
    modalSectionTitle: {
        color: '#4b5563',
        fontWeight: 'bold',
        fontSize: fontSize.labels.extralarge,
    },
    modalSectionTitleAdd: {
        color: '#14b8a6',
        fontWeight: 'bold',
        fontSize: fontSize.labels.extralarge,
    },
    modalSectionText: {
        color: '#4b5563',
        fontSize: fontSize.labels.medium,
        textAlign: 'center',
    },
    modalBackButton: {
        position: 'absolute',
        left: 30,
        width: 60,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalHeaderContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    modalHeaderText: {
        fontSize: fontSize.titles.medium,
        fontWeight: '700',
        left: 15,
        marginBottom: 3
    },
    tooltipContainer: {
        position: 'absolute',
        top: -30,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        borderRadius: 8,
    },
    tooltipText: {
        color: '#fff',
        fontSize: 12,
    },
    poolGraphicContainer: {
        height: 22,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden'
    },
    poolGraphic: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        gap: 2
    },
    segment: {
        flex: 1,
        height: '100%',
        backgroundColor: '#343434',
    },
    activeSegment: {
        backgroundColor: '#198754',
        height: '100%',
    },
    inactiveSegment: {
        backgroundColor: '#343434',
        height: '100%',
    },
    halfActiveSegment: {
        backgroundColor: '#198754',
        height: '100%',
        width: '50%',  // Definindo o tamanho em 50%
    },

});
