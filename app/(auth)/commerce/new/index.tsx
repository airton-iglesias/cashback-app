import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, BackHandler } from 'react-native';
import CommerceHeader from '@/components/commerce/commerceHeader';
import RadioCommerce from '@/components/commerce/radioCommerce';
import RadioCommerceType from '@/components/commerce/radioCommerceType';
import CommerceGoBackModal from '@/components/commerce/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { useFocusEffect, router, useLocalSearchParams } from 'expo-router';
import FooterNewCommerce from '@/components/commerce/footerNewCommerce';
import { fontSize } from '@/constants/fonts';


export default function New_Commerce() {

    const { editor } = useLocalSearchParams();

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
                    ScreenClose={() => setModalVisible(true)}
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

            <FooterNewCommerce
                backStep={() => router.back()}
                nextStep={() => router.push("/commerce/new/basic_datas")}
                currentStep={1}
            />
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
        marginTop: 25,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: fontSize.titles.mini,
        fontWeight: 'bold',
        marginBottom: 30,
    },
});
