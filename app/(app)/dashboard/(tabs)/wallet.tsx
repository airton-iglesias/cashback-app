import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import WallatCredits from "@/components/wallat/wallatCredits";
import WallatTokens from "@/components/wallat/wallatTokens";
import { useLocale } from "@/contexts/TranslationContext";
import CreditsExtractModal from "@/components/creditsExtractModal";
import { fontSize } from "@/constants/fonts";

export default function Wallat() {
    const [tokenScreen, setTokenScreen] = useState(false);
    const { t } = useLocale();
    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => setTokenScreen(false)}>
                    <View style={styles.buttonContainer}>
                        <View style={tokenScreen ? null : styles.buttonActive}>
                            <Text style={styles.buttonText}>{t("dashboardWallat.switchScreen.credits")}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setTokenScreen(true)}>
                    <View style={styles.buttonContainer}>
                        <View style={tokenScreen ? styles.buttonActive : null}>
                            <Text style={styles.buttonText}>{t("dashboardWallat.switchScreen.tokens")}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {tokenScreen ?
                <WallatTokens
                    openExtract={() => setModalVisible(!modalVisible)}
                />
                :
                <WallatCredits
                    openExtract={() => setModalVisible(!modalVisible)}
                />
            }

            <CreditsExtractModal
                modalVisible={modalVisible}
                handleCloseModal={handleCloseModal}
            />
        </SafeAreaView>
    );
};

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
        fontSize: fontSize.labels.medium,
        fontWeight: '600',
    },
});
