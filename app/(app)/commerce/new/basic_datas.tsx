import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
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

export default function New_Commerce_Step_2() {

    const [selectDatas, setSelectDatas] = useState<any>([]);
    const { PlaceType, referenceUser,
        association, title, userPoints, setStepperData,
        proprietary 
    } = useStepperContext();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { t } = useLocale();
    const [selectLoading, setSelectLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSelectDatas = async () => {
            /* make the request to the API here
            //Example: 
            const selectDataReponse = await
                fetch('domain of application here', {
                    method: 'GET',
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .catch((error) => {
                    console.log(error)
                });
            */

            //temporary variable
            const selectDataReponse: any = {
                associationOptions: [
                    { id: 1, text: 'Promoção' },
                    { id: 2, text: 'Evento' },
                ],
                userPointsOptions: [
                    { id: 1, text: 'Airton' },
                    { id: 2, text: 'Luis' },
                    { id: 3, text: 'Bruno' },
                ]
            };

            setTimeout(() => {
                setSelectDatas(selectDataReponse);
                setSelectLoading(false);
            }, 2000);
        }

        fetchSelectDatas();
    }, []);

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

                <View style={styles.longInputWrapper}>
                    <Input
                        label={t("commerce.new_commerce.step1.propriety")}
                        placeholder={t("commerce.new_commerce.step1.ID")}
                        onChange={(text: string) => setStepperData({ proprietary: text })}
                        value={proprietary}
                        type={'text'}
                    />
                </View>

                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>{t("commerce.new_commerce.step1.associationLabel")}</Text>
                    <Skeleton
                        show={selectLoading}
                        colorMode='light'
                        width={'100%'}
                        height={48}
                    >
                        {selectLoading ? null :
                            <Select
                                options={selectDatas.associationOptions}
                                onChangeSelect={(item: any) => setStepperData({ association: item.text })}
                                text={association != '' ? association : t("commerce.new_commerce.step1.selectLabel")}
                                SelectOption={SelectOption}
                            />
                        }
                    </Skeleton>
                </View>

                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>{t("commerce.new_commerce.step1.userPoints")}</Text>
                    <Skeleton
                        show={selectLoading}
                        colorMode='light'
                        width={'100%'}
                        height={48}
                    >
                        {selectLoading ? null :
                            <Select
                                options={selectDatas.userPointsOptions}
                                onChangeSelect={(item: any) => setStepperData({ userPoints: item.text })}
                                text={userPoints != '' ? userPoints : t("commerce.new_commerce.step1.selectLabel")}
                                SelectOption={SelectOption}
                            />
                        }
                    </Skeleton>
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
                nextStep={() => router.push("/commerce/new/place_and_time")}
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