import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '@/types/navigationTypes';
import Input from '@/components/input';
import CommerceHeader from '@/components/commerceComponents/commerceHeader';
import CommerceGoBackModal from '@/components/commerceComponents/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_Step_1() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

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
        commerceNavigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'home' }],
            })
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <CommerceHeader
                    Title={t("commerce.new_commerce.step1.headerLabel")}
                    ScreenGoback={() => commerceNavigation.goBack()}
                    ScreenClose={() => setModalVisible(true)}
                />

                <View style={styles.longInputWrapper}>
                    <Input
                        label={t("commerce.new_commerce.step1.titleLabel")}
                        placeholder=""
                        value={title}
                        onChange={(text: string) => setStepperData({title: text})}
                        type={'text'}
                    />
                </View>

                {PlaceType === "Físico" ?
                    null :
                    <View style={styles.selectSection}>
                        <Text style={styles.inputLabel}>{t("commerce.new_commerce.step1.associationLabel")}</Text>
                        <Select
                            options={AssociationOptions}
                            onChangeSelect={(item: any) => setStepperData({association: item.text})}
                            text={association != '' ? association : t("commerce.new_commerce.step1.selectLabel")}
                            SelectOption={SelectOption}
                        />
                    </View>
                }

                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>{t("commerce.new_commerce.step1.userPoints")}</Text>
                    <Select
                        options={userPointsOptions}
                        onChangeSelect={(item: any) => setStepperData({ userPoints: item.text})}
                        text={userPoints != '' ? userPoints : t("commerce.new_commerce.step1.selectLabel")}
                        SelectOption={SelectOption}
                    />
                </View>

                <View style={styles.longInputWrapper}>
                    <Input
                        label={t("commerce.new_commerce.step1.referedBy")}
                        placeholder={t("commerce.new_commerce.step1.ID")}
                        onChange={(text: string) => setStepperData({referenceUser: text})}
                        value={referenceUser}
                        type={'text'}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.stepperLayoutContainer}>
                    <Text style={styles.stepperLayoutText}>{t("commerce.new_commerce.step1.currentStepper")}</Text>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayoutSelected}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                </View>

                <View style={styles.nextButton}>
                    <TouchableOpacity style={styles.nextButtonContent}
                        onPress={() => commerceNavigation.navigate("new_commerce_step_2")}
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
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    inputLabel: {
        fontSize: 20,
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