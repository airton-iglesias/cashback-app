import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import MapPinnedIcon from '@/assets/icons/mapPinnedIcon';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import SearchTopbar from '../searchTopbar';
import CommerceItem from '../commerceItem';
import SortMenu from '../sortMenu';
import { useSidebar } from '@/contexts/sidebarsContext';
import { useFocusEffect, usePathname } from 'expo-router';
import Map from '../map';


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


const data = [
    {
        id: '1',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        discount: '20%',
        distance: '2km',
        type: 'video',
        source: 'https://i.imgur.com/6Y8qkha.mp4',
        cashbackLocationType: 'web',
        cashbackType: "Evento",
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
        cashbackLocationType: 'web',
        cashbackType: "Evento",
        eventDate: "0 out - 20:00 a 20 out - 21:00",

    },
    {
        id: '3',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        discount: '20%',
        distance: '2km',
        type: 'video',
        source: 'https://i.imgur.com/6Y8qkha.mp4',
        cashbackLocationType: 'web',
        cashbackType: "Evento",
        eventDate: "0 out - 20:00 a 20 out - 21:00",
    },
];

export default function Results({ showResults, showResultsValue, datas }: any) {
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

    const [showMap, setShowMap] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showSortList, setShowSortList] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Comercios');
    const [sortCriteria, setSortCriteria] = useState('date');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { t } = useLocale();

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

    const handleSortChange = (criteria: any) => {
        setSortCriteria(criteria);
        setShowSortList(!showSortList);
    };

    const filteredData = data.filter(item => {
        const matchesFilter =
            activeFilter === 'Comercios' ? true :
                activeFilter === 'Eventos' ? item.cashbackType === 'Evento' :
                    activeFilter === 'Promoções' ? item.cashbackType === 'Promoção' :
                        true;

        const matchesSearchInput = item.title.toLowerCase().includes(searchInput.toLowerCase());

        return matchesFilter && matchesSearchInput;
    });

    const handleShowMap = () => {
        if (showSortList) { setShowSortList(!showSortList) }
        setShowMap(!showMap);
    };

    return (
        <View style={styles.container}>
            <SearchTopbar
                handleFilterChange={(value: string) => setActiveFilter(value)}
                activeFilter={activeFilter}
                searchInput={searchInput}
                setSearchInput={(Text: string) => setSearchInput(Text)}
                showResults={() => showResults()}
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
                <Map
                    isKeyboardVisible={isKeyboardVisible}
                />
                :
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CommerceItem item={item} />}
                    contentContainerStyle={{ paddingBottom: 110 }}
                />
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
});