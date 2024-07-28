import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Switch,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../types/navigationTypes';
import { Feather, Octicons, AntDesign } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function CommerceAddAccess() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);
    const [haveCommerce, setHaveCommerce] = useState(true);

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
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            onPress={() => commerceNavigation.navigate("commerce_access_manager")}
                            style={styles.backButton}
                        >
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Adicionar acesso</Text>
                        <TouchableOpacity
                            onPress={() => commerceNavigation.navigate("home")}
                            style={styles.closeButton}
                        >
                            <AntDesign name="close" size={24} color="black" />
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    headerContainer: {
        position: 'relative',
        paddingHorizontal: 16,
        height: 96,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 24,
        marginBottom: 4,
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
        paddingTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#D1D5DB',
    },
    idLabel: {
        fontSize: 18,
    },
    idInput: {
        borderColor: '#DEE2E6',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        height: 48,
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
        height: 55,
        width: 55,
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
        marginTop: 25,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        alignItems: 'center',
        paddingVertical: 4
    },
    switchLabel: {
        fontSize: 20,
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
