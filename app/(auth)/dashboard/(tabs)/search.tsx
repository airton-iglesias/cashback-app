import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Feather, EvilIcons } from '@expo/vector-icons';
import Input from '@/components/input';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import { router } from 'expo-router';

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [filterType, setFilterType] = useState('Commerces');
    const [place, setPlace] = useState('locally');
    const [location, setLocation] = useState('');
    const [maxDistance, setMaxDistance] = useState(10);

    const { t } = useLocale();

    const onSubmit = () => {

        //console.log(searchValue, location, maxDistance, filterType, place);

        router.push({
            pathname: '/searchResults', params: {
                searchValue: searchValue,
                location: location,
                maxDistance: maxDistance,
                filterType: filterType,
                place: place,
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                {/* Search input field */}
                <View style={styles.inputWrapper}>
                    <Input
                        placeholder={t('dashboardSearch.home.search')}
                        onChange={(text) => setSearchValue(text)}
                    />
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={28} color="#828282" />
                    </View>
                </View>
                {/* End of search input field */}

                {/* Filter buttons */}
                <View style={styles.buttonRow}>
                    {['Commerces', 'Events', 'Promotions'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            activeOpacity={0.7}
                            style={filterType === type ? [styles.button, styles.activeButton] : styles.button}
                            onPress={() => setFilterType(type)}
                        >
                            {filterType === type && <View style={styles.statusIndicator}></View>}
                            <Text style={filterType === type ? styles.activeButtonText : styles.buttonText}>
                                {t(`dashboardSearch.home.${type.toLowerCase()}`)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* End of filter buttons */}

                {/* Locally or online buttons */}
                <View>
                    <Text style={styles.sectionLabel}>{t('dashboardSearch.home.whereLabel')}</Text>
                    <View style={styles.buttonRowPlace}>
                        {['locally', 'Online'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                activeOpacity={0.7}
                                style={place === option ? [styles.button, styles.activeButton] : styles.button}
                                onPress={() => setPlace(option)}
                            >
                                {place === option && <View style={styles.statusIndicator}></View>}
                                <Text style={place === option ? styles.activeButtonText : styles.buttonText}>
                                    {t(`dashboardSearch.home.${option.toLowerCase()}`)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Choose the location input field with close to me button */}
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={place === 'closeToMe' ? [styles.buttonLocation, styles.activeButton] : styles.buttonLocation}
                        onPress={() => setPlace('closeToMe')}
                    >
                        {place === 'closeToMe' && <View style={styles.statusIndicator}></View>}
                        <EvilIcons name="location" size={24} color={place === 'closeToMe' ? 'white' : 'black'} />
                        <Text
                            style={
                                place === 'closeToMe'
                                    ? [styles.buttonLocationText, styles.activeButtonText]
                                    : styles.buttonLocationText
                            }
                        >
                            {t('dashboardSearch.home.closeToMe')}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.inputLocationWrapper}>

                        <Input
                            placeholder={t('dashboardSearch.home.choosePlace')}
                            onChange={(text) => setLocation(text)}
                        />
                        <View style={styles.searchIcon}>
                            <Feather name="search" size={28} color="#828282" />
                        </View>

                    </View>
                </View>
                {/* End of Choose the location input field with close to me button */}

                {/* Slider of distance */}
                <View style={styles.sliderSection}>
                    <View style={styles.distanceTextWrapper}>
                        <Text style={styles.sectionLabel}>{t('dashboardSearch.home.maxDistance')}</Text>
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
                        thumbTintColor="#000000"
                    />
                </View>
                {/* End of Slider of distance */}

                {/* Submit  button */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.nextButton}
                    onPress={onSubmit}
                >
                    <View style={styles.nextButtonContent}>
                        <Feather name="check" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                {/* End of Submit  button */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 105,
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
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.labels.medium
    },
    activeButtonText: {
        color: '#fff',
        fontSize: fontSize.labels.medium
    },
    buttonText: {
        color: '#000',
        fontSize: fontSize.labels.medium
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
        fontSize: fontSize.labels.medium
    },
    sectionLabel: {
        fontSize: fontSize.labels.large
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
    statusIndicator: {
        position: 'absolute',
        top: -3,
        right: -4,
        height: 12,
        width: 12,
        backgroundColor: '#3F31E1',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'white',
    },
});
