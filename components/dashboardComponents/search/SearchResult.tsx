import ModalCommerce from '@/components/modalCommerce';
import React, { useState } from 'react';
import { Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchParamList } from '@/types/navigationTypes';
import MapPinnedIcon from '@/assets/icons/mapPinnedIcon';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

type SearchNavigationProp = NativeStackNavigationProp<SearchParamList>;

const data = [
    {
        id: '1',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        distance: '3km',
        discount: '30%',
        type: 'image',
        source: 'url da midia',
        cashbackLocationType: 'local',
        modal: {
            haveCupom: false,
            haveLocation: false,
            site: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            discountAbove100: "20%",
            discountAbove200: "30%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },
    {
        id: '2',
        title: 'Fitness Center 2',
        location: 'Beja, Portugal',
        discount: '50%',
        distance: '3km',
        type: 'image',
        source: 'url da midia',
        cashbackLocationType: 'local',
        modal: {
            haveCupom: true,
            haveLocation: true,
            site: "sitebacalhao.com",
            distance: "3km",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Promoção",
            baseDiscount: "30%",
            discountAbove100: "40%",
            discountAbove200: "50%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },
    {
        id: '3',
        title: 'Fitness Center 3',
        location: 'Beja, Portugal',
        distance: '3km',
        discount: '50%',
        type: 'image',
        source: 'url da midia',
        cashbackLocationType: 'local',
        modal: {
            haveCupom: true,
            haveLocation: true,
            site: "sitebacalhao.com",
            distance: "3km",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Promoção",
            baseDiscount: "30%",
            discountAbove100: "40%",
            discountAbove200: "50%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },
    {
        id: '4',
        title: 'Fitness Center 4',
        location: 'Beja, Portugal',
        distance: '3km',
        discount: '50%',
        type: 'image',
        source: 'url da midia',
        cashbackLocationType: 'local',
        modal: {
            haveCupom: true,
            haveLocation: true,
            site: "sitebacalhao.com",
            distance: "3km",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Promoção",
            baseDiscount: "30%",
            discountAbove100: "40%",
            discountAbove200: "50%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },

];

export default function SearchResult() {

    const SearchNavigation = useNavigation<SearchNavigationProp>();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [isMapButtonOpen, setIsMapButtonOpen] = useState(false)

    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);

    const [password, setPassword] = useState('');

    const INITIAL_REGION = {
        latitude: 38.7266085,
        longitude: -9.1503216,
        latitudeDelta: 2,
        longitudeDelta: 2,
    }

    const handleItemPress = (item: any) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() === '') {
            setInputPasswordError(false);
        }
        else {
            setInputPasswordError(!validatePassword(text));
        };
    };

    const handleShowMap = () => {
        if (showMap) {
            setShowMap(false);
            return;
        }
        setShowMap(true);
    };

    const handleMapButtonOpen = () => {
        if (isMapButtonOpen) {
            setIsMapButtonOpen(false);
            return;
        }
        setIsMapButtonOpen(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity style={styles.headerBackIcon} onPress={() => SearchNavigation.goBack()}>
                        <Entypo name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
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
                            placeholderTextColor={'gray'}
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
                </View>

                <View style={styles.cashbackTypeWrapper}>
                    <TouchableOpacity style={styles.cashbackTypeButtonAtive}>
                        <Text style={styles.cashbackTypeTextActive}>Comercios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cashbackTypeButton, styles.cashbackTypeButtonMiddle]}>
                        <Text style={styles.cashbackTypeText}>Eventos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cashbackTypeButton}>
                        <Text style={styles.cashbackTypeText}>Promoções</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchResultInfos}>
                <Text style={styles.searchResultInfosText}>{data.length} Resultados</Text>
                <View style={styles.iconsWrapper}>
                    {showMap ?
                        <TouchableOpacity onPress={handleShowMap}>
                            <FontAwesome5 name="list-ul" size={24} color="#0D6EFD" />
                        </TouchableOpacity>
                        :
                        <>
                            <TouchableOpacity onPress={handleShowMap}>
                                <MapPinnedIcon />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome5 name="sort-alpha-up" size={24} color="#0D6EFD" />
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </View>

            {showMap ?
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    showsUserLocation={true}
                    initialRegion={INITIAL_REGION}
                />
                :
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                            <Image style={styles.image} source={require('../../../assets/images/reidobacalhau.png')} />
                            <View style={styles.textContainer}>
                                <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.location}>{item.location}</Text>
                                    <Text style={styles.location}>{item.distance}</Text>
                                </View>
                                <View style={styles.tagsContainer}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.eventTag}>{item.modal.cashbackType}</Text>
                                        <Text style={styles.localTag}>{item.cashbackLocationType}</Text>
                                    </View>
                                    <View style={[styles.discount]}>
                                        <Text style={styles.discountText}>{item.discount}</Text>
                                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={15} color="#D9A100" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingBottom: 110 }}
                />
            }

            {showMap ?
                <View style={styles.mapButtonWrapper}>
                    <TouchableOpacity onPress={handleMapButtonOpen}>
                        <View style={styles.mapButtonContent}>
                            <Text style={styles.mapButtonText}>Mapa</Text>
                            {isMapButtonOpen ?
                                <Entypo name="chevron-down" size={24} color="white" />
                                :
                                <Entypo name="chevron-up" size={24} color="white" />
                            }
                        </View>
                    </TouchableOpacity>
                    {

                        isMapButtonOpen ?
                            <TouchableOpacity style={styles.item}>
                                <Image style={styles.image} source={require('../../../assets/images/reidobacalhau.png')} />
                                <View style={styles.textContainer}>
                                    <Text numberOfLines={2} style={styles.title}>{'Fitness Center'}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.location}>{'Beja, Portugal'}</Text>
                                        <Text style={styles.location}>{'3km'}</Text>
                                    </View>
                                    <View style={styles.tagsContainer}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.eventTag}>{'Evento'}</Text>
                                            <Text style={styles.localTag}>{'Local'}</Text>
                                        </View>
                                        <View style={[styles.discount]}>
                                            <Text style={styles.discountText}>{'50%'}</Text>
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={15} color="#D9A100" />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity> :
                            null
                    }
                </View>
                : null
            }

            {selectedItem && (
                <ModalCommerce
                    modalVisible={modalVisible}
                    selectedItem={selectedItem}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        height: 190,
        width: '100%',
        backgroundColor: '#212121',
        paddingHorizontal: 15,
        gap: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    headerWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
    headerBackIcon: {
        height: 48,
        width: 48,
        borderRadius: 999,
        backgroundColor: '#303030',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cashbackTypeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5
    },
    cashbackTypeButton: {
        width: 125,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cashbackTypeButtonAtive: {
        width: 110,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    cashbackTypeButtonMiddle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white'
    },
    cashbackTypeText: {
        color: '#fff'
    },
    cashbackTypeTextActive: {
        color: 'black'
    },
    searchResultInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
    },
    searchResultInfosText: {
        fontSize: 18
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        backgroundColor: 'white'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    location: {
        color: '#555',
        marginBottom: 8,
        fontSize: 16
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eventTag: {
        backgroundColor: '#D1E7DD',
        color: '#2D6A4F',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    localTag: {
        backgroundColor: '#BBBBBB',
        color: '#0A3622',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    discount: {
        backgroundColor: '#FFF3D0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginBottom: 4
    },
    discountText: {
        color: '#D9A100',
        fontSize: 16,
        marginBottom: 2
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
    },
    inputWrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
        color: '#FFF',
        borderColor: '#434343',
        paddingLeft: 50,
        backgroundColor: '#2D2D2D'
    },
    inputFocused: {
        borderColor: '#000000',
    },
    inputError: {
        borderColor: '#DC3545',
    },
    mapButtonWrapper: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#212121',
        paddingBottom: 80,
        bottom: 0
    },
    mapButtonContent: {
        height: 54,
        width: '100%',
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    mapButtonText: {
        color: 'white',
        fontSize: 17
    },
    iconsWrapper: {
        flexDirection: 'row',
        gap: 20
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
