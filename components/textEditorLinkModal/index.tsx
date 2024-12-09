import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import Input from "../input";
import { fontSize } from "@/constants/fonts";
import { useLocale } from "@/contexts/TranslationContext";

export default function TextEditorLinkModal({ modalVisible, setModalVisible, handleSaveLink }: any) {
    const [linkTitle, setLinkTitle] = useState<string>('');
    const [linkURL, setLinkURL] = useState<string>('');
    const { t } = useLocale();

    const handleSave = () => {
        handleSaveLink(linkTitle, linkURL);
        setLinkTitle('');
        setLinkURL('');
        setModalVisible(false);
    };

    return (
        <View>
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
                                onPress={handleSave}
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
        </View>
    );
}

const styles = StyleSheet.create({

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