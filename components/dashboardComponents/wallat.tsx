import { SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import WallatCredits from "./wallatCredits";
import WallatTokens from "./wallatTokens";


export default function Wallat() {

    const [tokenScreen, setTokenScreen] = useState(false)

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className={'flex-row justify-center items-center bg-gray-100 h-[62px] px-4 border-b border-gray-300'}>
                <TouchableWithoutFeedback onPress={() => setTokenScreen(false)}>
                    <View className="flex-1 w-full h-auto justify-center items-center">
                        <View style={tokenScreen ? null : styles.ButtonActive} className="w-full h-10 items-center justify-center rounded-lg">
                            <Text className={'text-xl font-semibold'}>Créditos</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setTokenScreen(true)}>
                    <View className="flex-1 w-full h-auto justify-center items-center">
                        <View style={tokenScreen ? styles.ButtonActive : null} className="w-full h-10 items-center justify-center rounded-lg">
                            <Text className={'text-xl font-semibold'}>Token</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {tokenScreen ? <WallatTokens/>:<WallatCredits/>}

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    ButtonActive: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: 'white'
    },
});