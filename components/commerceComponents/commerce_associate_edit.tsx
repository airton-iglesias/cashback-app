import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../types/navigationTypes';
import { Feather, AntDesign } from '@expo/vector-icons';
import Switch from '@/components/switch';
import CommerceHeader from './commerceHeader';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function CommerceAssociateEdit() {
    const [administrador, setAdministrador] = useState(false);
    const [canSeeLogs, setCanSeeLogs] = useState(false);
    const [canEraseLogs, setCanEraseLogs] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <CommerceHeader
                    Title={'Pedro'}
                    SubTitle={'32594'}
                    ScreenGoback={() => commerceNavigation.goBack()}
                    ScreenClose={() => commerceNavigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'home' }],
                        })
                    )}
                />

                <View style={styles.idContainer}>
                    <Text style={styles.idLabel}>ID</Text>
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
                        <Text style={styles.switchLabel}>Administrador</Text>
                        <Switch
                            onChange={((mode: boolean) => setAdministrador(mode))}
                            value={administrador}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Pode ver registros</Text>
                        <Switch
                            onChange={((mode: boolean) => setCanSeeLogs(mode))}
                            value={canSeeLogs}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Pode ver e apagar registros</Text>
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
                            <Text style={styles.deleteAccountText}>Desassociar conta</Text>
                            <Feather name="trash" size={24} color="#DC3545" style={styles.deleteIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => commerceNavigation.goBack()}
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
                        <Text style={styles.modalText}>Remover conta?</Text>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => () => commerceNavigation.goBack()}
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
        fontSize: 18,
    },
    idInput: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        height: 56,
        paddingHorizontal: 16,
        fontSize: 18,
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    personName: {
        fontSize: 20,
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
        fontSize: 20,
    },
    deleteAccountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingVertical: 16,
    },
    deleteAccountText: {
        fontSize: 20,
        color: '#DC3545',
    },
    delAssociate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
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
        fontSize: 20,
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
