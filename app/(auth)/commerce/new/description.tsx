import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import CommerceHeader from '@/components/commerce/commerceHeader';
import CommerceGoBackModal from '@/components/commerce/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import FooterNewCommerce from '@/components/commerce/footerNewCommerce';
import { fontSize } from '@/constants/fonts';
import { getNewCommerceStep4Schema, NewCommerceStep4Data } from "@/schemas/commerceSchemas";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@/components/input';

export default function New_Commerce_Step_4() {

    const { description, setStepperData } = useStepperContext();
    const [modalBackVisible, setModalBackVisible] = useState(false);
    const { t } = useLocale();

    // React Hook Form setup
    const newCommerceStep4Schema = React.useMemo(() => getNewCommerceStep4Schema(t), [t]);
    const { control, handleSubmit, formState: { errors }, } = useForm<NewCommerceStep4Data>({
        resolver: zodResolver(newCommerceStep4Schema),
        mode: "onChange",
        defaultValues: {
            description
        },
    });


    const handleGoBackConfirmed = () => {
        setModalBackVisible(false);
        router.replace("/commerce")
        return;
    };

    const onSubmit = (data: any) => {
        setStepperData({ description: data.description });
        router.push("/commerce/new/images_and_videos");
    };

    return (
        <SafeAreaView style={styles.container}>

            <CommerceHeader
                Title={t("commerce.new_commerce.step3.headerLabel")}
                ScreenClose={() => { setModalBackVisible(true) }}
            />

            <View style={styles.descriptionSection}>
                <Text style={styles.descriptionLabel}>{t("commerce.new_commerce.step3.descriptionLabel")}</Text>
            </View>

            <View style={styles.textInputContainer}>
                <View style={{ flex: 1, height: '100%' }}>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                onChange={onChange}
                                value={description || value}
                                error={errors.description?.message}
                            />
                        )}
                    />
                </View>
            </View>

            <FooterNewCommerce
                backStep={() => router.back()}
                nextStep={handleSubmit(onSubmit)}
                currentStep={4}
            />

            <CommerceGoBackModal
                modalVisible={modalBackVisible}
                setModalVisible={() => setModalBackVisible(false)}
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
    colorPickerContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        top: 53,
        zIndex: 1000,
        borderRadius: 8,
        left: 205,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginVertical: 5,
        borderWidth: 1,
    },
    descriptionSection: {
        marginTop: 18,
        paddingHorizontal: 15,
    },
    descriptionLabel: {
        fontSize: fontSize.labels.medium,
    },
    formattingBar: {
        flexDirection: 'row',
        backgroundColor: '#F1F1F1',
        height: 54,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20,
        position: 'relative'
    },
    flatStyle: {
        margin: 'auto',
        gap: 25,
    },
    icon: {
        textAlign: 'center',
    },
    unselectedButton: {
        opacity: 0.6,
    },
    textInputContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    textInput: {
        flex: 0.5,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 8,
        padding: 10,
        fontSize: fontSize.labels.medium,
        color: '#6C757D',
    },
    pencilButton: {
        height: 30,
        width: 30,
        borderRadius: 999,
    },
    dropdownContainer: {
        position: 'absolute',
        justifyContent: 'space-between',
        top: 53,
        left: 275,
        backgroundColor: '#FFFFFF',
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 10,
        zIndex: 1000,
        width: 50,
        gap: 15,
    },
    modalContainer: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        shadowRadius: 4,
        borderColor: '#D7D7D7',
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        gap: 20
    },
    modalText: {
        textAlign: 'center',
        fontSize: fontSize.labels.medium,
    },
    modalInputWrapper: {
        width: '100%',
        gap: 10,
        marginBottom: 10
    },
    buttonContainer: {
        gap: 10,
        justifyContent: 'space-between',
        width: '100%',
    },
    modalSaveButton: {
        width: '100%',
        borderRadius: 8,
    },
    modalButtonSaveContent: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    modalButtonCancelContent: {
        flexDirection: 'row',
        backgroundColor: '#E9ECEF',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
});