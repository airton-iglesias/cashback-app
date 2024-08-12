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
import Input from '@/components/input';

type SearchNavigationProp = NativeStackNavigationProp<SearchParamList>;

const FiltersSearch = () => {
    const SearchNavigation = useNavigation<SearchNavigationProp>();

    const [maxDistance, setMaxDistance] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [place, setPlace] = useState<string>('Local');
    const [filterType, setFilterType] = useState<string>('Comercio');

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />
            {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}

            <View style={styles.container}>

                <View style={styles.inputWrapper}>
                    <Input
                        placeholder={'Buscar'}
                        onChange={(text: string) => setSearchValue(text)}
                    />
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={28} color="#828282" />
                    </View>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity 
                        style={filterType === "Comercio" ? [styles.button, styles.activeButton]: styles.button}
                        onPress={() => setFilterType("Comercio")}
                    >
                        <Text style={filterType === "Comercio" ? styles.activeButtonText: styles.buttonText}>Comercios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={filterType === "Eventos" ? [styles.button, styles.activeButton]: styles.button}
                        onPress={() => setFilterType("Eventos")}
                    >
                        <Text style={filterType === "Eventos" ? styles.activeButtonText: styles.buttonText}>Eventos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={filterType === "Promoções" ? [styles.button, styles.activeButton]: styles.button}
                        onPress={() => setFilterType("Promoções")}
                    >
                        <Text style={
                            filterType === "Promoções" ? styles.activeButtonText: styles.buttonText}>Promoções</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.sectionLabel}>Onde?</Text>
                    <View style={styles.buttonRowPlace}>
                        <TouchableOpacity 
                            style={place === "Local" ? [styles.button, styles.activeButton] : styles.button}
                            onPress={() => setPlace("Local")}
                        >
                            <Text style={place === "Local" ? styles.activeButtonText:styles.buttonText}>Local</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={place === "Online" ? [styles.button, styles.activeButton] : styles.button}
                            onPress={() => setPlace("Online")}
                        >
                            <Text style={place === "Online" ? styles.activeButtonText:styles.buttonText}>Online</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity 
                        style={place === "closeToMe" ? [styles.buttonLocation, styles.activeButton] : styles.buttonLocation}
                        onPress={() => setPlace("closeToMe")}
                    >
                        <EvilIcons name="location" size={24} color={place === "closeToMe" ? "white" : "black"} />
                        <Text style={place === "closeToMe" ? [styles.buttonLocationText, styles.activeButtonText] : styles.buttonLocationText}>Perto de mim</Text>
                    </TouchableOpacity>
                    <View style={styles.inputLocationWrapper}>
                        <Input
                            placeholder={'Escolha um local'}
                            onChange={(text: string) => setLocation(text)}
                        />
                    </View>
                </View>
                <View style={styles.sliderSection}>
                    <View style={styles.distanceTextWrapper}>
                        <Text style={styles.sectionLabel}>Distância máxima</Text>
                        <Text style={styles.sectionLabel}>{maxDistance} km</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={100}
                        step={10}
                        value={maxDistance}
                        onValueChange={(value) => setMaxDistance(value)}
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
        fontSize: 15
    },
    activeButtonText: {
        color: '#fff',
        fontSize: 15
    },
    buttonText: {
        color: '#000',
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
