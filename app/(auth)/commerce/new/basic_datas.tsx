// NewCommerceStep2.tsx

import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Select from "@/components/select";
import SelectOption from "@/components/selectOption";
import Input from "@/components/input";
import CommerceHeader from "@/components/commerce/commerceHeader";
import CommerceGoBackModal from "@/components/commerce/commerceGoBackModal";
import FooterNewCommerce from "@/components/commerce/footerNewCommerce";

import { useStepperContext } from "@/contexts/CommerceStepperContext";
import { useLocale } from "@/contexts/TranslationContext";
import { fontSize } from "@/constants/fonts";
import { getNewCommerceStep2Schema, NewCommerceStep2Data } from "@/schemas/commerceSchemas";

export default function NewCommerceStep2() {
    // Context state
    const { title, proprietary, association, userPoints, referenceUser, setStepperData } = useStepperContext();

    // UI state and data
    const [selectDatas, setSelectDatas] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectLoading, setSelectLoading] = useState(true);

    // Translation
    const { t } = useLocale();

    // React Hook Form setup
    const newCommerceStep2Schema = React.useMemo(() => getNewCommerceStep2Schema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<NewCommerceStep2Data>({
        resolver: zodResolver(newCommerceStep2Schema),
        mode: "onChange",
        defaultValues: {
            title,
            proprietary,
            association,
            userPoints,
            referenceUser,
        },
    });

    // Fetch dropdown options
    useEffect(() => {
        const fetchSelectDatas = async () => {
            // Simulated API response
            const selectDataReponse: any = {
                associationOptions: [
                    { id: 1, text: "Comércio do bruno" },
                    { id: 2, text: "Mercadinho do bruno" },
                ]
            };

            // The Timeout is to simulate an API call delay, you can remove it when making the API call
            setTimeout(() => {
                setSelectDatas(selectDataReponse);
                setSelectLoading(false);
            }, 2000);
        };

        fetchSelectDatas();
    }, []);

    // Handle navigation to previous screen
    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        router.replace("/commerce");
    };

    // Handle form submission
    const onSubmit = (data: NewCommerceStep2Data) => {
        setStepperData({
            title: data.title,
            proprietary: data.proprietary,
            association: data.association,
            userPoints: data.userPoints,
            referenceUser: data.referenceUser,
        });
        router.push("/commerce/new/place_and_time");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with close modal */}
            <CommerceHeader
                Title={t("commerce.new_commerce.step1.headerLabel")}
                ScreenClose={() => setModalVisible(true)}
            />

            {/* Main Content */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Input for Commerce Title */}
                <View style={styles.longInputWrapper}>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label={t("commerce.new_commerce.step1.titleLabel")}
                                value={value}
                                onChange={onChange}
                                type="text"
                                error={errors.title?.message}
                            />
                        )}
                    />
                </View>
                {/* End of Input for Commerce Title */}

                {/* Input for Proprietary ID */}
                <View style={styles.longInputWrapper}>
                    <Controller
                        control={control}
                        name="proprietary"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label={t("commerce.new_commerce.step1.propriety")}
                                placeholder={t("commerce.new_commerce.step1.ID")}
                                value={value}
                                onChange={onChange}
                                type="text"
                                error={errors.proprietary?.message}
                            />
                        )}
                    />
                </View>
                {/* End of Input for Proprietary ID */}

                {/* Select for Association */}
                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>{t("commerce.new_commerce.step1.associationLabel")}</Text>
                    <Skeleton show={selectLoading} colorMode="light" width="100%" height={48}>
                        {selectLoading ? null : (
                            <Controller
                                control={control}
                                name="association"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={selectDatas.associationOptions}
                                        text={value || t("commerce.new_commerce.step1.selectLabel")}
                                        onChangeSelect={(item: any) => onChange(item.text)}
                                        SelectOption={SelectOption}
                                        error={errors.association?.message}
                                    />
                                )}
                            />
                        )}
                    </Skeleton>
                </View>
                {/* End of Select for Association */}

                {/* Select for User Points */}
                <View style={styles.longInputWrapper}>
                    <Controller
                        control={control}
                        name="userPoints"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label={t("commerce.new_commerce.step1.userPoints")}
                                placeholder={t("commerce.new_commerce.step1.ID")}
                                value={value}
                                onChange={onChange}
                                type="text"
                                error={errors.userPoints?.message}
                            />
                        )}
                    />
                </View>
                {/* End of select for user points */}

                {/* Input for Reference User */}
                <View style={styles.longInputWrapper}>
                    <Controller
                        control={control}
                        name="referenceUser"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label={t("commerce.new_commerce.step1.referedBy")}
                                placeholder={t("commerce.new_commerce.step1.ID")}
                                value={value}
                                onChange={onChange}
                                type="text"
                                error={errors.referenceUser?.message}
                            />
                        )}
                    />
                </View>
                {/* End of input for reference user */}
            </ScrollView>

            {/* Footer Navigation */}
            <FooterNewCommerce
                backStep={() => router.back()}
                nextStep={handleSubmit(onSubmit)}
                currentStep={2}
            />

            {/* Go Back Confirmation Modal */}
            <View>
                <CommerceGoBackModal
                    modalVisible={modalVisible}
                    setModalVisible={() => setModalVisible(false)}
                    ScreenGoback={handleGoBackConfirmed}
                />
            </View>
        </SafeAreaView>
    );
}

// ... (styles remain the same)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
    },
    inputLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: "normal",
        marginBottom: 4,
    },
    longInputWrapper: {
        marginVertical: 16,
    },
    selectSection: {
        marginVertical: 16,
    },
});
