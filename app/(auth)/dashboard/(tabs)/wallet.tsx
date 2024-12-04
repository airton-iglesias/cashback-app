import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions } from "react-native";
import { useLocale } from "@/contexts/TranslationContext";
import CreditsExtractModal from "@/components/creditsExtractModal";
import { fontSize } from "@/constants/fonts";
import WallatCredits from "@/components/wallat/wallatCredits";
import WallatTokens from "@/components/wallat/wallatTokens";

const { width } = Dimensions.get('window');

export default function Wallat() {
    const [isScreenChanged, setIsScreenChanged] = useState(false);
    const { t } = useLocale();
    const [modalVisible, setModalVisible] = useState(false);
    const position = useRef(new Animated.Value(0)).current;

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        Animated.timing(position, {
            toValue: isScreenChanged ? -width : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isScreenChanged]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <TouchableWithoutFeedback onPress={() => setIsScreenChanged(false)}>
                    <View style={styles.buttonContainer}>
                        <View style={!isScreenChanged ? styles.buttonActive : null}>
                            <Text style={styles.buttonText}>{t("dashboardWallat.switchScreen.credits")}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setIsScreenChanged(true)}>
                    <View style={styles.buttonContainer}>
                        <View style={isScreenChanged ? styles.buttonActive : null}>
                            <Text style={styles.buttonText}>{t("dashboardWallat.switchScreen.tokens")}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>

            <Animated.View style={[styles.content, { transform: [{ translateX: position }] }]}>

                <View style={{ width }}>
                    <WallatCredits openExtract={() => setModalVisible(!modalVisible)} />
                </View>

                <View style={{ width }}>
                    <WallatTokens openExtract={() => setModalVisible(!modalVisible)} />
                </View>

            </Animated.View>

            <View>
                <CreditsExtractModal
                    modalVisible={modalVisible}
                    handleCloseModal={handleCloseModal}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 80,
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
    content: {
        flexDirection: 'row',
        width: width * 2,
        flex: 1
    },
});
