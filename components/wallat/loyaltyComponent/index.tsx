import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LoyaltyComponent({ nome, valor }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text numberOfLines={1} style={styles.name}>{nome}</Text>
            </View>
            <View style={styles.valueLimitContainer}>
                <View style={styles.valueContainer}>
                    <Text numberOfLines={1} style={styles.value}>{valor}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: '#4B5563',
        fontWeight: '600',
    },
    name: {
        fontSize: 20,
        marginTop: 8,
    },
    valueLimitContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    valueContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 8,
    },
    value: {
        fontSize: 20,
        marginTop: 8,
    },

});
