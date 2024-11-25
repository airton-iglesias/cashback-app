import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import CommerceHeader from "@/components/commerce/commerceHeader";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocale } from "@/contexts/TranslationContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import MapMark from "@/assets/icons/mapMark";
import StoreIcon from "@/assets/icons/storeIcon";

export default function MapLocation() {
    const { t } = useLocale();
    const mapRef = useRef<MapView | null>(null);

    const INITIAL_REGION = {
        latitude: -23.55,
        longitude: -46.62,
        latitudeDelta: 0.018,
        longitudeDelta: 0.030,
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({ latitude: 0, longitude: 0, address: "" });

    // Função para redefinir o mapa
    const resetMap = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(INITIAL_REGION, 1000);
        }
    };

    // Função para buscar endereço (usando API de geocodificação)
    const fetchAddress = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_API_KEY`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return data.results[0].formatted_address;
            }
            return "Endereço não encontrado";
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
            return "Erro ao buscar endereço";
        }
    };

    // Função chamada ao clicar no marcador
    const onMarkerPress = async (latitude: number, longitude: number) => {
        const address = await fetchAddress(latitude, longitude);
        setSelectedLocation({ latitude, longitude, address });
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <CommerceHeader
                Title={t("mapLocation.headerLabel")}
                ScreenGoback={() => router.back()}
            />
            {/* <View style={styles.container}>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={INITIAL_REGION}
                >
                    <Marker
                        coordinate={{
                            latitude: -23.55,
                            longitude: -46.62,
                        }}
                        onPress={() => onMarkerPress(-23.55, -46.62)}
                    >
                        <MapMark />
                    </Marker>
                </MapView>

                <TouchableOpacity style={styles.resetButton} onPress={resetMap}>
                    <Text style={styles.resetButtonText}>Redefinir Mapa</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <View style={styles.iconContainer}>
                                    <StoreIcon height={26} width={26} color={"white"} />
                                </View>
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <Text style={styles.modalText}>{selectedLocation.address}</Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setModalVisible(false)}
                                style={styles.modalSaveButton}
                            >
                                <View style={styles.modalButtonSaveContent}>
                                    <Feather name="check" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    resetButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    resetButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        zIndex: 10
    },
    modalText: {
        fontSize: 16,
        marginVertical: 20,
        color: '#fff',
        textAlign: 'center'
    },
    iconContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#FFF3CD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        shadowRadius: 4,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        gap: 20,
        width: '100%'
    },
    modalSaveButton: {
        width: '100%',
        borderRadius: 8,
    },
    modalButtonSaveContent: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    }
});
