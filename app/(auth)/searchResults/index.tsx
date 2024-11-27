import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import MapPinnedIcon from '@/assets/icons/mapPinnedIcon';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import SearchTopbar from '@/components/search/searchTopbar';
import SortMenu from '@/components/search/sortMenu';
import Map from '@/components/search/map';
import CommerceItem from '@/components/search/commerceItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

type DataItem = {
    id: string;
    title: string;
    location: string;
    distance: string;
    discount: string;
    type: string;
    source: string;
    cashbackLocationType: string;
    eventDate: string;
    cashbackType: string;
};

export default function SearchResults() {
    const { searchValue, location, maxDistance, filterType, place } = useLocalSearchParams();

    const [data, setData] = useState<DataItem[]>([]);
    const [showMap, setShowMap] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showSortList, setShowSortList] = useState(false);
    const [activeFilter, setActiveFilter] = useState(filterType || 'Commerces');
    const [sortCriteria, setSortCriteria] = useState('date');
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const { t } = useLocale();

    useEffect(() => {
        setSearchInput(`${searchValue}`);

        //Make the request to the API here, using the useLocalSearchParams as params
        //{...}

        setData([
            {
                id: '1',
                title: 'Fitness Center 1',
                location: 'Beja, Portugal',
                discount: '10%',
                distance: '1km',
                type: 'video',
                source: 'https://i.imgur.com/6Y8qkha.mp4',
                cashbackLocationType: 'locally',
                cashbackType: 'events',
                eventDate: "0 out - 20:00 a 20 out - 21:00",
            },
            {
                id: '2',
                title: 'Fitness Center 1',
                location: 'Beja, Portugal',
                discount: '20%',
                distance: '2km',
                type: 'video',
                source: 'https://i.imgur.com/6Y8qkha.mp4',
                cashbackLocationType: 'locally',
                cashbackType: 'promotions',
                eventDate: "0 out - 20:00 a 20 out - 21:00",
            },
            {
                id: '3',
                title: 'Fitness Center 1',
                location: 'Beja, Portugal',
                discount: '30%',
                distance: '1km',
                type: 'video',
                source: 'https://i.imgur.com/6Y8qkha.mp4',
                cashbackLocationType: 'web',
                cashbackType: 'permanent',
                eventDate: "0 out - 20:00 a 20 out - 21:00",
            },
            {
                id: '4',
                title: 'Cafe Center 1',
                location: 'Beja, Portugal',
                discount: '40%',
                distance: '3km',
                type: 'video',
                source: 'https://i.imgur.com/6Y8qkha.mp4',
                cashbackLocationType: 'web',
                cashbackType: 'permanent',
                eventDate: "0 out - 20:00 a 20 out - 21:00",
            },
            {
                id: '5',
                title: 'Fitness Center 1',
                location: 'Beja, Portugal',
                discount: '40%',
                distance: '3km',
                type: 'video',
                source: 'https://i.imgur.com/6Y8qkha.mp4',
                cashbackLocationType: 'web',
                cashbackType: 'promotions',
                eventDate: "0 out - 20:00 a 20 out - 21:00",
            },
            {
                id: '6',
                title: 'Fitness Center 1',
                location: 'Beja, Portugal',
                discount: '40%',
                distance: '3km',
                type: 'video',
                source: 'https://i.imgur.com/6Y8qkha.mp4',
                cashbackLocationType: 'web',
                cashbackType: 'events',
                eventDate: "0 out - 20:00 a 20 out - 21:00",
            },
        ]);
    }, [searchValue]);

    //UseEffect to handle keyboard visibility
    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardIsVisible(true));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardIsVisible(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    //Sort the data based on the selected criteria
    const handleSortChange = (criteria: string) => {
        setSortCriteria(criteria);
        setShowSortList(false);
    };


    //filter the data based on the active filter
    const filteredData = data.filter(item => {
        const matchesFilter =
            activeFilter === 'Commerces' ? item.cashbackType === 'permanent' :
                activeFilter === 'Events' ? item.cashbackType === 'events' :
                    activeFilter === 'Promotions' ? item.cashbackType === 'promotions' :
                        true;

        const matchesSearchInput = item.title.toLowerCase().includes(searchInput.toLowerCase());
        return matchesFilter && matchesSearchInput;
    });

    //Order the data based on the current criteria
    const sortedAndFilteredData = [...filteredData].sort((a, b) => {
        switch (sortCriteria) {
            case 'discount':
                return parseInt(b.discount) - parseInt(a.discount);
            case 'distance':
                return parseFloat(a.distance) - parseFloat(b.distance);
            case 'today':
                const today = new Date();
                return new Date(a.eventDate) < today ? -1 : 1;
            case 'date':
            default:
                return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
        }
    });

    const handleShowMap = () => {
        if (showSortList) { setShowSortList(!showSortList); }
        setShowMap(!showMap);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#212121', flex: 1 }}>
            <View style={styles.container}>
                <SearchTopbar
                    handleFilterChange={(value: string) => setActiveFilter(value)}
                    handleSearchInputChange={(value: string) => setSearchInput(value)}
                    searchInput={searchInput}
                    activeFilter={activeFilter}
                />

                <View style={styles.searchResultInfos}>
                    <Text style={styles.searchResultInfosText}>{filteredData.length} {t("dashboardSearchResults.content.results")}</Text>
                    <View style={styles.iconsWrapper}>
                        {showMap ?
                            <TouchableOpacity onPress={handleShowMap} activeOpacity={0.7}>
                                <FontAwesome5 name="list-ul" size={24} color="#0D6EFD" />
                            </TouchableOpacity>
                            :
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <TouchableOpacity onPress={handleShowMap} activeOpacity={0.7}>
                                    <MapPinnedIcon />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setShowSortList(!showSortList)} activeOpacity={0.7}>
                                    <FontAwesome5 name="sort-alpha-up" size={24} color="#0D6EFD" />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>

                {showSortList && (
                    <SortMenu
                        sortCriteria={sortCriteria}
                        handleSortChange={(value: string) => handleSortChange(value)}
                    />
                )}

                {showMap ?
                    <Map isKeyboardVisible={keyboardIsVisible} />
                    :
                    <FlatList
                        data={sortedAndFilteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <CommerceItem item={item} />}
                        contentContainerStyle={{ paddingBottom: 110 }}
                    />
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative'
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
        fontSize: fontSize.labels.medium
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        backgroundColor: 'white'
    },
    title: {
        fontSize: fontSize.titles.mini,
        fontWeight: 'bold',
        marginBottom: 8,
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
        fontSize: fontSize.labels.medium
    },
    iconsWrapper: {
        flexDirection: 'row',
        gap: 20
    },
    map: {
        width: '100%',
        height: '100%',
    },
    eventTagEvents: {
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
});