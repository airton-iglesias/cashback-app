import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import Input from '@/components/input';
import CommerceHeader from '@/components/commerceHeader';
import CommerceGoBackModal from '@/components/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import FooterNewCommerce from '@/components/footerNewCommerce';
import { fontSize } from '@/constants/fonts';

export default function New_Commerce_Step_2() {

    const { PlaceType, referenceUser,
        association, title, userPoints, setStepperData
    } = useStepperContext();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { t } = useLocale();

    const AssociationOptions = [
        { id: 1, text: 'Promoção' },
        { id: 2, text: 'Evento' },
    ];
    const userPointsOptions = [
        { id: 1, text: 'Airton' },
        { id: 2, text: 'Luis' },
        { id: 3, text: 'Bruno' },
    ];

    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        router.replace("/commerce")
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <CommerceHeader
                    Title={t("commerce.new_commerce.step1.headerLabel")}
                    ScreenClose={() => setModalVisible(true)}
                />

                <View style={styles.longInputWrapper}>
                    <Input
                        label={t("commerce.new_commerce.step1.titleLabel")}
                        placeholder=""
                        value={title}
                        onChange={(text: string) => setStepperData({ title: text })}
                        type={'text'}
                    />
                </View>


                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>{t("commerce.new_commerce.step1.associationLabel")}</Text>
                    <Select
                        options={AssociationOptions}
                        onChangeSelect={(item: any) => setStepperData({ association: item.text })}
                        text={association != '' ? association : t("commerce.new_commerce.step1.selectLabel")}
                        SelectOption={SelectOption}
                    />
                </View>


                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>{t("commerce.new_commerce.step1.userPoints")}</Text>
                    <Select
                        options={userPointsOptions}
                        onChangeSelect={(item: any) => setStepperData({ userPoints: item.text })}
                        text={userPoints != '' ? userPoints : t("commerce.new_commerce.step1.selectLabel")}
                        SelectOption={SelectOption}
                    />
                </View>

                <View style={styles.longInputWrapper}>
                    <Input
                        label={t("commerce.new_commerce.step1.referedBy")}
                        placeholder={t("commerce.new_commerce.step1.ID")}
                        onChange={(text: string) => setStepperData({ referenceUser: text })}
                        value={referenceUser}
                        type={'text'}
                    />
                </View>
            </ScrollView>

            <FooterNewCommerce
                backStep={() => router.back()}
                nextStep={()=> router.push("/commerce/new/place_and_time")}
                currentStep={2}
            />

            <CommerceGoBackModal
                modalVisible={modalVisible}
                setModalVisible={() => setModalVisible(false)}
                ScreenGoback={handleGoBackConfirmed}
            />
        </SafeAreaView >
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
    inputLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4
    },
    longInputWrapper: {
        paddingHorizontal: 15,
        marginTop: 24,
    },
    selectSection: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
    }
});