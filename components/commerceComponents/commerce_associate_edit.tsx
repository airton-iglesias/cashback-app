import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    TextInput,
    Switch,
    StyleSheet
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../types/navigationTypes';
import { Feather, Octicons, AntDesign } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function CommerceAssociateEdit() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

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
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Pode ver registros</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Pode ver e apagar registros</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={styles.deleteAccountRow}>
                        <Text style={styles.deleteAccountText}>Desassociar conta</Text>
                        <Feather name="trash" size={24} color="#DC3545" style={styles.deleteIcon} />
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => commerceNavigation.navigate("commerce_access_manager")}
                        style={styles.submitButton}
                    >
                        <View style={styles.submitButtonInner}>
                            <Feather name="check" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
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
    idContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    idLabel: {
        fontSize: 18,
    },
    idInput: {
        borderColor: '#DEE2E6',
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
        paddingVertical: 8,
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
});
