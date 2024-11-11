import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocale } from "@/contexts/TranslationContext";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { fontSize } from '@/constants/fonts';
import { router } from 'expo-router';

export default function Send_Discount_Home({ changeScreen }: any) {
    const [commerceID, setCommerceID] = useState<string>('');
    const { t } = useLocale();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>{t("send_discount.home.get_discount")}</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            textAlign='center'
                            value={commerceID}
                            onChangeText={setCommerceID}
                            placeholder={t("send_discount.home.commerce_id")}
                            onSubmitEditing={() => changeScreen("amountValue")}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.qrcodeContainer} onPress={() => router.navigate("/dashboard/qrcode")} activeOpacity={0.7}>
                    <View style={styles.qrcodeSubContainer}>
                        <MaterialCommunityIcons name="line-scan" size={100} color="white" />
                    </View>
                </TouchableOpacity>

                <View style={styles.qrcodeTextContainer}>
                    <Text style={styles.qrcodeText}>{t("send_discount.home.description1")}</Text>
                    <Text style={styles.qrcodeText}>{t("send_discount.home.description2")}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        paddingHorizontal: 40,
        alignItems: 'center',
        gap: 35,
        paddingTop: 110
    },
    header: {
        fontSize: fontSize.titles.extralarge,
        fontWeight: 'bold',
        marginTop: 30
    },
    qrcodeContainer: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#B3B3B3',
        alignItems: 'center',
        padding: 15,
        marginTop: 50
    },
    qrcodeWrapper: {
        width: '100%',
        height: 280,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#B3B3B3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrcodeIcon: {
        backgroundColor: '#B3B3B3',
        borderRadius: 15,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrcodeTextContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    qrcodeText: {
        fontSize: fontSize.labels.medium,
        fontWeight: '400',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: fontSize.labels.medium,
        color: '#000',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
    },
    inputWrapper: {
        position: 'relative',
        width: '90%'
    },
    copyIconContainer: {
        position: 'absolute',
        height: '100%',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#F3F4F6',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderColor: '#E9ECEF',
        borderWidth: 1,
        zIndex: 10,
    },
    printerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    qrcodeSubContainer: {
        backgroundColor: '#B3B3B3',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});