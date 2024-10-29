import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, StyleSheet, FlatList } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import MoonStarIcon from "@/assets/icons/moonStarIcon";
import Topbar from "@/components/header";
import Sidebar from "@/components/sidebar";
import NotificationSidebar from "@/components/notificationSidebar";
import { useLocale } from "@/contexts/TranslationContext";
import { Link } from "expo-router";
import { fontSize } from "@/constants/fonts";
import ListCommerces from "@/components/commerce/listCommerces";
import EstablishmentSkeleton from "@/components/establishmentSkeleton";

export default function CommerceHome() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useLocale();
    const [commerceDatas, setCommerceDatas] = useState<any>(null);

    useEffect(() => {
        const fetchSelectDatas = async () => {
            try {
                const dataReponse: any = [
                    {
                        id: '1',
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
                    }
                ];

                setTimeout(() => {
                    setCommerceDatas(dataReponse.length > 0 ? dataReponse : null);
                    setLoading(false);
                }, 2000);
            }
            catch (e) {
                console.log(`Error in request data to server: ${e}`)
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
        <View style={styles.container}>
            {showTopbar && <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />}
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
            {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}

            {loading ? (
                <View style={{paddingTop: 80, flex: 1}}>
                    <EstablishmentSkeleton />
                </View>
            ) : (
                commerceDatas === null ? (
                    <View style={styles.emptyStateContainer}>
                        <MoonStarIcon />
                        <Text style={styles.emptyStateText}>
                            {t("commerce.home.label")}
                        </Text>
                    </View>
                ) : (
                    <View style={{ paddingTop: 80, paddingBottom: 80 }}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{t("commerce.home.establishment_label")}</Text>
                        </View>
                        <FlatList
                            data={commerceDatas}
                            renderItem={({ item }) => <ListCommerces data={item} />}
                            contentContainerStyle={{ paddingBottom: 110 }}
                        />
                    </View>
                )
            )}

            <Link href={"/commerce/new"} asChild>
                <TouchableOpacity
                    style={styles.fab}
                    activeOpacity={0.7}
                >
                    <FontAwesome6 name="plus" size={24} color="white" />
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
