import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '@/components/input';
import CommerceHeader from '@/components/commerce/commerceHeader';
import CommerceGoBackModal from '@/components/commerce/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import FooterNewCommerce from '@/components/commerce/footerNewCommerce';
import { fontSize } from '@/constants/fonts';
import { getEmailSchema, EmailData } from '@/schemas/authSchemas';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function New_Commerce_Step_7() {
    const { CashbackType, PlaceType, referenceUser, association, title, email,
        userPoints, webSite, startDate, endDate, startHour, endHour, mapAdress, description, logoImage, posterImage,
        descriptionMedia, baseDiscount, cashbackForm, sections, proprietary, currencyType, modality, coupon, link, setStepperData } = useStepperContext();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const { t } = useLocale();

    // Configuração do React Hook Form
    const emailSchema = React.useMemo(() => getEmailSchema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<EmailData>({
        resolver: zodResolver(emailSchema),
        mode: 'onChange',
        defaultValues: {
            email,
        },
    });

    // Watch the email input field on change
    const watchedEmail = useWatch({
        control,
        name: 'email',
    });

    // Update the stepper data when the email input changes
    useEffect(() => {
        setStepperData({ email: watchedEmail, });
    }, [watchedEmail]);

    const onSubmit = async () => {
        setLoadingSubmit(true);
        // Make the request to the API here
        //{...}

        console.log(
            CashbackType, PlaceType, //index
            title, proprietary, association, userPoints, referenceUser, //basic_datas
            webSite, startDate, endDate, startHour, endHour, mapAdress, //place_and_time datas
            description, //description data
            logoImage, posterImage, descriptionMedia, //images_and_videos datas
            currencyType, baseDiscount, cashbackForm, sections, modality, coupon, link, //cashback_items datas
            email, //contact_datas
        )

        // The Timeout is to simulate an API call delay, you can remove it when making the API call
        setTimeout(() => {
            setLoadingSubmit(false);
            router.replace("/commerce/new/register_completed");
        }, 2000);
    };

    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        router.replace("/commerce");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>

                    <CommerceHeader
                        Title={t("commerce.new_commerce.step6.headerLabel")}
                        ScreenClose={() => setModalVisible(true)}
                    />

                    {/* Email input field */}
                    <View style={styles.section}>
                        <View style={styles.inputWrapper}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        label={t("commerce.new_commerce.step6.emailContactLabel")}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        type="email"
                                        error={errors.email?.message}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    {/* End of Email input field */}

                    {/* Warning box */}
                    <View style={styles.noticeContainer}>
                        <View style={styles.noticeBox}>
                            <View style={styles.noticeIconContainer}>
                                <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                            </View>
                            <View style={styles.noticeTextContainer}>
                                <Text style={styles.noticeText}>
                                    {t("commerce.new_commerce.step6.warning")}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* End of Warning box */}

                </ScrollView>

                <FooterNewCommerce
                    backStep={() => router.back()}
                    nextStep={handleSubmit(onSubmit)}
                    currentStep={6}
                    disabled={loadingSubmit}
                />

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
    section: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    sectionTitle: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 15,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noticeContainer: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 32,
    },
    noticeBox: {
        flexDirection: 'row',
        backgroundColor: '#FEF3C7',
        borderWidth: 1,
        borderColor: '#FDE68A',
        borderRadius: 12,
        padding: 24,
        alignItems: 'flex-start',
    },
    noticeTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16,
    },
    noticeText: {
        fontSize: fontSize.labels.medium,
        color: '#F59E0B',
    },
    noticeIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
});
