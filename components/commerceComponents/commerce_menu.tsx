import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    StyleSheet
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../types/navigationTypes';
import { Feather, Octicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import QRCodeIcon from '../../assets/icons/qrcodeIcon';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function CommerceMenu() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setTimeout(() => {
            setShowSidebar(false);
        }, 300);
    };

    useEffect(() => {
        const backAction = () => {
            if (isSidebarOpen) {
                closeSidebar();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isSidebarOpen, closeSidebar]);

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => commerceNavigation.goBack()}
                    >
                        <Octicons name="chevron-left" size={32} color="black" />

                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Soverteria - Loja 1</Text>
                        <Text style={styles.headerSubtitle}>32594</Text>
                    </View>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={() => commerceNavigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'home' }],
                            })
                        )}
                    >
                        <AntDesign name="close" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => commerceNavigation.navigate('commerce_credit_extract')}>
                    <View style={[styles.menuItem, { borderTopWidth: 0 }]}>
                        <View style={styles.iconContainer}>
                            <Octicons name="list-unordered" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Extrato de créditos</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.menuItem}>
                        <View style={styles.iconContainer}>
                            <Feather name="eye" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Ver versão publicada</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => commerceNavigation.navigate('commerce_edit')}>
                    <View style={styles.menuItem}>
                        <View style={styles.iconContainer}>
                            <SimpleLineIcons name="pencil" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Editar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => commerceNavigation.navigate('commerce_access_manager')}>
                    <View style={styles.menuItem}>
                        <View style={styles.iconContainer}>
                            <Feather name="users" size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>Gerir acessos</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.menuItem}>
                        <View style={styles.iconContainer}>
                            <QRCodeIcon size={24} color="#0A3A74" />
                        </View>
                        <Text style={styles.menuItemText}>QR Code</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={[styles.menuItem]}>
                        <View style={[styles.iconContainer, styles.deleteIconContainer]}>
                            <Feather name="trash" size={24} color="#DC3545" />
                        </View>
                        <Text style={[styles.menuItemText, styles.deleteItemText]}>
                            Eliminar estabelecimento
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

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
        paddingTop: 30
    },
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        left: 40
    },
    backButton: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        left: 20
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 24,
    },
    headerSubtitle: {
        fontSize: 20,
        marginLeft: 24,
        color: '#635C5C',
        fontWeight: '400',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#DBDBDB',
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
});
