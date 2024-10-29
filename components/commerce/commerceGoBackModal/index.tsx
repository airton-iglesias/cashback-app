import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';

export default function CommerceGoBackModal({ modalVisible, setModalVisible, ScreenGoback }: any) {
    const { t } = useLocale();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.modalText}>{t("commerce.new_commerce.gobackModal.description1")}</Text>
                        <Text style={styles.modalText}>{t("commerce.new_commerce.gobackModal.description2")}</Text>
                    </View>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={ScreenGoback}
                            style={styles.modalSaveButton}
                        >
                            <View style={styles.modalButtonSaveContent}>
                                <Feather name="check" size={24} color="black" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setModalVisible(false)}
                            style={styles.modalSaveButton}
                        >
                            <View style={styles.modalButtonCancelContent}>
                                <AntDesign name="close" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        shadowRadius: 4,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        gap: 20
    },
    modalText: {
        textAlign: 'center',
        fontSize: fontSize.labels.medium,
        color: 'white'
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
        backgroundColor: 'white',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    modalButtonCancelContent: {
        flexDirection: 'row',
        backgroundColor: '#232323',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
});
