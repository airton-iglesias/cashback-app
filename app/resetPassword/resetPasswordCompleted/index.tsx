import React, { useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { fontSize } from "@/constants/fonts";
import { useLocale } from '@/contexts/TranslationContext';

export default function resetPasswordCompleted() {

    const { RequestSuccessful } = useLocalSearchParams();
    const { t } = useLocale();
    
    console.log(RequestSuccessful)

    {/* Redirect to the signin screen after 3 seconds */ }
    useEffect(() => {
        const timeout = setTimeout(() => {
            // redirect to the signin screen
            router.replace("/");
        }, 3000);
        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Checkmark icon */}
            <View style={styles.content}>
                {RequestSuccessful === 'true' ? (
                    <Feather name="check-circle" size={85} color="#4ade80" />
                ) : (
                    <View style={styles.content}>
                        <Feather name="x-circle" size={85} color="#ef4444" />
                        <Text style={styles.text}>{t("signup.register_completed.error")}</Text>
                    </View>
                )}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: fontSize.titles.mini,
        color: 'white',
        marginTop: 25,
    }
});
