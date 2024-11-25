import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import LoyaltyComponent from '../loyaltyComponent';
import WallatDeposit from '../wallatDeposit';
import { Skeleton } from 'moti/skeleton';

export default function WallatCredits({ currencyType, openExtract }: any) {

    const [search, setSearch] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>('cEUR');
    const [currentComponent, setCurrentComponent] = useState<string>("deposit");
    const [loading, setLoading] = useState<boolean>(true);
    const { t } = useLocale();

    const [datas, setDatas] = useState<any>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDatas({
                creditsAmount: "50,00",
                currencyType: "cEUR",
                tokensAmount: "999999999999999,00",
                tokensBlockedAmount: "99999999999999,00",
                token: "X",
                blockChain: "XXXX",
                wallatLink: "https://www.google.com",
                loyaltyDatas: [
                    { id: "1", name: "Rei do bacalhau", value: "100,00" },
                    { id: "2", name: "Rei do sorvete", value: "100,00" },
                    { id: "3", name: "Rei do peixe", value: "100,00" },
                    { id: "4", name: "Sorveteria", value: "100,00" },
                    { id: "5", name: "Pizzaria", value: "100,00" },
                    { id: "6", name: "Pizzaria", value: "100,00" },
                    { id: "7", name: "Pizzaria", value: "100,00" },
                    { id: "8", name: "Pizzaria", value: "100,00" },
                    { id: "9", name: "Pizzaria", value: "100,00" },
                    { id: "10", name: "Pizzaria", value: "100,00" },
                    { id: "11", name: "Pizzaria", value: "100,00" },
                    { id: "12", name: "Pizzaria", value: "100,00" },
                    { id: "13", name: "Pizzaria", value: "100,00" },
                    { id: "14", name: "Pizzaria", value: "100,00" },
                ],
            });
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const options = [
        {
            id: "1",
            currency: 'cEUR',
        },
        {
            id: "2",
            currency: 'cDolar',
        },
    ];

    const filteredData = datas?.loyaltyDatas.filter((item: { name: string; }) => {
        const matchesSearchInput = item.name.toLowerCase().includes(search.toLowerCase());
        return matchesSearchInput;
    });

    const handleCurrencySelect = (currency: string) => {
        setSelectedCurrency(currency);
        setModalVisible(false);
    };

    const renderComponent = () => {
        if (currentComponent === "deposit") {
            return (
                <WallatDeposit
                    token={datas?.token}
                    blockChain={datas?.blockChain}
                    wallatLink={datas?.wallatLink}
                    loading={loading}
                />
            )
        }

        if (currentComponent === "fidelity") {
            return (
                <LoyaltyComponent
                    setSearch={(text: string) => setSearch(text)}
                    loyaltyDatas={datas?.loyaltyDatas}
                    loading={loading}
                />
            )
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>

                <View style={styles.amountContainer}>
                    <Skeleton
                        colorMode='light'
                        show={loading}
                        width={'70%'}
                        height={40}
                    >
                        {loading ? null :
                            <View style={styles.currencyWrapper}>
                                <Text numberOfLines={1} style={styles.amountText}>{datas?.creditsAmount}</Text>
                            </View>
                        }
                    </Skeleton>
                    <Skeleton
                        colorMode='light'
                        show={loading}
                        width={'45%'}
                        height={40}
                    >
                        {loading ? null :
                            <TouchableOpacity style={styles.currencyContainer} onPress={() => setModalVisible(true)}>
                                <Text style={styles.currencyText}>{selectedCurrency || currencyType}</Text>
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            </TouchableOpacity>
                        }
                    </Skeleton>

                </View>

            </View>

            <View style={styles.fidelityHeader}>
                <View style={styles.fidelityTitleContainer}>
                    <TouchableOpacity style={styles.fidelityButton} activeOpacity={0.7} onPress={() => setCurrentComponent("deposit")}>
                        <Text style={[styles.fidelityTitle, currentComponent === "deposit" ? { color: '#0D6EFD' } : { color: '#000' }]}>{t("dashboardWallat.creditsScreen.deposit")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fidelityButton} activeOpacity={0.7} onPress={() => setCurrentComponent("fidelity")}>
                        <Text style={[styles.fidelityTitle, currentComponent === "fidelity" ? { color: '#0D6EFD' } : { color: '#000' }]}>{t("dashboardWallat.creditsScreen.fidelity")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fidelityButton} activeOpacity={0.7} onPress={openExtract}>
                        <Text style={[styles.fidelityTitle, { color: '#000' }]}>{t("dashboardWallat.creditsScreen.extract")}</Text>
                        <Feather style={{ marginBottom: 7, marginLeft: 5 }} name="list" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>


            {
                renderComponent()
            }


            <View>

                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalWrapper}>
                        <TouchableOpacity style={{ position: 'absolute', left: 20, zIndex: 10, flexDirection: 'row' }} onPress={() => setModalVisible(false)}>
                            <Feather name="arrow-left" size={30} style={{ color: 'black', marginTop: 2 }} />
                            <Text style={styles.modalText}>{t("dashboardWallat.creditsScreen.modalback")}</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={options}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleCurrencySelect(item.currency)}
                                style={{
                                    borderBottomWidth: 1,
                                    backgroundColor: selectedCurrency === item.currency ? '#EDEDED' : '#fff',
                                    borderColor: '#d1d5db'
                                }}
                            >
                                <View style={styles.optionWrapper}>
                                    <View style={styles.optionContent}>
                                        <Text style={{ fontSize: fontSize.labels.medium }}>{item.currency}</Text>
                                    </View>
                                    {selectedCurrency === item.currency && <Feather name="check" size={24} color="black" />}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    amountContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 8,
        height: 65,
        padding: 16
    },
    currencyWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'center',
    },
    amountText: {
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    currencyText: {
        fontSize: fontSize.titles.mini,
        fontWeight: '600',
        marginRight: 8,
    },
    fidelityHeader: {
        height: 45,
        paddingHorizontal: 16,
        marginTop: 32,
    },
    fidelityTitleContainer: {
        borderBottomWidth: 1,
        paddingVertical: 7,
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
    searchContainer: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 12,
    },
    searchInnerContainer: {
        justifyContent: 'center',
        position: 'relative',
    },
    searchIcon: {
        color: 'gray',
        position: 'absolute',
        marginLeft: 14,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    labelContainer: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    label: {
        fontSize: fontSize.labels.mini,
        color: '#4B5563',
        fontWeight: '600',
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    modalWrapper: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        height: 48,
        marginTop: 20,
    },
    optionWrapper: {
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 56,
        paddingHorizontal: 20,
        fontSize: fontSize.labels.medium,
        flexDirection: 'row',
        color: '#6b7280',
    },
    optionContent: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    modalText: {
        fontSize: fontSize.titles.mini,
        textAlign: 'left',
        width: '100%',
        marginLeft: 5,
        marginTop: 4
    }
});
