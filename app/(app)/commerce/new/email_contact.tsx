import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Input from '@/components/input';
import CommerceHeader from '@/components/commerceHeader';
import CommerceGoBackModal from '@/components/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';


export default function New_Commerce_Step_7() {

    const { email, setStepperData } = useStepperContext();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { t } = useLocale();

    const handleGoBackConfirmed = () => {
        setModalVisible(false);

        router.replace("/commerce")
        return;
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>

                    <CommerceHeader
                        Title={t("commerce.new_commerce.step6.headerLabel")}
                        ScreenGoback={() => router.back()}
                        ScreenClose={() => setModalVisible(true) }
                    />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {t("commerce.new_commerce.step6.emailContactLabel")}
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Input
                                value={email}
                                onChange={(text: string) => setStepperData({email: text})}
                                type={'email'}
                            />
                        </View>
                    </View>

                    <View style={styles.noticeContainer}>
                        <View style={styles.noticeBox}>
                            <View style={styles.noticeTextContainer}>
                                <Text style={styles.noticeText}>
                                    {t("commerce.new_commerce.step6.warning1")}
                                   
                                </Text>
                                <Text style={[styles.noticeText, styles.noticeTextMargin]}>
                                    {t("commerce.new_commerce.step6.warning2")}
                                </Text>
                            </View>
                            <View style={styles.noticeIconContainer}>
                                <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>{t("commerce.new_commerce.step6.currentStepper")}</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                    </View>

                    <View style={styles.nextButton}>
                        <TouchableOpacity
                            onPress={() => router.push("/commerce/new/register_completed")}
                            activeOpacity={0.7}
                            style={styles.nextButtonContent}
                        >
                            <Feather name="check" size={24} color="white" />
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
    section: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 15
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
    noticeContainer: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 32,
    },
    noticeBox: {
        flexDirection: 'row',
        height: 200,
        backgroundColor: '#FEF3C7',
        borderWidth: 1,
        borderColor: '#FDE68A',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    noticeTextContainer: {
        flex: 1,
    },
    noticeText: {
        fontSize: 18,
        color: '#F59E0B',
    },
    noticeTextMargin: {
        marginTop: 16,
    },
    noticeIconContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
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
