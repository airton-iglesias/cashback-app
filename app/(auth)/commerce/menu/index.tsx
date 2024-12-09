import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Feather, Octicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import QRCodeIcon from '@/assets/icons/qrcodeIcon';
import { useLocale } from "@/contexts/TranslationContext";
import CommerceHeader from '@/components/commerce/commerceHeader';
import { router, useLocalSearchParams } from 'expo-router';
import { fontSize } from '@/constants/fonts';
import DeleteWarningModal from '@/components/deleteWarningModal';

export default function CommerceMenu() {
    const [modalVisible, setModalVisible] = useState(false);
    const { id, name } = useLocalSearchParams();
    const { t } = useLocale();
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleDelete = () => {
        // Implement delete logic here
        setModalVisible(false);

    };
    return (
        <SafeAreaView style={styles.safeArea}>

            <CommerceHeader
                Title={`${name}`}
                SubTitle={`${id}`}
                ScreenGoback={() => router.back()}
                ScreenClose={() => router.replace("/commerce")}
            />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Extract button */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/commerce/credit_extract', params: { id: id, name: name } })}
                >
                    <View style={[styles.menuItem, { borderTopWidth: 0 }]}>
                        <View style={styles.iconContainer}>
                            <Octicons name="list-unordered" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.credit_extract")}</Text>
                    </View>
                </TouchableOpacity>
                {/* End of Extract button */}

                {/* Commerce information button */}
                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.menuItemButton}
                        onPress={() => router.push({ pathname: "/commerce_informations", params: { id: id, name: name } })}
                    >
                        <View style={styles.iconContainer}>
                            <Feather name="eye" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.published_version")}</Text>
                    </TouchableOpacity>
                </View>
                {/* End of Commerce information button */}

                {/* Edit button */}
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
                {/* End of Edit button */}

                {/* Access manager button */}
                <View style={styles.menuItem}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push({ pathname: '/commerce/access_manager', params: { id: id, name: name } })}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <Feather name="users" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.access_manager")}</Text>
                    </TouchableOpacity>
                </View>
                {/* End of Access manager button */}

                {/* QRcode button */}
                <View style={styles.menuItem}>
                    <TouchableOpacity
                        onPress={() => router.push({ pathname: '/commerce/qrcode', params: { id: id, name: name } })}
                        activeOpacity={0.7}
                        style={styles.menuItemButton}
                    >
                        <View style={styles.iconContainer}>
                            <QRCodeIcon size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>{t("commerce.menu.qrcode")}</Text>
                    </TouchableOpacity>
                </View>
                {/* End of QRcode button */}

                {/* Delete button */}
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
                {/* End of Delete button */}
            </ScrollView>

            <DeleteWarningModal
                text={t("commerce.menu.modal.title")}
                deleteLoading={deleteLoading}
                handleDelete={handleDelete}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
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
