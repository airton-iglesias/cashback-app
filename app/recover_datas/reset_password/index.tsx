import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import Input from "@/components/input";
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { fontSize } from "@/constants/fonts";
import { useState } from "react";

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useLocale();

    const handleSubmit = async () => {
        setLoading(true);
        if (password === confirmPassword) {
            /* make the request to the API here
            //Example: 
            const passowrdResponse = await
                fetch('domain of application here', {
                    method: 'POST',
                    body: JSON.stringify({
                        password: password,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Something went wrong');
                })
                .catch((error) => {
                    console.log(error)
                });

                //...Other things
            */

            setTimeout(() => {
                setLoading(false);
                router.push('/recover_datas/reset_success');
            }, 1000);
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.infoWrapper}>
                    <Text style={styles.infoText}>{t("recoveryDatas.newPasswordLabel")}</Text>
                    <Text style={styles.infolabel}>{t("recoveryDatas.requirementsLabel")}</Text>
                    <View style={{ width: '100%', paddingHorizontal: 15, marginTop: 20 }}>
                        <Input
                            label={t("recoveryDatas.password")}
                            onChange={(Text: string) => setPassword(Text)}
                        />
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 15, marginTop: 20 }}>
                        <Input
                            label={t("recoveryDatas.confirmPassword")}
                            onChange={(Text: string) => setConfirmPassword(Text)}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <View style={styles.submitButton}>
                            {loading ?
                                <ActivityIndicator size={24} color="#fff" />
                                :
                                <Feather name="arrow-right" size={24} color={'white'} />
                            }
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
    infoText: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'bold',
        marginTop: 25
    },
    infolabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: '400',
        marginTop: 10,
        width: 300,
        textAlign: 'center'
    },
    backButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: fontSize.titles.large,
        fontWeight: '700',
        left: 40
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
    infoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
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