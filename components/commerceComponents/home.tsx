import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, BackHandler, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../types/navigationTypes";
import { FontAwesome6, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import MoonStarIcon from "../../assets/icons/moonStarIcon";
import Topbar from "../header";
import Sidebar from "../sidebar";
import NotificationSidebar from "../notificationSidebar";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function CommerceHome() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

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


    useEffect(() => {
        const backAction = () => {
            if (isSidebarOpen) {
                closeSidebar();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isSidebarOpen]);

    useEffect(() => {
        const backAction = () => {
            if (isNotificationsOpen) {
                closeSidebar();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isNotificationsOpen, closeNotifications]);

    return (
        <SafeAreaView style={styles.container}>
            {showTopbar && <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />}
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
            {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}

            {commerceDatas.length === 0 ?
                (
                    <View style={styles.emptyStateContainer}>
                        <MoonStarIcon />
                        <Text style={styles.emptyStateText}>
                            Crie um novo estabelecimento, evento ou promoção
                        </Text>
                    </View>
                )
                :
                (
                    <View style={{ paddingTop: 110, paddingBottom: 80 }}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Estabelecimentos</Text>
                        </View>
                        <ScrollView>
                            {commerceDatas.map((data, index) => (
                                <View key={index} style={[styles.sectionContainer, index % 2 == 0 ? { backgroundColor: '#F8F9FA' } : { backgroundColor: 'white' }]}>
                                    <View style={[styles.cardContainer, { gap: 30 }]}>
                                        <View>
                                            <View style={{ gap: 30 }}>
                                                <TouchableOpacity key={index} onPress={() => commerceNavigation.navigate('commerce_menu')}>
                                                    <View style={styles.card}>
                                                        <Image source={require('../../assets/images/sorveteria.png')} style={styles.image} />
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
                                                        <Image source={require('../../assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
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
                                                        <Image source={require('../../assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
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
                )
            }
            <TouchableOpacity
                onPress={() => commerceNavigation.navigate("new_commerce_step_0")}
                style={styles.fab}
            >
                <FontAwesome6 name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionContainer: {
        borderBottomWidth: 1,
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
        marginLeft: 4
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
    emptyStateContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 200,
    },
    emptyStateText: {
        width: 210,
        fontSize: 20,
        fontWeight: '700',
        color: '#636363',
        marginTop: 24,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    fab: {
        position: 'absolute',
        bottom: 18,
        right: 18,
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});
