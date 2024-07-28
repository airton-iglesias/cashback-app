import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Feather, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchParamList } from '@/types/navigationTypes';
import Topbar from '@/components/header';
import NotificationSidebar from '@/components/notificationSidebar';
import Sidebar from '@/components/sidebar';

type SearchNavigationProp = NativeStackNavigationProp<SearchParamList>;

const FiltersSearch = () => {

    const SearchNavigation = useNavigation<SearchNavigationProp>();

    const [distance, setDistance] = useState<number>(10);
    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);

    const [password, setPassword] = useState('');

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);


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

    const openNotifications = () => {
        setIsNotificationsOpen(true);
        setShowNotifications(true);
    };

    const closeNotifications = () => {
        setIsNotificationsOpen(false);
        setTimeout(() => {
            setShowNotifications(false);
        }, 300);
    };


    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() === '') {
            setInputPasswordError(false);
        } else {
            setInputPasswordError(!validatePassword(text));
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>

            {showTopbar && <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />}
            {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}

            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <View
                        style={[
                            styles.inputHighlight,
                            inputPasswordIsFocus && styles.inputHighlightVisible,
                            inputPasswordError && styles.inputErrorHighlight
                        ]}
                    ></View>
                    <TextInput
                        cursorColor={'#ADB5BD'}
                        onFocus={() => setInputPasswordIsFocus(true)}
                        onBlur={() => setInputPasswordIsFocus(false)}
                        onChangeText={handlePasswordChange}
                        value={password}
                        placeholder='Buscar'
                        style={[
                            styles.input,
                            inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                            inputPasswordError && styles.inputError
                        ]}
                    />
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={28} color="#828282" />
                    </View>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, styles.activeButton]}>
                        <Text style={styles.buttonText && styles.activeButton}>Comercios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Eventos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Promoções</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.sectionLabel}>Onde?</Text>
                    <View style={styles.buttonRowPlace}>
                        <TouchableOpacity style={[styles.button, styles.activeButton]}>
                            <Text style={styles.buttonText && styles.activeButton}>Local</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Online</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonLocation}>
                        <EvilIcons name="location" size={24} color="black" />
                        <Text style={styles.buttonLocationText}>Perto de mim</Text>
                    </TouchableOpacity>
                    <View style={styles.inputLocationWrapper}>
                        <View
                            style={[
                                styles.inputHighlight,
                                inputPasswordIsFocus && styles.inputHighlightVisible,
                                inputPasswordError && styles.inputErrorHighlight
                            ]}
                        ></View>
                        <TextInput
                            cursorColor={'#ADB5BD'}
                            onFocus={() => setInputPasswordIsFocus(true)}
                            onBlur={() => setInputPasswordIsFocus(false)}
                            onChangeText={handlePasswordChange}
                            value={password}
                            placeholder='Escolher um local'
                            style={[
                                styles.input,
                                inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                inputPasswordError && styles.inputError
                            ]}
                        />
                    </View>
                </View>
                <View style={styles.sliderSection}>
                    <View style={styles.distanceTextWrapper}>
                        <Text style={styles.sectionLabel}>Distância máxima</Text>
                        <Text style={styles.sectionLabel}>{distance}km</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={100}
                        step={10}
                        value={distance}
                        onValueChange={(value) => setDistance(value)}
                        minimumTrackTintColor="gray"
                        maximumTrackTintColor="#CCCCCC"
                        thumbTintColor={'#000000'}
                    />
                </View>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => SearchNavigation.navigate('searchresult')}
                >
                    <View style={styles.nextButtonContent}>
                        <Feather name="check" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 150,
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputLocationWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
        borderRadius: 10,
        opacity: 0,
    },
    inputHighlightVisible: {
        opacity: 0.15,
        borderColor: '#6610F2',
    },
    inputErrorHighlight: {
        opacity: 0.20,
        borderColor: '#DC3545',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 48,
        fontSize: 18,
        color: '#ADB5BD',
        borderColor: '#ADB5BD',
        paddingLeft: 15,
        paddingRight: 50
    },
    inputFocused: {
        borderColor: '#000000',
    },
    inputError: {
        borderColor: '#DC3545',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20,
    },
    buttonRowPlace: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
        gap: 18
    },
    button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#CED4DA',
        width: 115,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    activeButton: {
        backgroundColor: '#000000',
        color: 'white',
        fontSize: 15
    },
    buttonText: {
        color: '#000000',
        fontSize: 15
    },
    buttonLocation: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#CED4DA',
        width: 152,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: 'black',
        gap: 8
    },
    buttonLocationText: {
        fontSize: 15
    },
    sectionLabel: {
        fontSize: 20
    },
    sliderSection: {
        alignItems: 'center',
        marginVertical: 30,
    },
    distanceTextWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    slider: {
        width: '107%',
        height: 40,
        marginTop: 10
    },
    nextButton: {
        borderRadius: 8,
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: 56,
        borderRadius: 8,
        paddingHorizontal: 16,
    },
});

export default FiltersSearch;
