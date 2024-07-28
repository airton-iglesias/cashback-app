import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather, MaterialCommunityIcons, Octicons, AntDesign } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import Topbar from '../components/header';
import InfoCloudIcon from '../assets/icons/infoCloudIcon';
import Sidebar from '@/components/sidebar';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Points() {

    const rootNavigation = useNavigation<RootNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);

    const commerceDatas = [
        {
            name: 'Nome do comercio',
        },
    ];

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

    return (
        <SafeAreaView style={styles.safeArea}>
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
            <Topbar openSidebar={openSidebar} />
            <View style={styles.relative}>
                <View style={styles.infoButtonContainer}>
                    <TouchableOpacity style={styles.infoButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <InfoCloudIcon size={26} color={'#3b82f6'} style={{ marginTop: 3 }} />
                        <Text style={styles.infoButtonText}>Info</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pointsContainer}>
                    <View style={styles.starsContainer}>
                        <Feather name="star" size={13} color="gray" />
                        <Feather name="star" size={13} color="gray" />
                        <Feather name="star" size={13} color="black" />
                        <Feather name="star" size={13} color="gray" />
                        <Feather name="star" size={13} color="gray" />
                    </View>
                    <Text style={styles.pointsText}>2.552</Text>
                </View>

                <ScrollView>
                    {commerceDatas.map((data, index) => (
                        <View key={index} style={[styles.sectionContainer, index % 2 == 0 ? { backgroundColor: '#F8F9FA' } : { backgroundColor: 'white' }]}>
                            <View style={[styles.cardContainer, { gap: 30 }]}>
                                <View>
                                    <View style={{ gap: 30 }}>
                                        <TouchableOpacity key={index} >
                                            <View style={styles.card}>
                                                <Image source={require('../assets/images/sorveteria.png')} style={styles.image} />


                                                <View style={styles.cardContent}>
                                                    <Text style={styles.cardTitle}>{data.name}</Text>

                                                    <View style={styles.cardDetails}>
                                                        <Feather name="user" size={16} color="#635C5C" />
                                                        <Text style={styles.cardDetailText}>Administrador</Text>
                                                        <View style={styles.cardDetailItem}>
                                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                            <Text style={styles.cardDetailText}>ID</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.cardStatus}>
                                                        <Text style={styles.cardStatusText}>Permanente</Text>
                                                    </View>

                                                </View>


                                                <View style={styles.separator}></View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={styles.card}>
                                                <Image source={require('../assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.cardTitle}>Nome da promoção</Text>
                                                    <View style={styles.cardDetails}>
                                                        <Feather name="user" size={16} color="#635C5C" />
                                                        <Text style={styles.cardDetailText}>Administrador</Text>
                                                        <View style={styles.cardDetailItem}>
                                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                            <Text style={styles.cardDetailText}>ID</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.cardStatus}>
                                                        <Text style={styles.cardStatusText}>Promoção</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.separator}></View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={styles.card}>
                                                <Image source={require('../assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.cardTitle}>Nome do evento</Text>
                                                    <View style={styles.cardDetails}>
                                                        <Feather name="user" size={16} color="#635C5C" />
                                                        <Text style={styles.cardDetailText}>Administrador</Text>
                                                        <View style={styles.cardDetailItem}>
                                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                            <Text style={styles.cardDetailText}>ID</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.cardStatus}>
                                                        <Text style={styles.cardStatusText}>evento</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </View>


            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalHeaderContainer}>
                    <TouchableOpacity
                        style={styles.modalBackButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Octicons name="chevron-left" size={32} color="black" />

                    </TouchableOpacity>
                    <Text style={styles.modalHeaderText}>Voltar</Text>
                </View>

                <View style={styles.modalContainer}>
                    <View style={styles.modalIconContainer}>
                        <View style={styles.modalIconBackground}>
                            <InfoCloudIcon width={36} height={36} color={'#3b82f6'} />
                        </View>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>Vantagens dos</Text>
                            <Text style={styles.modalTitle}>Pontos na Promoção</Text>
                        </View>
                    </View>
                    <View style={styles.modalContent}>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalSectionTitle}>Dedução de Pontos</Text>
                            <Text style={styles.modalSectionText}>1 ponto é retirado a cada apresentação.</Text>
                        </View>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalSectionTitleAdd}>Adição de Pontos</Text>
                            <Text style={styles.modalSectionText}>1 ponto é adicionado a cada $0.01 em créditos movimentados.</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    modalBackButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalHeaderContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    modalHeaderText: {
        fontSize: 24,
        fontWeight: '700',
        left: 40
    },
    relative: {
        position: 'relative',
        paddingTop: 110
    },
    infoButtonContainer: {
        position: 'absolute',
        right: 24,
        top: 135,
        alignItems: 'center',
        zIndex: 10,
    },
    infoButton: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoButtonText: {
        color: '#3b82f6',
        fontSize: 24,
    },
    pointsContainer: {
        width: '100%',
        paddingVertical: 32,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 2,
    },
    pointsText: {
        fontSize: 64,
        fontWeight: 'bold',
        marginTop: 24,
    },
    sectionRow: {
        flexDirection: 'row',
        position: 'relative',
        marginTop: 40,
    },
    sectionContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#D8D8D8',
        paddingTop: 20,
    },
    headerContainer: {
        paddingVertical: 15,
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '500',
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    card: {
        flexDirection: 'row',
        position: 'relative',
    },
    image: {
        width: 96,
        height: 96,
    },
    roundedImage: {
        borderRadius: 48,
    },
    cardContent: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        flex: 1,
        gap: 8
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '400'
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetailText: {
        fontSize: 18,
        color: '#635C5C',
    },
    cardDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    cardStatus: {
        backgroundColor: '#E0F7FA',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardStatusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00ACC1',
    },
    separator: {
        position: 'absolute',
        width: 4,
        height: 30,
        backgroundColor: '#B2B2B2',
        left: 46,
        bottom: -30,
    },
    modalContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    modalIconContainer: {
        alignItems: 'center',
    },
    modalIconBackground: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5EFFF',
        borderRadius: 16,
    },
    modalTitleContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    modalTitle: {
        fontSize: 32,
        color: '#3b82f6',
    },
    modalContent: {
        gap: 24,
        marginTop: 24,
    },
    modalSection: {
        alignItems: 'center',
    },
    modalSectionTitle: {
        color: '#4b5563',
        fontWeight: 'bold',
        fontSize: 20,
    },
    modalSectionTitleAdd: {
        color: '#14b8a6',
        fontWeight: 'bold',
        fontSize: 20,
    },
    modalSectionText: {
        color: '#4b5563',
        fontSize: 20,
        textAlign: 'center',
    },
});
