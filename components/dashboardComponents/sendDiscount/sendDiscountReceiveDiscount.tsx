import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SendDiscountParamList } from '@/types/navigationTypes';
import { Feather, Octicons } from '@expo/vector-icons';
import LikeIcon from '@/assets/icons/likeIcon';

export default function Send_Discount_Receive_Discount() {
    const withdrawNavigation = useNavigation<NavigationProp<SendDiscountParamList>>();

    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);
    const [password, setPassword] = useState('');

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() === '') {
            setInputPasswordError(false);
        } else {
            setInputPasswordError(!validatePassword(text));
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.header}>Receber Desconto</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoInnerContainer}>
                            <View style={styles.iconCircle}></View>
                            <Text style={styles.infoText}>nome</Text>
                        </View>
                        <Octicons name="verified" size={24} color="#3b82f6" />
                    </View>


                    <View style={{ width: '100%' }}>
                        <View style={styles.valueInfoLabelWrapper}>
                            <Text style={styles.valueInfoLabel}>Valor da compra</Text>
                            <Text style={[styles.valueInfoLabel, { fontSize: 12, marginTop: 4 }]}>EUR</Text>
                        </View>
                        <View style={styles.valueInfoContainer}>
                            <View style={styles.valueInfoInnerContainer}>
                                <Text style={styles.valueInfoText}>00,00</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <View style={styles.discountInfoLabelWrapper}>
                            <Text style={styles.discountInfoLabel}>Desconto Imediáto</Text>
                            <Text style={[styles.discountInfoLabel, { fontSize: 12, marginTop: 4 }]}>EUR</Text>
                        </View>
                        <View style={styles.discountInfoContainer}>
                            <View style={styles.discountInfoInnerContainer}>
                                <Text style={styles.discountInfoText}>0000000,00</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Feather name="check-circle" size={55} color="#4ade80" />
                    </View>

                    <View>
                        <Text style={styles.dateText}>DD/MM/AAAA ÀS 20:00</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            underlayColor="#e5e7eb"
                            activeOpacity={0.6}
                            style={styles.buttonWrapper}
                        >
                            <View style={styles.submitButton}>
                                <LikeIcon/>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.timerWrapper}>
                        <Text style={styles.timerText}>01:59</Text>
                        <View style={styles.timerVisual}>
                            <View style={styles.innerTimerVisual}></View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 110,
    },
    container: {
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 100,
        gap: 20
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        color: 'white'
    },
    infoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 64,
        backgroundColor: '#343A40',
        borderRadius: 8,
        alignItems: 'center',
        gap: 10
    },
    infoInnerContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    iconCircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        marginRight: 16,
    },
    infoText: {
        fontSize: 24,
        color: 'white',
        marginBottom: 4
    },
    valueInfoLabelWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    valueInfoLabel: {
        fontSize: 17,
        marginBottom: 8,
        color: 'white'
    },
    valueInfoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 68,
        backgroundColor: '#343A40',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueInfoInnerContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    valueInfoText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    discountInfoLabelWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    discountInfoLabel: {
        fontSize: 17,
        marginBottom: 8,
        color: '#5EFFCF'
    },
    discountInfoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: '100%',
        height: 68,
        backgroundColor: '#D1E7DD',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discountInfoInnerContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    discountInfoText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black'
    },
    dateWrapper: {

    },
    dateText: {
        color: 'white',
        fontSize: 18,

    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        paddingBottom: 8,
        justifyContent: 'flex-end',
        marginTop: 5
    },
    buttonWrapper: {
        borderRadius: 8,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#232323',
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    timerWrapper:{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        gap: 5
    },
    timerText:{
        fontSize: 13,
        color: 'white'
    },
    timerVisual: {
        position: 'relative',
        height: 8,
        width: 110,
        borderRadius: 20,
        backgroundColor: '#2B2B2B',
    },
    innerTimerVisual:{
        position: 'absolute',
        width: '60%',
        height: 8,
        borderRadius: 20,
        backgroundColor: '#939393',
    }
});
