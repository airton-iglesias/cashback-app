import React from 'react';
import { ScrollView, TextInput, View, Text, StyleSheet, Pressable } from 'react-native';
import LoyaltyComponent from './loyaltyComponent';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, WallatStackParamList } from '@/types/navigationTypes';

type WallatNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WallatCredits() {

    const rootNavigation = useNavigation<WallatNavigationProp>();

    const itemData = [
        {
            creditsAmount: "50,00",
            currencyType: "cEUR"
        }
    ];

    const loyaltyDatas = [
        {
            nome: "Nome",
            valor: "100,00",
            limite: "2000,00"
        },
        {
            nome: "Nome",
            valor: "100,00",
            limite: "2000,00"
        },

        {
            nome: "Nome",
            valor: "100,00",
            limite: "2000,00"
        },
    ];


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>{itemData[0].creditsAmount}</Text>
                    <View style={styles.currencyContainer}>
                        <Text style={styles.currencyText}>{itemData[0].currencyType}</Text>
                        <Entypo name="chevron-small-down" size={24} color="black" />
                    </View>
                </View>
            </View>

            <View style={styles.fidelityHeader}>
                <View style={styles.fidelityTitleContainer}>
                    <Text style={styles.fidelityTitle}>Fidelidade</Text>
                    <Pressable style={styles.fidelityButton} onPress={() => rootNavigation.navigate("wallatextract")}>
                        <Text style={[styles.fidelityTitle, { color: '#0D6EFD' }]}>Extrato</Text>
                        <Feather style={{ marginBottom: 7, marginLeft: 5 }} name="list" size={24} color="#0D6EFD" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchInnerContainer}>
                    <FontAwesome name="search" size={18} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Buscar"
                        style={styles.searchInput}
                    />
                </View>
            </View>
            <View style={styles.labelContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.label}>Item</Text>
                    <Text style={styles.label}>Valor</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {
                    loyaltyDatas.length !== 0 ? loyaltyDatas.map((item, index) =>
                        <LoyaltyComponent
                            key={index}
                            nome={item.nome}
                            valor={item.valor}
                            limite={item.limite}
                        />
                    ) : null
                }
            </ScrollView>
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
        textAlign: 'center',
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
    scrollViewContainer: {
        paddingHorizontal: 20,
        paddingBottom: 96
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
    }
});
