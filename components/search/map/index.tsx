import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import CommerceItem from "../commerceItem";
import { useState } from "react";
import { fontSize } from "@/constants/fonts";
import { Entypo } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

export default function Map({ items, isKeyboardVisible }: any) {
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
    const [isMapSelectedItem, setIsMapSelectedItem] = useState(false);
    const [isMapButtonOpen, setIsMapButtonOpen] = useState(false);
    const INITIAL_REGION = {
        latitude: 38.7266085,
        longitude: -9.1503216,
        latitudeDelta: 2,
        longitudeDelta: 2,
    };

    const { t } = useLocale();
    return (
        <View style={{ flex: 1 }}>

            {/* 
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    showsUserLocation={true}
                    initialRegion={INITIAL_REGION}
                />
            */}

            <View style={styles.map}></View>

            <View style={[styles.mapButtonWrapper, isKeyboardVisible ? null : { paddingBottom: 80 }]}>
                <TouchableOpacity onPress={() => setIsMapButtonOpen(!isMapButtonOpen)} activeOpacity={0.7}>
                    <View style={styles.mapButtonContent}>
                        <Text style={styles.mapButtonText}>{t("dashboardSearchResults.filter.map.commerce")}</Text>
                        {isMapButtonOpen ?
                            <Entypo name="chevron-down" size={24} color="white" />
                            :
                            <Entypo name="chevron-up" size={24} color="white" />
                        }
                    </View>
                </TouchableOpacity>

                {isMapButtonOpen && (isMapSelectedItem && selectedItem ?
                    <CommerceItem
                        item={selectedItem}
                    />
                    :
                    <View style={[styles.item, { justifyContent: 'center' }]}>
                        <Text style={styles.title}>
                            {t("dashboardSearchResults.filter.map.selectCommerce")}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
});