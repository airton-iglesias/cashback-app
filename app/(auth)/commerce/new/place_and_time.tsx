import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Input from '@/components/input';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CommerceHeader from '@/components/commerce/commerceHeader';
import CommerceGoBackModal from '@/components/commerce/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import FooterNewCommerce from '@/components/commerce/footerNewCommerce';
import { Skeleton } from 'moti/skeleton';

// Import react-hook-form and zod
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getNewCommerceStep3Schema, NewCommerceStep3Data } from '@/schemas/commerceSchemas';

export default function New_Commerce_Step_3() {
    // Get data from context
    const {
        PlaceType,
        CashbackType,
        webSite,
        startDate,
        endDate,
        startHour,
        endHour,
        mapAdress,
        setStepperData,
    } = useStepperContext();

    // Localization function
    const { t } = useLocale();

    // Local state for modal visibility and map loading
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [mapLoading, setMapLoading] = useState<boolean>(true);

    // Define initial map region
    const INITIAL_REGION = {
        latitude: 38.7266085,
        longitude: -9.1503216,
        latitudeDelta: 2,
        longitudeDelta: 2,
    };

    // Handle go back confirmation
    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        router.replace("/commerce");
    };

    // React Hook Form setup
    const newCommerceStep3Schema = React.useMemo(
        () => getNewCommerceStep3Schema(t, CashbackType, PlaceType),
        [t, CashbackType, PlaceType]
    );

    const { control, handleSubmit, formState: { errors } } = useForm<NewCommerceStep3Data>({
        resolver: zodResolver(newCommerceStep3Schema),
        mode: 'onChange',
        defaultValues: {
            webSite,
            startDate,
            endDate,
            startHour,
            endHour,
            mapAdress,
        },
    });

    // Handle form submission
    const onSubmit = (data: NewCommerceStep3Data) => {
        // Update the context with the form data
        setStepperData({
            webSite: data.webSite,
            startDate: data.startDate,
            endDate: data.endDate,
            startHour: data.startHour,
            endHour: data.endHour,
            mapAdress: data.mapAdress
        });
        // Navigate to the next step
        router.push("/commerce/new/description");
    };

    // Function to format date to DD/MM/YYYY
    const formatDate = (value: string) => {
        const digits = value.replace(/\D/g, '');
        let formattedValue = '';

        if (digits.length > 0) {
            formattedValue += digits.substring(0, 2);
        }
        if (digits.length >= 3) {
            formattedValue += '/' + digits.substring(2, 4);
        }
        if (digits.length >= 5) {
            formattedValue += '/' + digits.substring(4, 8);
        }

        return formattedValue;
    };

    // Function to format time to HH:MM
    const formatTime = (value: string) => {
        const digits = value.replace(/\D/g, '');
        let formattedValue = '';

        if (digits.length > 0) {
            formattedValue += digits.substring(0, 2);
        }
        if (digits.length >= 3) {
            formattedValue += ':' + digits.substring(2, 4);
        }

        return formattedValue;
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {/* Header with close modal */}
                    <CommerceHeader
                        Title={t("commerce.new_commerce.step2.headerLabel")}
                        ScreenClose={() => setModalVisible(true)}
                    />

                    {/* WebSite Input */}
                    <View style={styles.longInputWrapper}>
                        <Controller
                            control={control}
                            name="webSite"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label={t("commerce.new_commerce.step2.webSite")}
                                    value={value}
                                    placeholder={t("commerce.new_commerce.step2.webSitePlaceholder")}
                                    type={'url'}
                                    onChange={onChange}
                                    error={errors.webSite?.message}
                                />
                            )}
                        />
                    </View>

                    {/* Conditional rendering for date and time inputs if CashbackType is not "Permanente" */}
                    {CashbackType !== "Permanente" && (
                        <View>
                            {/* Date Inputs */}
                            <View style={styles.dateTimeSection}>
                                <View style={styles.dateTimeBlock}>
                                    <Controller
                                        control={control}
                                        name="startDate"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label={t("commerce.new_commerce.step2.startDate")}
                                                value={value}
                                                maxLength={10}
                                                type={'date'}
                                                keyboardType={'numeric'}
                                                onChange={(text) => {
                                                    const formattedText = formatDate(text);
                                                    onChange(formattedText);
                                                    setStepperData({ startDate: formattedText });
                                                }}
                                                error={errors.startDate?.message}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.dateTimeBlock}>
                                    <Controller
                                        control={control}
                                        name="endDate"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label={t("commerce.new_commerce.step2.endDate")}
                                                value={value}
                                                maxLength={10}
                                                type={'date'}
                                                keyboardType={'numeric'}
                                                onChange={(text) => {
                                                    const formattedText = formatDate(text);
                                                    onChange(formattedText);
                                                    setStepperData({ endDate: formattedText });

                                                }}
                                                error={errors.endDate?.message}
                                            />
                                        )}
                                    />
                                </View>
                            </View>

                            {/* Time Inputs */}
                            <View style={styles.dateTimeSection}>
                                <View style={styles.dateTimeBlock}>
                                    <Controller
                                        control={control}
                                        name="startHour"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label={t("commerce.new_commerce.step2.startHour")}
                                                value={value}
                                                type={'time'}
                                                maxLength={5}
                                                keyboardType={'numeric'}
                                                onChange={(text) => {
                                                    const formattedText = formatTime(text);
                                                    onChange(formattedText);
                                                    setStepperData({ startHour: formattedText });
                                                }}
                                                error={errors.startHour?.message}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.dateTimeBlock}>
                                    <Controller
                                        control={control}
                                        name="endHour"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label={t("commerce.new_commerce.step2.endHour")}
                                                value={value}
                                                type={'time'}
                                                maxLength={5}
                                                keyboardType={'numeric'}
                                                onChange={(text) => {
                                                    const formattedText = formatTime(text);
                                                    onChange(formattedText);
                                                    setStepperData({ endHour: formattedText });
                                                }}
                                                error={errors.endHour?.message}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Conditional rendering for map address input if PlaceType is "Físico" */}
                    {PlaceType === "Físico" && (
                        <View>
                            {/* Map Address Input */}
                            <View style={styles.longInputWrapper}>
                                <Controller
                                    control={control}
                                    name="mapAdress"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={t("commerce.new_commerce.step2.locationLabel")}
                                            value={value}
                                            placeholder={t("commerce.new_commerce.step2.adressPlaceholder")}
                                            onChange={onChange}
                                            error={errors.mapAdress?.message}
                                        />
                                    )}
                                />
                            </View>
                            
                            {/* Map View Placeholder */}
                            <View style={styles.mapContainer}>
                                <View style={styles.mapPlaceholder}>
                                    <Skeleton
                                        width={'100%'}
                                        height={'100%'}
                                        colorMode='light'
                                        show={mapLoading}
                                    >
                                        {/* Uncomment and configure MapView when ready */}
                                        {/* 
                                            <MapView
                                                style={styles.map}
                                                provider={PROVIDER_GOOGLE}
                                                zoomEnabled={true}
                                                scrollEnabled={true}
                                                showsUserLocation={true}
                                                initialRegion={INITIAL_REGION}
                                            />
                                        */}
                                    </Skeleton>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Footer with navigation buttons */}
                <FooterNewCommerce
                    backStep={() => router.back()}
                    nextStep={handleSubmit(onSubmit)}
                    currentStep={3}
                />

                {/* Go Back Confirmation Modal */}
                <View>
                    <CommerceGoBackModal
                        modalVisible={modalVisible}
                        setModalVisible={() => setModalVisible(false)}
                        ScreenGoback={handleGoBackConfirmed}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Stylesheet with unused styles removed
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
    longInputWrapper: {
        paddingHorizontal: 15,
        marginTop: 20,
    },
    dateTimeSection: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        gap: 15,
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
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
