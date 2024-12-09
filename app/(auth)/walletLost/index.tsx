import CommerceHeader from "@/components/commerce/commerceHeader";
import { useLocale } from "@/contexts/TranslationContext";
import { router } from "expo-router";
import { Feather, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { fontSize } from "@/constants/fonts";
import CheckBox from "@/components/checkbox";
import DeleteWarningModal from "@/components/deleteWarningModal";

export default function WalletLost() {
    const [eliminationAccepted, setEliminationAccepted] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { t } = useLocale();

    const handleDelete = () => {
        setDeleteLoading(true);
        // make the request to the server here
        // {...}


        setTimeout(() => {
            setModalVisible(false);
            setDeleteLoading(false);
            router.navigate("/walletLost/pin");
        }, 2000);

    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <CommerceHeader
                    Title={t("walletRecovery.lostPhrase.title")}
                    ScreenClose={() => router.replace("/walletRecovery")}
                />

                {/* Warning message */}
                <View style={styles.warningWrapper}>
                    <View style={styles.warning}>
                        <Text style={styles.warningTitle}>{t("walletRecovery.lostPhrase.warningTitle")}</Text>
                        <Text style={styles.warningText}>
                            {t("walletRecovery.lostPhrase.warningText")}
                        </Text>
                        <View style={styles.icon}>
                            <Ionicons name="warning-outline" size={80} color="#FC0000" />
                        </View>
                    </View>
                </View>
                {/* End of Warning message */}

                {/* Checkbox to accept the advice */}
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        onChange={() => setEliminationAccepted(!eliminationAccepted)}
                        value={eliminationAccepted}
                    />
                    <Text style={styles.checkboxText}>{t("walletRecovery.lostPhrase.warningCheckboxText")}</Text>
                </View>
                {/* End of Checkbox to accept the advice */}

                {/* Submit button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.buttonWrapper}
                        onPress={() => setModalVisible(true)}
                        disabled={!eliminationAccepted}
                    >
                        <View style={styles.submitButton}>
                            <Feather name="arrow-right" size={24} color={'white'} />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* End of Submit button */}


                <DeleteWarningModal
                    text={t("walletRecovery.lostPhrase.modalText")}
                    deleteLoading={deleteLoading}
                    handleDelete={handleDelete}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: 'white'
    },
    warningWrapper: {
        paddingHorizontal: 15
    },
    warning: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF0101',
        height: 400,
        width: '100%',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center'
    },
    warningTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: fontSize.titles.large,
        color: '#FC0000'
    },
    warningText: {
        width: '100%',
        textAlign: 'center',
        fontSize: fontSize.labels.extralarge,
        color: '#FC0000'
    },
    icon: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxText: {
        color: '#0D6EFD',
        fontSize: fontSize.labels.large,
        flex: 1
    },
    buttonContainer: {
        flex: 0.2,
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 8,
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        marginBottom: 15
    },
    buttonWrapper: {
        borderRadius: 8,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
})