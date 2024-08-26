import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { CommerceStackParamList } from '@/types/navigationTypes';
import UnderlineIcon from '@/assets/icons/underlineIcon';
import Input from '@/components/input';
import CommerceHeader from '../commerceHeader';
import CommerceGoBackModal from '../commerceGoBackModal';
import PaintBrushIcon from '@/assets/icons/paintBrushIcon';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_Step_3() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const richText = useRef<RichEditor | null>(null);

    const { description, setStepperData } = useStepperContext();

    const [linkURL, setLinkURL] = useState('');
    const [linkTitle, setLinkTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalBackVisible, setModalBackVisible] = useState(false);
    const [textColorSelected, setTextColorSelected] = useState<string>('#000000');
    const [isColorPickerVisible, setIsColorPickerVisible] = useState<boolean>(false);
    const { t } = useLocale();

    const handleInsertLink = () => {
        setModalVisible(true);
    };

    const handleSaveLink = () => {
        if (richText.current) {
            richText.current.insertLink(linkTitle, linkURL);
            setLinkURL('');
            setModalVisible(false);
        }
    };

    const handleGoBackConfirmed = () => {
        setModalBackVisible(false);

        commerceNavigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'home' }],
            })
        );
        return;
    };

    const applyTextColor = (color: string) => {
        setTextColorSelected(color);
        if (richText.current) {
            richText.current?.setForeColor(color);
        }
        setIsColorPickerVisible(false);
    };

    const renderColorPicker = () => {
        if (!isColorPickerVisible) return null;
        const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

        return (
            <View style={styles.colorPickerContainer}>
                {colors.map(color => (
                    <TouchableOpacity
                        key={color}
                        style={[styles.colorOption, { backgroundColor: color }]}
                        onPress={() => applyTextColor(color)}
                    />
                ))}
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.container}>

            <CommerceHeader
                Title={t("commerce.new_commerce.step3.headerLabel")}
                ScreenGoback={() => commerceNavigation.goBack()}
                ScreenClose={() => { setModalBackVisible(true) }}
            />

            <View style={styles.descriptionSection}>
                <Text style={styles.descriptionLabel}>{t("commerce.new_commerce.step3.descriptionLabel")}</Text>
            </View>

            <View style={styles.textInputContainer}>
                <RichToolbar
                    editor={richText}
                    style={styles.formattingBar}
                    selectedIconTint="blue"
                    iconTint="black"
                    unselectedButtonStyle={styles.unselectedButton}
                    flatContainerStyle={styles.flatStyle}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        'setForeColor',
                        actions.insertBulletsList,
                        actions.insertLink,
                    ]}
                    iconMap={{
                        [actions.setBold]: () => <Feather style={styles.icon} name="bold" size={30} color={'black'} />,
                        [actions.setItalic]: () => <Feather style={styles.icon} name="italic" size={30} color={'black'} />,
                        [actions.setUnderline]: () => <UnderlineIcon style={styles.icon} size={30} color={'black'} />,
                        ['setForeColor']: () => (
                            textColorSelected === "#000000" ?
                                (
                                    <PaintBrushIcon style={styles.icon} size={30} color={textColorSelected} onPress={() => setIsColorPickerVisible(!isColorPickerVisible)} />
                                ) :
                                (
                                    <TouchableOpacity
                                        style={[styles.pencilButton, { backgroundColor: textColorSelected, }]}
                                        onPress={() => setIsColorPickerVisible(!isColorPickerVisible)}
                                    >
                                    </TouchableOpacity>
                                )
                        ),
                        [actions.insertBulletsList]: () => <FontAwesome6 style={styles.icon} name={"list"} size={30} color="black" />,
                        [actions.insertLink]: () => <Feather name="link" style={styles.icon} size={30} color="black" onPress={handleInsertLink} />,
                    }}
                />
                {renderColorPicker()}
                <View style={styles.textInput}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <RichEditor
                            ref={richText}
                            style={{ flex: 1 }}
                            editorStyle={{
                                backgroundColor: 'white',
                                contentCSSText: 'font-size: 20px;',
                            }}
                            onChange={descriptionText => {
                                setStepperData({description: descriptionText});
                                console.log(description)
                            }}
                            initialContentHTML={description}
                        />
                    </ScrollView>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.stepperLayoutContainer}>
                    <Text style={styles.stepperLayoutText}>{t("commerce.new_commerce.step3.currentStepper")}</Text>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayoutSelected}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => commerceNavigation.navigate("new_commerce_step_4")}
                    style={styles.nextButton}
                >
                    <View style={styles.nextButtonContent}>
                        <Feather name="arrow-right" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{t("commerce.new_commerce.step3.modalLabel")}</Text>
                        <View style={styles.modalInputWrapper}>
                            <Input
                                onChange={(text: string) => setLinkTitle(text)}
                                label={t("commerce.new_commerce.step3.linkTitle")}
                                placeholder={t("commerce.new_commerce.step3.linkTitlePlaceholder")}
                                customColor={'#000'}
                            />
                            <Input
                                onChange={(text: string) => setLinkURL(text)}
                                label={t("commerce.new_commerce.step3.linkAdress")}
                                placeholder={t("commerce.new_commerce.step3.linkAdressPlaceholder")}
                                customColor={'#000'}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleSaveLink}
                                style={styles.modalSaveButton}
                            >
                                <View style={styles.modalButtonSaveContent}>
                                    <Feather name="check" size={24} color="white" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setModalVisible(false)}
                                style={styles.modalSaveButton}
                            >
                                <View style={styles.modalButtonCancelContent}>
                                    <AntDesign name="close" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
        left: 215
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
        fontSize: 20,
    },
    formattingBar: {
        flexDirection: 'row',
        backgroundColor: '#F1F1F1',
        height: 54,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20
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
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 8,
        padding: 5,
        fontSize: 20,
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
    pencilButton: {
        height: 30,
        width: 30,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: 'black'
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
        fontSize: 20,
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
