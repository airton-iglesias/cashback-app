import ModalCommerce from '@/components/modalCommerce';
import React, { useEffect, useState } from 'react';
import { Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Dimensions, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchParamList } from '@/types/navigationTypes';
import MapPinnedIcon from '@/assets/icons/mapPinnedIcon';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

type SearchNavigationProp = NativeStackNavigationProp<SearchParamList>;

type DataItem = {
    id: string;
    title: string;
    location: string;
    distance: string;
    discount: string;
    type: string;
    source: string;
    cashbackLocationType: string;
    modal: {
        haveCupom: boolean;
        haveLocation: boolean;
        site: string;
        createdBy: string;
        eventDate: string;
        cashbackType: string;
        baseDiscount: string;
        discountAbove100: string;
        discountAbove200: string;
        about: string;
    };
};


const data = [
    {
        id: '1',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        distance: '2km',
        discount: '10%',
        type: 'image',
        source: 'url da midia',
        cashbackLocationType: 'local',
        modal: {
            cupomCode: 'ID s039da',
            locationMap: '',
            website: "www.maps.google.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "12 out - 20:00 a 13 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            discountAbove100: "20%",
            discountAbove200: "30%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },
];
export default function SearchResult() {
    const SearchNavigation = useNavigation<SearchNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
    const [showMap, setShowMap] = useState(false);
    const [isMapButtonOpen, setIsMapButtonOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showSortList, setShowSortList] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Comercios');
    const [sortCriteria, setSortCriteria] = useState('date');
    const [isMapSelectedItem, setIsMapSelectedItem] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const INITIAL_REGION = {
        latitude: 38.7266085,
        longitude: -9.1503216,
        latitudeDelta: 2,
        longitudeDelta: 2,
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleItemPress = (item: any) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    const handleShowMap = () => {
        setShowMap(!showMap);
    };

    const handleMapButtonOpen = () => {
        setIsMapButtonOpen(!isMapButtonOpen);
    };

    const handleFilterChange = (filter: any) => {
        setActiveFilter(filter);
    };

    const handleSortChange = (criteria: any) => {
        setSortCriteria(criteria);
        setShowSortList(false);
    };

    const filteredData = data.filter(item => {
        const matchesFilter =
            activeFilter === 'Comercios' ? true :
                activeFilter === 'Eventos' ? item.modal.cashbackType === 'Evento' :
                    activeFilter === 'Promoções' ? item.modal.cashbackType === 'Promoção' :
                        true;

        const matchesSearchInput = item.title.toLowerCase().includes(searchInput.toLowerCase());

        return matchesFilter && matchesSearchInput;
    });

    const sortedData = filteredData.sort((a, b) => {
        if (sortCriteria === 'discount') {
            return parseInt(b.discount) - parseInt(a.discount);
        } else if (sortCriteria === 'distance') {
            return parseFloat(a.distance) - parseFloat(b.distance);
        } else if (sortCriteria === 'date') {
            return new Date(b.modal.eventDate).getTime() - new Date(a.modal.eventDate).getTime();
        }
        return 0;
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity style={styles.headerBackIcon} onPress={() => SearchNavigation.goBack()}>
                        <Entypo name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.inputWrapper}>
                        <TextInput
                            cursorColor={'#ADB5BD'}
                            onChangeText={(text) => setSearchInput(text)}
                            value={searchInput}
                            placeholder='Buscar'
                            placeholderTextColor={'gray'}
                            style={styles.input}
                        />
                        <View style={styles.searchIcon}>
                            <Feather name="search" size={28} color="#828282" />
                        </View>
                    </View>
                </View>

                <View style={styles.cashbackTypeWrapper}>
                    <TouchableOpacity
                        style={[
                            styles.cashbackTypeButton,
                            activeFilter === 'Comercios' && styles.cashbackTypeButtonAtive
                        ]}
                        onPress={() => handleFilterChange('Comercios')}
                    >
                        <Text style={activeFilter === 'Comercios' ? styles.cashbackTypeTextActive : styles.cashbackTypeText}>Comercios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.cashbackTypeButton, styles.cashbackTypeButtonMiddle, activeFilter === 'Eventos' && styles.cashbackTypeButtonAtive,]}
                        onPress={() => handleFilterChange('Eventos')}
                    >
                        <Text style={activeFilter === 'Eventos' ? styles.cashbackTypeTextActive : styles.cashbackTypeText}>Eventos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.cashbackTypeButton,
                            activeFilter === 'Promoções' && styles.cashbackTypeButtonAtive
                        ]}
                        onPress={() => handleFilterChange('Promoções')}
                    >
                        <Text style={activeFilter === 'Promoções' ? styles.cashbackTypeTextActive : styles.cashbackTypeText}>Promoções</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchResultInfos}>
                <Text style={styles.searchResultInfosText}>{filteredData.length} Resultados</Text>
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

                            <TouchableOpacity onPress={() => setShowSortList(true)}>
                                <FontAwesome5 name="sort-alpha-up" size={24} color="#0D6EFD" />
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </View>
            {showSortList ?
                <View style={styles.sortMenuContainer}>
                    <View style={styles.sortMenuWrapper}>
                        <Text style={styles.sortMenuLabel}>MOSTRAR POR</Text>
                        <TouchableOpacity
                            style={sortCriteria === 'discount' ? styles.sortMenuSelected : styles.sortMenuButton}
                            onPress={() => handleSortChange('discount')}
                        >
                            <Text style={sortCriteria === 'discount' ? styles.sortMenuTextSelected : styles.sortMenuText}>Desconto maior</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={sortCriteria === 'distance' ? styles.sortMenuSelected : styles.sortMenuButton}
                            onPress={() => handleSortChange('distance')}
                        >
                            <Text style={sortCriteria === 'distance' ? styles.sortMenuTextSelected : styles.sortMenuText}>Locais mais próximos</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={sortCriteria === 'today' ? styles.sortMenuSelected : styles.sortMenuButton}
                            onPress={() => handleSortChange('today')}
                        >
                            <Text style={sortCriteria === 'today' ? styles.sortMenuTextSelected : styles.sortMenuText}>Acontecendo hoje</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={sortCriteria === 'date' ? styles.sortMenuSelected : styles.sortMenuButton}
                            onPress={() => handleSortChange('date')}
                        >
                            <Text style={sortCriteria === 'date' ? styles.sortMenuTextSelected : styles.sortMenuText}>Por data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                null
            }
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
                    data={filteredData}
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
                                        <Text style={[
                                            styles.eventTag,
                                            item.modal.cashbackType === 'Evento' && styles.eventTagEvento,
                                            item.modal.cashbackType === 'Promoção' && styles.eventTagPromocao,
                                            item.modal.cashbackType === 'Permanente' && styles.eventTagPermanente
                                        ]}

                                        >{item.modal.cashbackType}</Text>
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
                <View style={[styles.mapButtonWrapper, isKeyboardVisible ? null : { paddingBottom: 80 }]}>
                    <TouchableOpacity onPress={handleMapButtonOpen}>
                        <View style={styles.mapButtonContent}>
                            <Text style={styles.mapButtonText}>Comércio</Text>
                            {isMapButtonOpen ?
                                <Entypo name="chevron-down" size={24} color="white" />
                                :
                                <Entypo name="chevron-up" size={24} color="white" />
                            }
                        </View>
                    </TouchableOpacity>


                    {isMapButtonOpen && (
                        isMapSelectedItem && selectedItem ? (
                            <TouchableOpacity style={styles.item} onPress={() => handleItemPress(selectedItem)}>
                                <Image style={styles.image} source={require('../../../assets/images/reidobacalhau.png')} />
                                <View style={styles.textContainer}>
                                    <Text numberOfLines={2} style={styles.title}>{selectedItem.title}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.location}>{selectedItem.location}</Text>
                                        <Text style={styles.location}>{selectedItem.distance}</Text>
                                    </View>
                                    <View style={styles.tagsContainer}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[
                                                styles.eventTag,
                                                selectedItem.modal.cashbackType === 'Evento' && styles.eventTagEvento,
                                                selectedItem.modal.cashbackType === 'Promoção' && styles.eventTagPromocao,
                                                selectedItem.modal.cashbackType === 'Permanente' && styles.eventTagPermanente
                                            ]}>
                                                {selectedItem.modal.cashbackType}
                                            </Text>
                                            <Text style={styles.localTag}>{selectedItem.cashbackLocationType}</Text>
                                        </View>
                                        <View style={[styles.discount]}>
                                            <Text style={styles.discountText}>{selectedItem.discount}</Text>
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={15} color="#D9A100" />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View style={[styles.item, { justifyContent: 'center' }]}>
                                <Text style={styles.title}>
                                    Selecione um comércio no mapa
                                </Text>
                            </View>
                        )
                    )}

                </View>
                : null
            }

            {
                selectedItem && (
                    <ModalCommerce
                        modalVisible={modalVisible}
                        selectedItem={selectedItem}
                        handleCloseModal={handleCloseModal}
                    />
                )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative'
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
    mapButtonWrapper: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#212121',
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
    eventTagEvento: {
        backgroundColor: '#FFF3CD',
        color: '#664D03'
    },
    eventTagPromocao: {
        backgroundColor: '#CFF4FC',
        color: '#055160'
    },
    eventTagPermanente: {
        backgroundColor: '#D1E7DD',
        color: '#0A3622'
    },
    sortMenuContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 10,
        marginTop: 245,
        alignItems: 'flex-end',
    },
    sortMenuWrapper: {
        backgroundColor: 'white',
        width: 200,
        height: 195,
        borderRadius: 15,
        right: 20,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        paddingVertical: 15,
    },
    sortMenuLabel: {
        color: '#ABB5BE',
        fontWeight: '500',
        fontSize: 12,
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    sortMenuButton: {
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    sortMenuSelected: {
        backgroundColor: '#000',
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    sortMenuText: {
        fontSize: 15
    },
    sortMenuTextSelected: {
        fontSize: 15,
        color: '#fff'
    }
});