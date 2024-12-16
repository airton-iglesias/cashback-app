import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome6, Feather } from '@expo/vector-icons';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import Input from '@/components/input';
import CommerceHeader from '@/components/commerce/commerceHeader';
import CommerceGoBackModal from '@/components/commerce/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import FooterNewCommerce from '@/components/commerce/footerNewCommerce';
import { fontSize } from '@/constants/fonts';
import { Skeleton } from 'moti/skeleton';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getNewCommerceStep6Schema, NewCommerceStep6Data } from '@/schemas/commerceSchemas';

export default function New_Commerce_Step_6() {
    const { CashbackType, PlaceType, referenceUser, association, title, email,
        userPoints, webSite, startDate, endDate, startHour, endHour, mapAdress, description, logoImage, posterImage,
        descriptionMedia, baseDiscount, cashbackForm, sections, proprietary, currencyType, setStepperData } = useStepperContext();


    // select variables

    const [typesOptions, setTypesOptions] = useState<any>([]);
    const [currencyOptions, setCurrencyOptions] = useState<any>([]);

    // State variables for UI 
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectLoading, setSelectLoading] = useState<boolean>(true);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const { t } = useLocale();

    // React Hook Form setup
    const newCommerceStep6Schema = React.useMemo(() => getNewCommerceStep6Schema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<NewCommerceStep6Data>({
        resolver: zodResolver(newCommerceStep6Schema), mode: "onChange",
        defaultValues: {
            currencyType,
            baseDiscount,
            cashbackForm,
            sections: sections || [],
        },
    });

    // FieldArray setup to keep track of the sections array
    const { fields, append, remove } = useFieldArray({ control, name: 'sections' });
    const watchedSections = useWatch({ control, name: 'sections' });
    const watchedCurrencyType = useWatch({ control, name: 'currencyType' });
    const watchedBaseDiscount = useWatch({ control, name: 'baseDiscount' });
    const watchedCashbackForm = useWatch({ control, name: 'cashbackForm' });

    // UseEffect to set the stepperData context refreshed
    useEffect(() => {
        setStepperData({
            sections: watchedSections,
            currencyType: watchedCurrencyType,
            baseDiscount: watchedBaseDiscount,
            cashbackForm: watchedCashbackForm,
        });
    }, [watchedSections, watchedCurrencyType, watchedBaseDiscount, watchedCashbackForm]);


    //UseEffect to request the selects data
    useEffect(() => {
        const fetchSelectDatas = async () => {

            //make the request here
            //{...}

            // Variable Temporary
            const selectDataReponse: any = [
                { id: 1, text: `${t('commerce.new_commerce.step5.fidelity')}` },
                { id: 2, text: `${t('commerce.new_commerce.step5.free')}` },
                { id: 3, text: `${t('commerce.new_commerce.step5.burn')}` },
            ];
            //Variable Temporary
            const currencyOptionsResponse: any = [
                { id: 1, text: 'EUR' },
                { id: 2, text: 'BRL' },
                { id: 3, text: 'USD' },
            ];

            // The Timeout is to simulate an API call delay, you can remove it when making the API call
            setTimeout(() => {
                setTypesOptions(selectDataReponse);
                setCurrencyOptions(currencyOptionsResponse);
                setSelectLoading(false);
            }, 1000);
        };

        fetchSelectDatas();
    }, []);

    const addSection = () => {
        if (fields.length < 10) {
            append({ minValue: '', discount: '', cashbackType: '' });
        }
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    const removeSection = (index: number) => {
        remove(index);
    };

    const onSubmit = () => {
        setLoadingSubmit(true);

        console.log(
            CashbackType, PlaceType, //index
            title, proprietary, association, userPoints, referenceUser, //basic_datas
            webSite, startDate, endDate, startHour, endHour, mapAdress, //place_and_time datas
            description, //description data
            logoImage, posterImage, descriptionMedia, //images_and_videos datas
            currencyType, baseDiscount, cashbackForm, sections, //cashback_items datas
            email, //contact_datas
        )

        setTimeout(() => {
            setLoadingSubmit(false);
            router.navigate("/commerce/new/register_completed");
        }, 2000);
    };

    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        router.replace("/commerce");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <CommerceHeader
                    Title={t("commerce.new_commerce.step5.headerLabel")}
                    ScreenClose={() => { setModalVisible(true) }}
                />

                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={styles.sectionContainer}>

                        {/* Select currency type */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.currencyType")}</Text>
                            <Skeleton
                                show={selectLoading}
                                colorMode='light'
                                width={'100%'}
                                height={48}
                            >
                                {selectLoading ? null :
                                    <Controller
                                        control={control}
                                        name="currencyType"
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={currencyOptions}
                                                onChangeSelect={(item: any) => onChange(item.text)}
                                                text={value || t("commerce.new_commerce.step5.selectLabel")}
                                                SelectOption={SelectOption}
                                                error={errors.currencyType?.message}
                                            />
                                        )}
                                    />
                                }
                            </Skeleton>
                        </View>
                        {/* End of select currency type */}

                        {/* base discount input field */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.baseDiscount")}</Text>
                            <View style={styles.inputWrapper}>
                                <Controller
                                    control={control}
                                    name="baseDiscount"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            placeholder={'10'}
                                            onChange={onChange}
                                            keyboardType={'numeric'}
                                            value={value}
                                            error={errors.baseDiscount?.message}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                        {/* End of base discount input field */}

                        {/* Cashback type input field */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.cashbackType")}</Text>
                            <Skeleton
                                show={selectLoading}
                                colorMode='light'
                                width={'100%'}
                                height={48}
                            >
                                {selectLoading ? null :
                                    <Controller
                                        control={control}
                                        name="cashbackForm"
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={typesOptions}
                                                onChangeSelect={(item: any) => onChange(item.text)}
                                                text={value || t("commerce.new_commerce.step5.selectLabel")}
                                                SelectOption={SelectOption}
                                                error={errors.cashbackForm?.message}
                                            />
                                        )}
                                    />
                                }
                            </Skeleton>
                        </View>
                        {/* End of cashback type input field */}


                        {/* cashback new section button */}
                        {fields.length === 0 && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.addButtonContainer}
                                onPress={addSection}
                            >
                                <FontAwesome6 name="plus" size={16} color="black" />
                            </TouchableOpacity>
                        )}
                        {/* End of cashback new section button */}
                    </View>

                    {/* Sections */}
                    {fields.map((field, index) => (
                        <View key={field.id} style={styles.sectionContainer}>
                            <View style={styles.rowContainer}>
                                {/* minimal value input field */}
                                <View style={styles.smallSection}>
                                    <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.minimalValueLabel")}</Text>
                                    <View style={styles.inputWrapper}>
                                        <Controller
                                            control={control}
                                            name={`sections.${index}.minValue`}
                                            render={({ field: { onChange, value } }) => (
                                                <Input
                                                    placeholder={t("commerce.new_commerce.step5.minimalCurrencyPlaceholder")}
                                                    keyboardType={'numeric'}
                                                    onChange={onChange}
                                                    value={value}
                                                    error={errors.sections?.[index]?.minValue?.message}
                                                />
                                            )}
                                        />
                                    </View>
                                </View>
                                {/* End of minimal value input field */}

                                {/* Discount input field */}
                                <View style={styles.largeSection}>
                                    <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.discountSectionPorcentage")}</Text>
                                    <View style={styles.inputWrapper}>
                                        <Controller
                                            control={control}
                                            name={`sections.${index}.discount`}
                                            render={({ field: { onChange, value } }) => (
                                                <Input
                                                    placeholder={t("commerce.new_commerce.step5.discountSectionPorcentagePlaceholder")}
                                                    keyboardType={'numeric'}
                                                    onChange={onChange}
                                                    value={value}
                                                    error={errors.sections?.[index]?.discount?.message}
                                                />
                                            )}
                                        />
                                    </View>
                                </View>
                                {/* End of Discount input field */}
                            </View>

                            {/* Cashback type input field */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.cashbackType")}</Text>
                                <Skeleton
                                    show={selectLoading}
                                    colorMode='light'
                                    width={'100%'}
                                    height={48}
                                >
                                    {selectLoading ? null :
                                        <Controller
                                            control={control}
                                            name={`sections.${index}.cashbackType`}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={typesOptions}
                                                    onChangeSelect={(item: any) => onChange(item.text)}
                                                    text={value || t("commerce.new_commerce.step5.selectLabel")}
                                                    SelectOption={SelectOption}
                                                    error={errors.sections?.[index]?.cashbackType?.message}
                                                />
                                            )}
                                        />
                                    }
                                </Skeleton>
                            </View>
                            {/* End of Cashback type input field */}


                            <View style={styles.buttonsDiscount}>
                                {/* Delete button */}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.trashButtonContainer}
                                    onPress={() => removeSection(index)}
                                >
                                    <Feather name="trash" size={16} color="black" />
                                </TouchableOpacity>
                                {/* End of Delete button */}

                                {/* Add button */}
                                {index === fields.length - 1 && fields.length < 10 && (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.addButtonContainerBottom}
                                        onPress={addSection}
                                    >
                                        <FontAwesome6 name="plus" size={16} color="black" />
                                    </TouchableOpacity>
                                )}
                                {/* End of Add button */}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Footer navigation */}
                <FooterNewCommerce
                    backStep={() => router.back()}
                    nextStep={handleSubmit(onSubmit)}
                    currentStep={6}
                    disabled={loadingSubmit}
                />
                {/* End of Footer navigation */}

                {/* Return confirmation modal */}
                <View>
                    <CommerceGoBackModal
                        modalVisible={modalVisible}
                        setModalVisible={() => setModalVisible(false)}
                        ScreenGoback={handleGoBackConfirmed}
                    />
                </View>
                {/* End of Return confirmation modal */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// ... estilos permanecem os mesmos



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
        paddingBottom: 30
    },
    sectionContainer: {
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 40,
        borderColor: '#D1D5DB',
        gap: 20
    },
    section: {
        width: '100%',
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 15
    },
    inputLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderTopColor: '#E5E7EB',

    },
    buttonsDiscount: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        padding: 8,
        zIndex: 10
    },
    addButtonContainer: {
        position: 'absolute',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        right: 16,
        bottom: -17,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        zIndex: 10
    },
    addButtonContainerBottom: {
        position: 'absolute',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        right: 16,
        bottom: -19,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        zIndex: 10
    },
    trashButtonContainer: {
        position: 'absolute',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        right: 64,
        bottom: -19,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        zIndex: 10
    },
    smallSection: {
        width: '43%',
        paddingTop: 16,
        paddingRight: 8,
    },
    largeSection: {
        width: '62%',
        paddingTop: 16,
        paddingLeft: 8,
        paddingRight: 16,
    },
});
