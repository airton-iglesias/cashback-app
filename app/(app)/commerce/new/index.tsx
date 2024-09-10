import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, BackHandler } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CommerceHeader from '@/components/commerceHeader';
import RadioCommerce from '@/components/radioCommerce';
import RadioCommerceType from '@/components/radioCommerceType';
import CommerceGoBackModal from '@/components/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { useFocusEffect, router, useLocalSearchParams } from 'expo-router';


export default function New_Commerce() {

    const  { editor }   = useLocalSearchParams();

    const {
        selectedType, selectedPlace, setStepperData
    } = useStepperContext();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState(false);
    const { t } = useLocale();

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (!modalVisible) {
                    setModalVisible(true);
                    return true;
                }
                return false;
            };
            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                backHandler.remove();
            };
        }, [modalVisible])
    );

    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        if (isClosing) {
            router.replace("/commerce");
            return;
        }
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <CommerceHeader
                    Title={editor === "true" ? t("commerce.new_commerce.step0.edit") : t("commerce.new_commerce.step0.new")}
                    ScreenGoback={() => router.back()}
                    ScreenClose={() => router.replace("/commerce")}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step0.typeLabel")}</Text>
                    <RadioCommerceType
                        selected={selectedType}
                        options={[t("commerce.new_commerce.step0.permanent"), t("commerce.new_commerce.step0.event"), t("commerce.new_commerce.step0.promotion")]}
                        onChangeSelect={(opt, i) => setStepperData({ CashbackType: opt, selectedType: i })}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { marginTop: 10, marginBottom: 35 }]}>{t("commerce.new_commerce.step0.placeLabel")}</Text>
                    <RadioCommerce
                        selected={selectedPlace}
                        options={[t("commerce.new_commerce.step0.fisic"), t("commerce.new_commerce.step0.web")]}
                        onChangeSelect={(opt, i) => setStepperData({ PlaceType: opt, selectedPlace: i })}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.stepperLayoutContainer}>
                    <Text style={styles.stepperLayoutText}>{t("commerce.new_commerce.step0.currentStepper")}</Text>
                    <View style={styles.stepperLayoutSelected}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                </View>
                <View style={styles.nextButton}>
                    <TouchableOpacity style={styles.nextButtonContent}
                        onPress={() => router.push("/commerce/new/basic_datas")}
                        activeOpacity={0.7}
                    >
                        <Feather name="arrow-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <CommerceGoBackModal
                modalVisible={modalVisible}
                setModalVisible={() => setModalVisible(false)}
                ScreenGoback={handleGoBackConfirmed}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    section: {
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 18,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 120
    },
    stepperLayoutContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    stepperLayout: {
        height: 6,
        width: 14,
        backgroundColor: '#121212',
        borderRadius: 22,
        opacity: 0.5,
        marginTop: 2
    },
    stepperLayoutSelected: {
        opacity: 1,
        width: 31,
        backgroundColor: '#121212',
        borderRadius: 22,
        height: 6,
        marginTop: 2
    },
    stepperLayoutText: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    nextButton: {
        borderRadius: 8,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 78,
        height: 78,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
});
