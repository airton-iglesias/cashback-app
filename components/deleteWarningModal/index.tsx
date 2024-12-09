import { fontSize } from "@/constants/fonts";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';

export default function DeleteWarningModal({ handleDelete, modalVisible, setModalVisible, deleteLoading, text }: any) {
    return (
        <View>
            {/* modal to warning about delete */}
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
                        <View style={[styles.iconContainer, styles.deleteIconContainer]}>
                            <Feather name="trash" size={24} color="#DC3545" />
                        </View>
                        <Text style={styles.modalText}>{text}</Text>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleDelete}
                                style={styles.modalSaveButton}
                                disabled={deleteLoading}
                            >
                                <View style={styles.modalButtonSaveContent}>

                                    {deleteLoading ? (
                                        <ActivityIndicator size={24} color="#fff" />
                                    ) : (
                                        <Feather name="check" size={24} color="white" />
                                    )}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setModalVisible(false)}
                                style={styles.modalSaveButton}
                                disabled={deleteLoading}
                            >
                                <View style={styles.modalButtonCancelContent}>
                                    <AntDesign name="close" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* End of modal to warning about delete */}
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
        color: '#DC3545'
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
    iconContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#DEEDFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    deleteIconContainer: {
        backgroundColor: '#FFE0E0',
    },
    deleteItemText: {
        color: '#DC3545',
    },
});