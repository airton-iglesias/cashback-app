import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, BackHandler, Image, ScrollView, StyleSheet } from "react-native";
import { FontAwesome6, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import MoonStarIcon from "@/assets/icons/moonStarIcon";
import Topbar from "@/components/header";
import Sidebar from "@/components/sidebar";
import NotificationSidebar from "@/components/notificationSidebar";
import { useLocale } from "@/contexts/TranslationContext";
import { Link } from "expo-router";

type CommerceData = {
    name: string;
    promotion?: {
        name: string;
        id: string;
        role: string;
    };
    event?: {
        name: string;
        id: string;
        role: string;
    };
};

export default function CommerceHome() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const { t } = useLocale();
    const commerceDatas: CommerceData[] = [
        {
            name: 'Nome do comercio',
            promotion: {
                name: 'Nome da promoção',
                id: '#99999',
                role: t("commerce.home.admin")
            },
            event: {
                name: 'Nome do evento',
                id: '#99999',
                role: t("commerce.home.admin")
            },
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
            closeNotifications();
            return true;
          }
          return false;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, [isNotificationsOpen]);
    

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
                            {t("commerce.home.label")}
                        </Text>
                    </View>
                )
                :
                (
                    <View style={{ paddingTop: 110, paddingBottom: 80 }}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{t("commerce.home.establishment_label")}</Text>
                        </View>
                        <ScrollView>
                            {commerceDatas.map((data, index) => (
                                <View key={index} style={[styles.sectionContainer, index % 2 == 0 ? { backgroundColor: '#F8F9FA' } : { backgroundColor: 'white' }]}>
                                    <View style={[styles.cardContainer, { gap: 30 }]}>
                                        <Link href={"/commerce/menu"} asChild>
                                            <TouchableOpacity key={index} style={{ gap: 30 }} activeOpacity={0.7}>
                                                <View>
                                                    <View style={styles.card}>
                                                        <Image source={require('@/assets/images/sorveteria.png')} style={styles.image} />
                                                        <View style={styles.cardContent}>
                                                            <Text style={styles.cardTitle}>{data.name}</Text>
                                                            <View style={styles.cardDetails}>
                                                                <Feather name="user" size={16} color="#635C5C" />
                                                                <Text style={styles.cardDetailText}>{t("commerce.home.admin")}</Text>
                                                                <View style={styles.cardDetailItem}>
                                                                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                                    <Text style={styles.cardDetailText}>#99999</Text>
                                                                </View>
                                                            </View>
                                                            <View style={[styles.cardStatus, { backgroundColor: '#D1E7DD', }]}>
                                                                <Text style={[styles.cardStatusText, { color: '#0A3622' }]}>{t("commerce.home.permanent")}</Text>
                                                            </View>
                                                        </View>
                                                        {data.promotion || data.event ? (<View style={styles.separator}></View>) : null}
                                                    </View>
                                                </View>

                                                {data.promotion && (
                                                    <View>
                                                        <View style={styles.card}>
                                                            <Image source={require('@/assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
                                                            <View style={styles.cardContent}>
                                                                <Text style={styles.cardTitle}>{data.promotion?.name || t("commerce.home.withoutInfos")}</Text>
                                                                <View style={styles.cardDetails}>
                                                                    <Feather name="user" size={16} color="#635C5C" />
                                                                    <Text style={styles.cardDetailText}>{data.promotion?.role || t("commerce.home.withoutInfos")}</Text>
                                                                    <View style={styles.cardDetailItem}>
                                                                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                                        <Text style={styles.cardDetailText}>{data.promotion?.id || t("commerce.home.withoutInfos")}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={[styles.cardStatus, { backgroundColor: '#CFF4FC', }]}>
                                                                    <Text style={[styles.cardStatusText, { color: '#055160' }]}>{t("commerce.home.promotion")}</Text>
                                                                </View>
                                                            </View>
                                                            {data.event && (<View style={styles.separator}></View>)}
                                                        </View>
                                                    </View>
                                                )}

                                                {data.event && (
                                                    <View>
                                                        <View style={styles.card}>
                                                            <Image source={require('@/assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
                                                            <View style={styles.cardContent}>
                                                                <Text style={styles.cardTitle}>{data.event?.name || t("commerce.home.withoutInfos")}</Text>
                                                                <View style={styles.cardDetails}>
                                                                    <Feather name="user" size={16} color="#635C5C" />
                                                                    <Text style={styles.cardDetailText}>{data.event?.role || t("commerce.home.withoutInfos")}</Text>
                                                                    <View style={styles.cardDetailItem}>
                                                                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                                        <Text style={styles.cardDetailText}>{data.event?.id || t("commerce.home.withoutInfos")}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={[styles.cardStatus, { backgroundColor: '#FFF3CD', }]}>
                                                                    <Text style={[styles.cardStatusText, { color: '#664D03' }]}>{t("commerce.home.event")}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        </Link>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )
            }
            <Link href={"/commerce/new"} asChild>
                <TouchableOpacity
                    style={styles.fab}
                    activeOpacity={0.7}
                >
                    <FontAwesome6 name="plus" size={24} color="white" />
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',
        paddingTop: 30,
    },
    headerContainer: {
        paddingVertical: 15,
        height: 70,
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
