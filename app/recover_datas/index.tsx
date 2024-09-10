import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Octicons, Feather } from '@expo/vector-icons';
import Input from "@/components/input";
import { useState } from "react";
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';

export default function RecoveryDatas() {

    const [email, setEmail] = useState('');
    const { t } = useLocale();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Octicons name="chevron-left" size={32} color="black" />
                            <Text style={styles.headerText}>{t("recoveryDatas.goBack")}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputWrapper}>
                        <Input
                            label={t("recoveryDatas.inputLabel")}
                            onChange={(text: string) => setEmail(text)}
                            type={'email'}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.buttonWrapper}
                        onPress={() => router.push('/recover_datas/checkinbox')}
                    >
                        <View style={styles.submitButton}>
                            <Feather name="arrow-right" size={24} color={'white'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 30,
        justifyContent: 'space-between',
        height: '100%'
    },
    backButton: {
        position: 'absolute',
        left: 25,
        width: 60,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        width: 40,
        height: 40,
        paddingBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        left: 15,
        marginBottom: 4
    },
    headerButtonLeft: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonRight: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        paddingHorizontal: 15,
        marginTop: 15
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