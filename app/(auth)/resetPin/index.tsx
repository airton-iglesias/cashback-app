import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { fontSize } from "@/constants/fonts";

export default function VerificationCodeSent() {
    const { t } = useLocale();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* header */}
                <View style={styles.infoWrapper}>
                    <Feather name="send" size={71} color="black" />
                    <Text style={styles.infoText}>{t("signup.verificationCodeSent.title")}</Text>
                </View>
                {/* End of header */}

                {/* Submit button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.buttonWrapper}
                        onPress={() => router.navigate("/resetPin/verificationCode")}
                    >
                        <View style={styles.submitButton}>
                            <Feather name="arrow-right" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Enf of Submit button */}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 30,
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: 'white'
    },
    infoText: {
        fontSize: fontSize.titles.mini,
        fontWeight: 'bold',
        marginTop: 25,
        paddingHorizontal: 25,
        textAlign: 'center'
    },
    infoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120
    },
    buttonContainer: {
        flex: 1,
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
});