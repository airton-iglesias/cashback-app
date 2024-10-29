import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { Feather, Octicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import QRCodeIcon from '@/assets/icons/qrcodeIcon';
import { useLocale } from "@/contexts/TranslationContext";
import CommerceHeader from '@/components/commerce/commerceHeader';
import { router } from 'expo-router';
import { fontSize } from '@/constants/fonts';

const data = [
    {
        id: '1',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        discount: '20%',
        type: 'video',
        source: 'https://i.imgur.com/6Y8qkha.mp4',
        modal: {
            cupomCode: 'ID s039da',
            locationMap: null,
            website: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            flexDiscount: [
                {
                    currency: 'EUR',
                    value: 100,
                    discount: '10%'
                },
                {
                    currency: 'EUR',
                    value: 200,
                    discount: '20%'
                },
                {
                    currency: 'EUR',
                    value: 300,
                    discount: '30%'
                },
            ],
            about: "Lorem ipsum...",
            carouselImages: [
                {
                    id: '01',
                    image: 'https://i.imgur.com/7NvPLld.jpeg',
                },
                {
                    id: '02',
                    image: 'https://i.imgur.com/5Qx1oqV.jpeg',
                },
                {
                    id: '03',
                    image: 'https://i.imgur.com/2cFsaV2.png',
                }
            ]
        }
    },
];

export default function CommerceMenu() {
    const [modalVisible, setModalVisible] = useState(false);
    const [commerceModalVisible, setCommerceModalVisible] = useState(false);
    const { t } = useLocale();

    return (
        <SafeAreaView style={styles.safeArea}>

            <CommerceHeader
                Title={'Soverteria - Loja 1'}
                SubTitle={'32594'}
                ScreenGoback={() => router.back()}
                ScreenClose={() => router.replace("/commerce")}
            />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push('/commerce/credit_extract')}
                >
                    <View style={[styles.menuItem, { borderTopWidth: 0 }]}>
                        <View style={styles.iconContainer}>
                            <Octicons name="list-unordered" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.credit_extract")}</Text>
                    </View>
                </TouchableOpacity>


                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.menuItemButton}
                        onPress={() => router.push({ pathname: "/(app)/commerce_informations", params: { selectedItem: JSON.stringify(data[0]) } })}
                    >
                        <View style={styles.iconContainer}>
                            <Feather name="eye" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.published_version")}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push({
                            pathname: '/commerce/new',
                            params: { editor: 'true' },
                        })}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <SimpleLineIcons name="pencil" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.edit")}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('/commerce/access_manager')}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <Feather name="users" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.access_manager")}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuItem}>
                    <TouchableOpacity
                        onPress={() => router.push('/commerce/qrcode')}
                        activeOpacity={0.7}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <QRCodeIcon size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.qrcode")}</Text>
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
                            {t("commerce.menu.delete_commerce")}
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
                        <Text style={styles.modalText}>{t("commerce.menu.modal.title")}</Text>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => router.replace("/commerce")}
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
        width: '100%',
        height: '100%'
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
        fontSize: fontSize.labels.medium,
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
