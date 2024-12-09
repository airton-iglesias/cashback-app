import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";

export default function TextEditorColorPicker({ colors, applyTextColor, isVisible, onClose }: any) {


    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            style={{ backgroundColor: 'red' }}
        >
            <View style={styles.colorPickerContainer}>
                <View style={styles.placeholder} />
                <View style={styles.placeholder} />
                <View style={styles.placeholder} />
                <View style={styles.colorPicker}>
                    <View style={styles.colorPickerButtons}>
                        {colors.map((color: any) => (
                            <TouchableOpacity
                                key={color}
                                style={[styles.colorOption, { backgroundColor: color }]}
                                onPress={() => applyTextColor(color)}
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.placeholder} />
                <View style={styles.placeholder} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    colorPickerContainer: {
        position: 'absolute',
        gap: 20,
        zIndex: 50,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 8,
        marginBottom: 20,
        top: 135,
        paddingRight: 12
    },
    placeholder: {
        width: 30,
        height: 30,
    },
    colorPicker: {
        width: 50,
        height: 30,
        marginLeft: 4,
    },
    colorPickerButtons: {
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        top: 53,
        zIndex: 1000,
        borderRadius: 8,
        alignItems: 'center'
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginVertical: 5,
        borderWidth: 1,
        marginRight: 1
    }
})