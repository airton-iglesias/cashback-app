import { fontSize } from "@/constants/fonts";
import { useLocale } from "@/contexts/TranslationContext";
import { Feather } from "@expo/vector-icons";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PermissionGalleryModal({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {

    const { t } = useLocale();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={styles.iconContainer}>
                            <Feather name="alert-triangle" size={24} color="#664D03" />
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={styles.modalText}>{t("profile.noPermissionGallery")}</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => onClose()}
                        style={styles.modalSaveButton}
                    >
                        <View style={styles.modalButtonSaveContent}>
                            <Feather name="check" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        zIndex: 10
    },
    modalText: {
        fontSize: fontSize.labels.medium,
        marginVertical: 20,
        color: '#fff',
        textAlign: 'center'
    },
    iconContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#FFF3CD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        shadowRadius: 4,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        gap: 20,
        width: '100%'
    },
    modalSaveButton: {
        width: '100%',
        borderRadius: 8,
    },
    modalButtonSaveContent: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    }
});
