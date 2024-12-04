import { fontSize } from "@/constants/fonts";
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Input from "@/components/input";
import { useLocale } from "@/contexts/TranslationContext";

export default function LoyaltyComponent({ loyaltyDatas, setSearch, loading }: any) {
    const [searchText, setSearchText] = useState('');


    const { t } = useLocale();

    const filteredLoyaltyDatas = loyaltyDatas.filter((item: any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={{flex: 1}}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInnerContainer}>
                    <FontAwesome name="search" size={18} style={styles.searchIcon} />
                    <Input
                        placeholder={t("dashboardWallat.creditsScreen.search")}
                        onChange={(text: string) => setSearchText(text)}
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

            <View style={styles.listContainer}>
                <FlatList
                    data={filteredLoyaltyDatas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View style={styles.componentContainer}>
                            <View style={styles.componentSubContainer}>
                                <Text numberOfLines={1} style={styles.componentName}>{item.name}</Text>
                            </View>
                            <View style={styles.componentValueLimitContainer}>
                                <View style={styles.componentValueContainer}>
                                    <Text numberOfLines={1} style={styles.componentValue}>
                                        {item.value}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                />

     
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    componentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    componentSubContainer: {
        flex: 1,
    },
    componentLabel: {
        fontSize: fontSize.labels.medium,
        color: '#4B5563',
        fontWeight: '600',
    },
    componentName: {
        fontSize: fontSize.labels.medium,
        marginTop: 8,
    },
    componentValueLimitContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    componentValueContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 8,
    },
    componentValue: {
        fontSize: fontSize.labels.medium,
        marginTop: 8,
    },
    listContainer: {
        paddingHorizontal: 20,
        height: '100%',
        zIndex: 50
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
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    emptyText: {
        fontSize: fontSize.labels.medium,
        color: '#4B5563',
        textAlign: 'center',
    },
});
