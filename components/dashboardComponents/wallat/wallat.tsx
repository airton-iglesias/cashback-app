import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import WallatCredits from "./wallatCredits";
import WallatTokens from "./wallatTokens";

export default function Wallat() {
    const [tokenScreen, setTokenScreen] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => setTokenScreen(false)}>
                    <View style={styles.buttonContainer}>
                        <View style={tokenScreen ? null : styles.buttonActive}>
                            <Text style={styles.buttonText}>Créditos</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setTokenScreen(true)}>
                    <View style={styles.buttonContainer}>
                        <View style={tokenScreen ? styles.buttonActive : null}>
                            <Text style={styles.buttonText}>Token</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {tokenScreen ? <WallatTokens /> : <WallatCredits />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 110,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        height: 70,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});
