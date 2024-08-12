import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import WallatCredits from "./wallatCredits";
import WallatTokens from "./wallatTokens";

export default function Wallat() {
    const [tokenScreen, setTokenScreen] = useState(false);

    const [datas, setDatas] = useState([
        {
            creditsAmount: "50,00",
            currencyType: "cEUR",
            tokensAmount: "999999999999999,00",
            tokensBlockedAmount: "99999999999999,00",
            token: "X",
            blockChain: "XXXX",
            wallatLink: "https://www.google.com",
            loyaltyDatas: [
                {
                    id: "1",
                    nome: "Rei do bacalhau",
                    valor: "100,00",
                },
                {
                    id: "2",
                    nome: "Rei do sorvete",
                    valor: "100,00",
                },
                {
                    id: "3",
                    nome: "Rei do peixe",
                    valor: "100,00",
                },
                {
                    id: "4",
                    nome: "Sorveteria",
                    valor: "100,00",
                },
                {
                    id: "5",
                    nome: "Pizzaria",
                    valor: "100,00",
                },
            ],
        }
    ]);

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

            {tokenScreen ?
                <WallatTokens
                    tokensAmount={datas[0].tokensAmount}
                    tokensBlockedAmount={datas[0].tokensBlockedAmount}
                    token={datas[0].token}
                    blockChain={datas[0].blockChain}
                    wallatLink={datas[0].wallatLink}
                />
                :
                <WallatCredits
                    loyaltyDatas={datas[0].loyaltyDatas}
                    currencyType={datas[0].currencyType}
                    creditsAmount={datas[0].creditsAmount}
                />
            }
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
