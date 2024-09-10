import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome6, Feather } from '@expo/vector-icons';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import Input from '@/components/input';
import CommerceHeader from '@/components/commerceHeader';
import CommerceGoBackModal from '@/components/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';

export default function New_Commerce_Step_6() {
    const { baseDiscount, cashbackForm, sections, setStepperData } = useStepperContext();
    const [tempSections, setTempSections] = useState(sections);

    const scrollViewRef = useRef<ScrollView>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { t } = useLocale();
    
    const typesOptions = [
        { id: 1, text: 'Fidelização' },
        { id: 2, text: 'Promoção' },
    ];
    

    const addSection = () => {
        if (sections.length < 10) {
            setStepperData({ sections: [...sections, { minValue: '', discount: '', type: '' }] });
            setTempSections([...tempSections, { minValue: '', discount: '', type: '' }]);
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 200);
        }
    };

    const removeSection = (index: number) => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        setStepperData({ sections: newSections });
        router.replace("/commerce/new/cashback_items");
    };

    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        router.replace("/commerce")
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <CommerceHeader
                    Title={t("commerce.new_commerce.step5.headerLabel")}
                    ScreenGoback={() => router.back()}
                    ScreenClose={() => { setModalVisible(true) }}
                />

                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={styles.sectionContainer}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.baseDiscount")}</Text>
                            <View style={styles.inputWrapper}>
                                <Input
                                    placeholder={'10'}
                                    onChange={(discountValue: string) => setStepperData({ baseDiscount: discountValue })}
                                    keyboardType={'numeric'}
                                    value={baseDiscount?.toString()}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.cashbackType")}</Text>
                            <Select
                                options={typesOptions}
                                onChangeSelect={(item: any) => setStepperData({ cashbackForm: item.text })}
                                text={cashbackForm !== '' ? cashbackForm : t("commerce.new_commerce.step5.selectLabel")}
                                SelectOption={SelectOption}
                            />
                        </View>
                        {sections.length === 0 && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.addButtonContainer}
                                onPress={addSection}
                            >
                                <FontAwesome6 name="plus" size={16} color="black" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {sections.map((section, index) => (
                        <View key={index} style={styles.sectionContainer}>
                            <View style={styles.rowContainer}>
                                <View style={styles.smallSection}>
                                    <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.minimalValueLabel")}</Text>
                                    <View style={styles.inputWrapper}>
                                        <Input
                                            placeholder={t("commerce.new_commerce.step5.minimalCurrencyPlaceholder")}
                                            keyboardType={'numeric'}
                                            onChange={(value: string) => {
                                                const updatedSections = sections.map((s, i) =>
                                                    i === index ? { ...s, minValue: value } : s
                                                );
                                                setStepperData({ sections: updatedSections });
                                            }}
                                            value={section.minValue}
                                        />
                                    </View>
                                </View>
                                <View style={styles.largeSection}>
                                    <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.discountSectionPorcentage")}</Text>
                                    <View style={styles.inputWrapper}>
                                        <Input
                                            placeholder={t("commerce.new_commerce.step5.discountSectionPorcentagePlaceholder")}
                                            keyboardType={'numeric'}
                                            onChange={(value: string) => {
                                                const updatedSections = sections.map((s, i) =>
                                                    i === index ? { ...s, discount: value } : s
                                                );
                                                setStepperData({ sections: updatedSections });
                                            }}
                                            value={section.discount}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step5.cashbackType")}</Text>
                                <Select
                                    options={typesOptions}
                                    onChangeSelect={(item: any) => {
                                        const updatedSections = sections.map((s, i) =>
                                            i === index ? { ...s, type: item.text } : s
                                        );
                                        setStepperData({ sections: updatedSections });
                                    }}
                                    text={section.type !== '' ? section.type : t("commerce.new_commerce.step5.selectLabel")}
                                    SelectOption={SelectOption}
                                />
                            </View>

                            {sections.length > 0 && (
                                <View style={styles.buttonsDiscount}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.trashButtonContainer}
                                        onPress={() => removeSection(index)}
                                    >
                                        <Feather name="trash" size={16} color="black" />
                                    </TouchableOpacity>
                                    {index === sections.length - 1 && sections.length < 10 && (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={styles.addButtonContainerBottom}
                                            onPress={addSection}
                                        >
                                            <FontAwesome6 name="plus" size={16} color="black" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>{t("commerce.new_commerce.step5.currentStepper")}</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                    </View>

                    <View style={styles.nextButton}>
                        <TouchableOpacity
                            style={styles.nextButtonContent}
                            onPress={() => router.navigate("/commerce/new/register_completed")}
                            activeOpacity={0.7}
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
        fontSize: 19,
        fontWeight: 'normal',
        marginBottom: 15
    },
    inputLabel: {
        fontSize: 20,
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
