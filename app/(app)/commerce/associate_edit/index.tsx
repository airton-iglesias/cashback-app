import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import Switch from '@/components/switch';
import CommerceHeader from '@/components/commerceHeader';
import {useLocale} from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { fontSize } from '@/constants/fonts';

export default function CommerceAssociateEdit() {
    const [administrador, setAdministrador] = useState(false);
    const [canSeeLogs, setCanSeeLogs] = useState(false);
    const [canEraseLogs, setCanEraseLogs] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const { t } = useLocale();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <CommerceHeader
                    Title={'Pedro'}
                    SubTitle={'32594'}
                    ScreenGoback={() => router.back()}
                    ScreenClose={() => router.replace("/commerce")}
                />

                <View style={styles.idContainer}>
                    <Text style={styles.idLabel}>{t("commerce.edit_associate.id")}</Text>
                    <TextInput
                        cursorColor={'#ADB5BD'}
                        value={'355643'}
                        style={styles.idInput}
                    />
                </View>

                <View style={styles.personContainer}>
                    <TouchableOpacity style={styles.personButton}>
                        <View style={styles.personInfo}>
                            <View style={styles.personAvatar}>
                                <Text style={styles.personAvatarText}>Pe</Text>
                            </View>
                            <View>
                                <Text style={styles.personName}>Pedro</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.switchContainer}>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{t("commerce.edit_associate.admin")}</Text>
                        <Switch
                            onChange={((mode: boolean) => setAdministrador(mode))}
                            value={administrador}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{t("commerce.edit_associate.can_see_logs")}</Text>
                        <Switch
                            onChange={((mode: boolean) => setCanSeeLogs(mode))}
                            value={canSeeLogs}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{t("commerce.edit_associate.can_see_and_erase_logs")}</Text>
                        <Switch
                            onChange={((mode: boolean) => setCanEraseLogs(mode))}
                            value={canEraseLogs}
                        />
                    </View>

                    <View style={styles.deleteAccountRow}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.delAssociate}
                        >
                            <Text style={styles.deleteAccountText}>{t("commerce.edit_associate.disassociate_user")}</Text>
                            <Feather name="trash" size={24} color="#DC3545" style={styles.deleteIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.submitButton}
                        activeOpacity={0.7}
                    >
                        <View style={styles.submitButtonInner}>
                            <Feather name="check" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
                        <Text style={styles.modalText}>{t("commerce.edit_associate.modal.remove_user")}</Text>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => router.back()}
                                style={styles.modalSaveButton}
                            >
                                <View style={styles.modalButtonSaveContent}>
                                    <Feather name="check" size={24} color="white" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.modalSaveButton}
                                activeOpacity={0.7}
                            >
                                <View style={styles.modalButtonCancelContent}>
                                    <AntDesign name="close" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },

    scrollViewContent: {
        flexGrow: 1,
    },
    idContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    idLabel: {
        fontSize: fontSize.labels.medium,
    },
    idInput: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        height: 56,
        paddingHorizontal: 16,
        fontSize: fontSize.labels.medium,
        color: '#6C757D',
        marginTop: 8,
    },
    personContainer: {
        paddingHorizontal: 20,
    },
    personButton: {
        width: '100%',
    },
    personInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingBottom: 16,
    },
    personAvatar: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: '#CADCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personAvatarText: {
        color: '#0093FD',
        fontSize: fontSize.labels.medium,
        fontWeight: 'bold',
    },
    personName: {
        fontSize: fontSize.labels.large,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    switchContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingVertical: 16,
        alignItems: 'center'

    },
    switchLabel: {
        fontSize: fontSize.labels.medium,
    },
    deleteAccountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingVertical: 16,
    },
    deleteAccountText: {
        fontSize: fontSize.labels.medium,
        color: '#DC3545',
    },
    delAssociate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    deleteIcon: {
        marginRight: 10,
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    submitButton: {
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
    },
    submitButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: 56,
        borderRadius: 8,
        paddingHorizontal: 16,
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
});
