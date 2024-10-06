import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Feather, EvilIcons } from '@expo/vector-icons';
import Topbar from '@/components/header';
import Input from '@/components/input';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';

export default function Home({
    filterType, place, maxDistance, handleMaxDistance, handleSearchValue, handleLocation, handlePlace,
    handleFilterType, showResults, openSidebar, openNotifications }: any) {

    const { t } = useLocale();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Topbar openSidebar={openSidebar} openNotifications={openNotifications}/>
            <View style={styles.container}>

                <View style={styles.inputWrapper}>
                    <Input
                        placeholder={t("dashboardSearch.home.search")}
                        onChange={(text: string) => handleSearchValue(text)}
                    />
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={28} color="#828282" />
                    </View>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={filterType === "Comercio" ? [styles.button, styles.activeButton] : styles.button}
                        onPress={() => handleFilterType("Comercio")}
                    >
                        {filterType === "Comercio" ? <View style={styles.statusIndicator}></View> : null}
                        <Text style={filterType === "Comercio" ? styles.activeButtonText : styles.buttonText}>{t("dashboardSearch.home.commerce")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={filterType === "Eventos" ? [styles.button, styles.activeButton] : styles.button}
                        onPress={() => handleFilterType("Eventos")}
                    >
                        {filterType === "Eventos" ? <View style={styles.statusIndicator}></View> : null}
                        <Text style={filterType === "Eventos" ? styles.activeButtonText : styles.buttonText}>{t("dashboardSearch.home.events")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={filterType === "Promoções" ? [styles.button, styles.activeButton] : styles.button}
                        onPress={() => handleFilterType("Promoções")}
                    >
                        {filterType === "Promoções" ? <View style={styles.statusIndicator}></View> : null}
                        <Text style={
                            filterType === "Promoções" ? styles.activeButtonText : styles.buttonText}>{t("dashboardSearch.home.promotions")}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.sectionLabel}>{t("dashboardSearch.home.whereLabel")}</Text>
                    <View style={styles.buttonRowPlace}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={place === "Local" ? [styles.button, styles.activeButton] : styles.button}
                            onPress={() => handlePlace("Local")}
                        >
                            {place === "Local" ? <View style={styles.statusIndicator}></View> : null}
                            <Text style={place === "Local" ? styles.activeButtonText : styles.buttonText}>{t("dashboardSearch.home.locally")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={place === "Online" ? [styles.button, styles.activeButton] : styles.button}
                            onPress={() => handlePlace("Online")}
                        >
                            {place === "Online" ? <View style={styles.statusIndicator}></View> : null}
                            <Text style={place === "Online" ? styles.activeButtonText : styles.buttonText}>{t("dashboardSearch.home.online")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={place === "closeToMe" ? [styles.buttonLocation, styles.activeButton] : styles.buttonLocation}
                        onPress={() => handlePlace("closeToMe")}
                    >
                        {place === "closeToMe" ? <View style={styles.statusIndicator}></View> : null}
                        <EvilIcons name="location" size={24} color={place === "closeToMe" ? "white" : "black"} />
                        <Text style={place === "closeToMe" ? [styles.buttonLocationText, styles.activeButtonText] : styles.buttonLocationText}>{t("dashboardSearch.home.closeToMe")}</Text>
                    </TouchableOpacity>
                    <View style={styles.inputLocationWrapper}>
                        <Input
                            placeholder={t("dashboardSearch.home.choosePlace")}
                            onChange={(text: string) => handleLocation(text)}
                        />
                    </View>
                </View>
                <View style={styles.sliderSection}>
                    <View style={styles.distanceTextWrapper}>
                        <Text style={styles.sectionLabel}>{t("dashboardSearch.home.maxDistance")}</Text>
                        <Text style={styles.sectionLabel}>{maxDistance} km</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={100}
                        step={10}
                        value={maxDistance}
                        onValueChange={(value: any) => handleMaxDistance(value)}
                        minimumTrackTintColor="gray"
                        maximumTrackTintColor="#CCCCCC"
                        thumbTintColor={'#000000'}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.nextButton}
                    onPress={() => showResults(true)}
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
