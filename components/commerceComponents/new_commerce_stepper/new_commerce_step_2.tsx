import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '@/types/navigationTypes';
import Input from '@/components/input';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CommerceHeader from '../commerceHeader';
import CommerceGoBackModal from '../commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function New_Commerce_Step_2() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const { PlaceType,
        webSite,
        startDate,
        endDate,
        startHour,
        endHour,
        mapAdress, setStepperData
    } = useStepperContext();

    const { t } = useLocale();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const INITIAL_REGION = {
        latitude: 38.7266085,
        longitude: -9.1503216,
        latitudeDelta: 2,
        longitudeDelta: 2,
    };

    const handleGoBackConfirmed = () => {
        setModalVisible(false);

        commerceNavigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'home' }],
            })
        );
        return;
    };


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <CommerceHeader
                        Title={t("commerce.new_commerce.step2.headerLabel")}
                        ScreenGoback={() => commerceNavigation.goBack()}
                        ScreenClose={() => setModalVisible(true)}
                    />

                    <View style={styles.longInputWrapper}>
                        <Input
                            label={t("commerce.new_commerce.step2.webSite")}
                            value={webSite}
                            placeholder={t("commerce.new_commerce.step2.webSitePlaceholder")}
                            type={'url'}
                            onChange={(text: string) => setStepperData({webSite: text})}
                        />
                    </View>

                    <View style={styles.dateTimeSection}>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={t("commerce.new_commerce.step2.startDate")}
                                value={startDate}
                                maxLength={10}
                                type={'date'}
                                onChange={(text: string) => setStepperData({startDate: text})}
                            />
                        </View>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={t("commerce.new_commerce.step2.endDate")}
                                value={endDate}
                                maxLength={10}
                                type={'date'}
                                onChange={(text: string) => setStepperData({endDate: text})}
                            />
                        </View>
                    </View>

                    <View style={styles.dateTimeSection}>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={t("commerce.new_commerce.step2.startHour")}
                                value={startHour}
                                type={'time'}
                                maxLength={8}
                                onChange={(text: string) => setStepperData({startHour: text})}
                            />
                        </View>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={t("commerce.new_commerce.step2.endHour")}
                                value={endHour}
                                type={'time'}
                                maxLength={8}
                                onChange={(text: string) => setStepperData({endHour: text})}
                            />
                        </View>
                    </View>

                    {PlaceType && PlaceType === "Físico" ?
                        <View>
                            <View style={styles.longInputWrapper}>
                                <Input
                                    label={t("commerce.new_commerce.step2.locationLabel")}
                                    value={mapAdress}
                                    placeholder={t("commerce.new_commerce.step2.adressPlaceholder")}
                                    onChange={(text: string) => setStepperData({mapAdress: text})}
                                />
                            </View>
                            <View style={styles.mapContainer}>
                                <View style={styles.mapPlaceholder}>
                                    <MapView
                                        style={styles.map}
                                        provider={PROVIDER_GOOGLE}
                                        zoomEnabled={true}
                                        scrollEnabled={true}
                                        showsUserLocation={true}
                                        initialRegion={INITIAL_REGION}
                                    />
                                </View>
                            </View>
                        </View>
                        :
                        null
                    }
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>{t("commerce.new_commerce.step2.currentStepper")}</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                    </View>

                    <View style={styles.nextButton}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.nextButtonContent}
                            onPress={() => commerceNavigation.navigate("new_commerce_step_3")}
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    inputSection: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 4
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: 18,
        color: '#ADB5BD',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
        borderRadius: 10,
        opacity: 0,
    },
    inputHighlightVisible: {
        opacity: 0.15,
        borderColor: '#6610F2',
    },
    inputFocused: {
        borderColor: '#000000',
    },
    inputError: {
        borderColor: '#DC3545',
    },
    inputErrorHighlight: {
        opacity: 0.20,
        borderColor: '#DC3545',
    },

    longInputWrapper: {
        paddingHorizontal: 15,
        marginTop: 20,
    },
    dateTimeSection: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        gap: 15
    },
    dateTimeBlock: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    mapContainer: {
        width: '100%',
        height: 205,
        paddingHorizontal: 16,
        marginTop: 24,
    },
    mapPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    mapText: {
        fontSize: 24,
        color: '#6C757D',
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
    map: {
        width: '100%',
        height: '100%',
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
