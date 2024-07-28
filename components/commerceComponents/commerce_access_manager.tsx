import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../types/navigationTypes';
import { FontAwesome6 } from '@expo/vector-icons';
import { Octicons, AntDesign } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'new_commerce_step_1'>;

export default function CommerceAccessManager() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);
    const [haveCommerce, setHaveCommerce] = useState(true);

    const commerceDatas = [{
        name: 'Nome do comercio',
    }];

    const openSidebar = () => {
        setShowSidebar(true);
        setIsSidebarOpen(true);
    };

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

                <View style={styles.manageAccessContainer}>
                    <Text style={styles.manageAccessTitle}>Gerir acessos</Text>
                </View>

                <View style={styles.commerceInfoContainer}>
                    <View style={styles.commerceInfoInner}>
                        <Image
                            source={require('../../assets/images/sorveteria.png')}
                            style={styles.commerceImage}
                        />
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.commerceName}>Nome atrelado ao ID</Text>
                            <Text style={styles.commerceId}>#32594</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.accessItemContainer}>
                    <TouchableOpacity
                        onPress={() => commerceNavigation.navigate('commerce_associate_edit')}
                        style={styles.accessItemButton}
                    >
                        <View style={styles.accessItemInner}>
                            <View style={styles.accessItemAvatar}>
                                <Text style={styles.accessItemAvatarText}>Pe</Text>
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={styles.accessItemName}>Pedro</Text>
                                <Text style={styles.accessItemId}>#32594</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.accessItemContainer}>
                    <View style={styles.accessItemInner}>
                        <View style={styles.accessItemAvatarRed}>
                            <Text style={styles.accessItemAvatarTextRed}>Fe</Text>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={styles.accessItemName}>Fernanda</Text>
                            <Text style={styles.accessItemId}>#32594</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => commerceNavigation.navigate('commerce_add_access')}
                    style={styles.addButton}
                >
                    <FontAwesome6 name="plus" size={24} color="white" />
                </TouchableOpacity>
            </ScrollView>

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
    manageAccessContainer: {
        paddingTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    manageAccessTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    commerceInfoContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
    },
    commerceInfoInner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingBottom: 16,
    },
    commerceImage: {
        height: 64,
        width: 64,
        borderRadius: 32,
    },
    commerceName: {
        fontSize: 20,
    },
    commerceId: {
        fontSize: 18,
        marginTop: 8,
    },
    accessItemContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
    },
    accessItemButton: {
        width: '100%',
    },
    accessItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingBottom: 16,
    },
    accessItemAvatar: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: '#CADCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessItemAvatarText: {
        color: '#0093FD',
        fontSize: 20,
        fontWeight: 'bold',
    },
    accessItemName: {
        fontSize: 20,
        fontWeight: '400'
    },
    accessItemId: {
        fontSize: 16,
        marginTop: 4,
        color: '#635C5C'
    },
    accessItemAvatarRed: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: '#FFDADA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessItemAvatarTextRed: {
        color: '#B72E2E',
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        width: 78,
        height: 78,
        bottom: 18,
        right: 18,
        borderRadius: 39,
        position: 'absolute',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
});
