import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import LoyaltyComponent from '@/components/dashboardComponents/wallat/loyaltyComponent';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigationTypes';
import Input from '@/components/input';
import { useLocale } from '@/contexts/TranslationContext';

type WallatNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WallatCredits({ creditsAmount, currencyType, loyaltyDatas }: any) {
    const rootNavigation = useNavigation<WallatNavigationProp>();

    const [search, setSearch] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>('cEUR');
    const { t } = useLocale();
    
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

    const filteredData = loyaltyDatas.filter((item: { nome: string; }) => {
        const matchesSearchInput = item.nome.toLowerCase().includes(search.toLowerCase());
        return matchesSearchInput;
    });

    const handleCurrencySelect = (currency: string) => {
        setSelectedCurrency(currency);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.amountContainer}>
                    <Text numberOfLines={1} style={styles.amountText}>{creditsAmount}</Text>
                    <TouchableOpacity style={styles.currencyContainer} onPress={() => setModalVisible(true)}>
                        <Text style={styles.currencyText}>{selectedCurrency || currencyType}</Text>
                        <Entypo name="chevron-small-down" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.fidelityHeader}>
                <View style={styles.fidelityTitleContainer}>
                    <Text style={styles.fidelityTitle}>{t("dashboardWallat.creditsScreen.fidelity")}</Text>
                    <TouchableOpacity style={styles.fidelityButton} onPress={() => rootNavigation.navigate("wallatextract")}>
                        <Text style={[styles.fidelityTitle, { color: '#0D6EFD' }]}>{t("dashboardWallat.creditsScreen.extract")}</Text>
                        <Feather style={{ marginBottom: 7, marginLeft: 5 }} name="list" size={24} color="#0D6EFD" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchInnerContainer}>
                    <FontAwesome name="search" size={18} style={styles.searchIcon} />
                    <Input
                        placeholder={t("dashboardWallat.creditsScreen.search")}
                        onChange={(text: string) => setSearch(text)}
                        customPaddingLeft={40}
                    />
                </View>
            </View>

            <View style={styles.labelContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.label}>{t("dashboardWallat.creditsScreen.item")}</Text>
                    <Text style={styles.label}>{t("dashboardWallat.creditsScreen.value")}</Text>
                </View>
            </View>

            <View style={styles.ViewContainer}>
                {
                    loyaltyDatas.length !== 0 ?
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <LoyaltyComponent
                                    key={index}
                                    nome={item.nome}
                                    valor={item.valor}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 360 }}
                        />
                        : null
                }
            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalWrapper}>
                    <TouchableOpacity style={{ position: 'absolute', left: 20, zIndex: 10,flexDirection: 'row' }} onPress={() => setModalVisible(false)}>
                        <Feather name="arrow-left" size={30} style={{ color: 'black', marginTop: 2 }} />


                        <Text style={styles.modalText}>
                            Voltar
                        </Text>
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
                                    <Text style={{ fontSize: 18 }}>{item.currency}</Text>
                                </View>
                                {selectedCurrency === item.currency && <Feather name="check" size={24} color="black" />}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </Modal>
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
        padding: 16,
        marginTop: 8,
    },
    amountText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencyText: {
        fontSize: 24,
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
        paddingVertical: 4,
        borderColor: '#DEE2E6',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fidelityTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    fidelityButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
    searchInput: {
        borderColor: '#D7D7D7',
        borderWidth: 1,
        borderRadius: 12,
        width: '100%',
        height: 48,
        paddingLeft: 48,
        paddingRight: 20,
        fontSize: 20,
        color: 'gray',
    },
    ViewContainer: {
        paddingHorizontal: 20,
    },
    labelContainer: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    label: {
        fontSize: 16,
        color: '#4B5563',
        fontWeight: '600',
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    modalWrapper: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        height: 48,
        marginTop: 20
    },
    optionWrapper: {
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 56,
        paddingHorizontal: 20,
        fontSize: 20,
        flexDirection: 'row',
        color: '#6b7280'
    },
    optionContent: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    modalText: {
        fontSize: 24,
        textAlign: 'left',
        width: '100%',
        marginLeft: 5
    }
});
