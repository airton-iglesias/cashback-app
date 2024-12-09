import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import CommerceHeader from '@/components/commerce/commerceHeader';
import CommerceGoBackModal from '@/components/commerce/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import FooterNewCommerce from '@/components/commerce/footerNewCommerce';
import { fontSize } from '@/constants/fonts';
import TextEditorLinkModal from '@/components/textEditorLinkModal';
import TextEditorToolBar from '@/components/textEditorToolBar';
import TextEditorColorPicker from '@/components/textEditorColorPicker';
import { RichEditor } from '@/components/react-native-pell-rich-editor';

export default function New_Commerce_Step_4() {
    const richText = useRef<RichEditor | null>(null);
    const { description, setStepperData } = useStepperContext();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalBackVisible, setModalBackVisible] = useState(false);
    const [textColorSelected, setTextColorSelected] = useState<string>('#000000');
    const [isColorPickerVisible, setIsColorPickerVisible] = useState<boolean>(false);
    const { t } = useLocale();
    const scrollRef = useRef<ScrollView>(null);

    const handleSaveLink = (linkTitle: string, linkURL: string) => {
        if (richText.current) {
            richText.current.insertLink(linkTitle, linkURL);
            setModalVisible(false);
        }
    };

    const handleGoBackConfirmed = () => {
        setModalBackVisible(false);
        router.replace("/commerce")
        return;
    };

    const applyTextColor = (color: string) => {
        setTextColorSelected(color);
        if (richText.current) {
            richText.current?.setForeColor(color);
        }
        setIsColorPickerVisible(false);
    };

    const handleTextChange = (descriptionText: any) => {
        setStepperData({ description: descriptionText });
        setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: false });
        }, 100);
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

                <View style={{ position: 'relative' }}>

                    <TextEditorToolBar
                        handleInsertLink={() => setModalVisible(true)}
                        richText={richText}
                        textColorSelected={textColorSelected}
                        isColorPickerVisible={isColorPickerVisible}
                        setIsColorPickerVisible={(value: boolean) => setIsColorPickerVisible(value)}
                    />


                    <TextEditorColorPicker
                        colors={['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']}
                        applyTextColor={(color: string) => applyTextColor(color)}
                        isVisible={isColorPickerVisible}
                        onClose={() => setIsColorPickerVisible(false)}
                    />

                </View>

                <View style={styles.textInput}>
                    <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
                        <RichEditor
                            ref={richText}
                            style={{ flex: 1 }}
                            editorStyle={{
                                backgroundColor: 'white',
                                contentCSSText: 'font-size: 16px;',
                            }}
                            onChange={handleTextChange}
                            initialContentHTML={description}
                        />
                    </ScrollView>
                </View>
            </View>

            <FooterNewCommerce
                backStep={() => router.back()}
                nextStep={() => /*router.push("/commerce/new/images_and_videos")*/ console.log(description)}
                currentStep={4}
            />

            <TextEditorLinkModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleSaveLink={handleSaveLink}
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
    descriptionSection: {
        marginTop: 18,
        paddingHorizontal: 15,
    },
    descriptionLabel: {
        fontSize: fontSize.labels.medium,
    },
    textInputContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 8,
        padding: 5,
        fontSize: fontSize.labels.medium,
        color: '#6C757D',
    },
});