import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../types/navigationTypes';
import { Feather, Octicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import QRCodeIcon from '../../assets/icons/qrcodeIcon';
import CommerceHeader from './CommerceHeader';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function CommerceMenu() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <SafeAreaView style={styles.safeArea}>

            <CommerceHeader
                Title={'Soverteria - Loja 1'}
                SubTitle={'32594'}
                ScreenGoback={() => commerceNavigation.goBack()}
                ScreenClose={() => commerceNavigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'home' }],
                    })
                )}
            />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => commerceNavigation.navigate('commerce_credit_extract')}
                >
                    <View style={[styles.menuItem, { borderTopWidth: 0 }]}>
                        <View style={styles.iconContainer}>
                            <Octicons name="list-unordered" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Extrato de créditos</Text>
                    </View>
                </TouchableOpacity>


                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <Feather name="eye" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Ver versão publicada</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => commerceNavigation.navigate('new_commerce_step_0')}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <SimpleLineIcons name="pencil" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Editar</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => commerceNavigation.navigate('commerce_access_manager')}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <Feather name="users" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Gerir acessos</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.menuItem}>
                    <TouchableOpacity
                        onPress={() => commerceNavigation.navigate('commerce_qrcode')}
                        activeOpacity={0.7}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <QRCodeIcon size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>QR Code</Text>
                    </TouchableOpacity>
                </View>



                <View style={[styles.menuItem]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.menuItemButton}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <View style={[styles.iconContainer, styles.deleteIconContainer]}>
                            <Feather name="trash" size={24} color="#DC3545" />
                        </View>
                        <Text style={[styles.menuItemText, styles.deleteItemText]}>
                            Eliminar estabelecimento
                        </Text>
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
                        <Text style={styles.modalText}>Remover comercio?</Text>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => commerceNavigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: 'home' }],
                                    })
                                )}
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
        </SafeAreaView >
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
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#DBDBDB',
    },
    menuItemButton: {
        flexDirection: 'row',
        alignItems: 'center',
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
    menuItemText: {
        fontSize: 18,
        fontWeight: 'normal',
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
