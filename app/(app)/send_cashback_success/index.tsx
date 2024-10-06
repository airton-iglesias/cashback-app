import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather, Octicons } from '@expo/vector-icons';
import LikeIcon from '@/assets/icons/likeIcon';
import { router, useLocalSearchParams } from 'expo-router';
import { fontSize } from '@/constants/fonts';

export default function Send_Discount_Sucess() {

    const { buyValue, discountValue } = useLocalSearchParams();

    const [timeLeft, setTimeLeft] = useState(10);

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ÀS ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setCurrentDate(formattedDate);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            closeScreen();
        }
    }, [timeLeft]);

    const closeScreen = () => {
        router.replace('/(app)/dashboard/(tabs)/send_cashback');
    };
    const widthPercentage = (timeLeft / 120) * 100;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
                        <Octicons name="verified" size={14} color="#3b82f6" style={{ marginBottom: 1 }} />
                    </View>


                    <View style={{ width: '100%' }}>
                        <View style={styles.valueInfoLabelWrapper}>
                            <Text style={styles.valueInfoLabel}>Valor da compra</Text>
                            <Text style={[styles.valueInfoLabel, { fontSize: fontSize.labels.supermini, marginTop: 4 }]}>EUR</Text>
                        </View>
                        <View style={styles.valueInfoContainer}>
                            <View style={styles.valueInfoInnerContainer}>
                                <Text style={styles.valueInfoText}>{buyValue || "0,00"}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <View style={styles.discountInfoLabelWrapper}>
                            <Text style={styles.discountInfoLabel}>Desconto Imediáto</Text>
                            <Text style={[styles.discountInfoLabel, { fontSize: fontSize.labels.supermini, marginTop: 4 }]}>EUR</Text>
                        </View>
                        <View style={styles.discountInfoContainer}>
                            <View style={styles.discountInfoInnerContainer}>
                                <Text style={styles.discountInfoText}>{discountValue || "0,00"}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Feather name="check-circle" size={55} color="#4ade80" />
                    </View>

                    <View>
                        <Text style={styles.dateText}>{currentDate}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => router.replace('/(app)/dashboard/(tabs)/send_cashback')}
                            activeOpacity={0.7}
                            style={styles.buttonWrapper}
                        >
                            <View style={styles.submitButton}>
                                <LikeIcon />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.timerWrapper}>
                        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                        <View style={styles.timerVisual}>
                            <View style={[styles.innerTimerVisual, { width: `${widthPercentage}%` }]}></View>
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
        paddingTop: 60,
    },
    container: {
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 100,
        gap: 30
    },
    header: {
        fontSize: fontSize.titles.extralarge,
        fontWeight: 'bold',
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
        gap: 5,
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
        fontSize: fontSize.labels.large,
        color: 'white',
        marginBottom: 4
    },
    valueInfoLabelWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    valueInfoLabel: {
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
        color: 'white'
    },
    discountInfoLabelWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    discountInfoLabel: {
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
        color: 'black'
    },
    dateWrapper: {

    },
    dateText: {
        color: 'white',
        fontSize: fontSize.labels.medium,

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
    timerWrapper: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        gap: 5
    },
    timerText: {
        fontSize: fontSize.labels.mini,
        color: 'white'
    },
    timerVisual: {
        position: 'relative',
        height: 8,
        width: 110,
        borderRadius: 20,
        backgroundColor: '#2B2B2B',
    },
    innerTimerVisual: {
        position: 'absolute',
        height: 8,
        borderRadius: 20,
        backgroundColor: '#939393',
    }
});