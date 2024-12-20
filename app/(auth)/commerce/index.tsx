import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, StyleSheet, FlatList } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import MoonStarIcon from "@/assets/icons/moonStarIcon";
import Topbar from "@/components/header";
import Sidebar from "@/components/sidebar";
import NotificationSidebar from "@/components/notificationSidebar";
import { useLocale } from "@/contexts/TranslationContext";
import { fontSize } from "@/constants/fonts";
import ListCommerces from "@/components/commerce/listCommerces";
import EstablishmentSkeleton from "@/components/establishmentSkeleton";
import { router } from "expo-router";

export default function CommerceHome() {
    //fetch data variable
    const [commerceDatas, setCommerceDatas] = useState<any>(null);

    // State variables for UI
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useLocale();


    // Simulates fetching data
    useEffect(() => {
        const fetchSelectDatas = async () => {
            try {
                const dataResponse: any[] = [
                    {
                        id: '#151',
                        type: 0,
                        name: 'Commerce Name',
                        image: 'https://neufert-cdn.archdaily.net/uploads/photo/image/71324/cropped_large_Danpal_Facade_System_8.jpg?v=1533219819',
                        promotions: [
                            {
                                id: '#350',
                                name: 'Promotion Name',
                                role: t("commerce.home.admin"),
                                image: 'https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?rs=1&pid=ImgDetMain',
                            }
                        ],
                        events: [
                            {
                                id: '#989',
                                name: 'Event Name',
                                role: t("commerce.home.admin"),
                                image: 'https://img.freepik.com/premium-photo/table-bar-with-bar-background_895403-7.jpg?w=2000'
                            },
                            {
                                id: '#99',
                                name: 'Event Name',
                                role: t("commerce.home.admin"),
                                image: 'https://img.freepik.com/premium-photo/table-bar-with-bar-background_895403-7.jpg?w=2000'
                            },
                        ]
                    },
                    {
                        id: '#1521',
                        type: 0,
                        name: 'Commerce Name',
                        image: 'https://neufert-cdn.archdaily.net/uploads/photo/image/71324/cropped_large_Danpal_Facade_System_8.jpg?v=1533219819',
                        promotions: [
                            {
                                id: '#350',
                                name: 'Promotion Name',
                                role: t("commerce.home.admin"),
                                image: 'https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?rs=1&pid=ImgDetMain',
                            },
                            {
                                id: '#33530',
                                name: 'Promotion Name',
                                role: t("commerce.home.admin"),
                                image: 'https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?rs=1&pid=ImgDetMain',
                            },
                        ],
                        events: [
                            {
                                id: '#989',
                                name: 'Event Name',
                                role: t("commerce.home.admin"),
                                image: 'https://img.freepik.com/premium-photo/table-bar-with-bar-background_895403-7.jpg?w=2000'
                            },
                        ]
                    },
                    {
                        id: '#15821',
                        type: 2,
                        name: 'Commerce Name',
                        image: 'https://neufert-cdn.archdaily.net/uploads/photo/image/71324/cropped_large_Danpal_Facade_System_8.jpg?v=1533219819',
                    },
                    {
                        id: '#1582541',
                        type: 1,
                        name: 'Commerce Name',
                        image: 'https://neufert-cdn.archdaily.net/uploads/photo/image/71324/cropped_large_Danpal_Facade_System_8.jpg?v=1533219819',
                    },
                ];

                // Simulates a delay for fetching data
                setTimeout(() => {
                    setCommerceDatas(dataResponse.length > 0 ? dataResponse : null);
                    setLoading(false);
                }, 2000);
            } catch (e) {
                console.error(`Error fetching data: ${e}`);
            }
        };

        fetchSelectDatas();
    }, []);

    const openSidebar = () => {
        setShowSidebar(true);
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setTimeout(() => setShowSidebar(false), 300);
    };

    const openNotifications = () => {
        setIsNotificationsOpen(true);
        setShowNotifications(true);
    };

    const closeNotifications = () => {
        setIsNotificationsOpen(false);
        setTimeout(() => setShowNotifications(false), 300);
    };

    // Handles the hardware back button to close the Sidebar
    useEffect(() => {
        const backAction = () => {
            if (isSidebarOpen) { closeSidebar(); return true; }
            if (isNotificationsOpen) { closeNotifications(); return true; }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [isSidebarOpen, isNotificationsOpen]);

    return (
        <View style={styles.container}>

            <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
            {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}

            {/* Displays loading state or commerce data */}
            {loading ? (
                <View style={styles.skeletonContainer}>
                    <EstablishmentSkeleton />
                </View>
            ) :

                commerceDatas === null ? (
                    /* Displays empty state if no data is available */
                    <View style={styles.emptyStateContainer}>
                        <MoonStarIcon />
                        <Text style={styles.emptyStateText}>{t("commerce.home.label")}</Text>
                    </View>
                ) : (
                    /* Displays commerce data */
                    <View style={styles.listContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{t("commerce.home.establishment_label")}</Text>
                        </View>
                        <FlatList
                            data={commerceDatas}
                            renderItem={({ item }) => <ListCommerces data={item} />}
                            contentContainerStyle={styles.flatListContent}
                        />
                    </View>
                )}

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.7}
                onPress={() => router.navigate("/commerce/new")}
            >
                <FontAwesome6 name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    skeletonContainer: {
        paddingTop: 80,
        flex: 1,
    },
    headerContainer: {
        paddingVertical: 15,
        height: 70,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: fontSize.labels.extralarge,
        fontWeight: '500',
    },
    emptyStateContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 170,
    },
    emptyStateText: {
        width: 210,
        fontSize: fontSize.labels.extralarge,
        fontWeight: '700',
        color: '#636363',
        marginTop: 24,
        textAlign: 'center',
    },
    listContainer: {
        paddingTop: 80,
        paddingBottom: 80,
    },
    flatListContent: {
        paddingBottom: 110,
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
