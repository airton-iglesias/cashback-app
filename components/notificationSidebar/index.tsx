import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import NotificationItem from "./notificationItem";
import { useLocale } from "@/contexts/TranslationContext";
import { fontSize } from "@/constants/fonts";
import { Skeleton } from "moti/skeleton";
import SkeletonNotification from "./skeletonNotification";

export default function NotificationSidebar({ closeSidebar, isSidebarOpen }: any) {
    const sidebarOffset = useSharedValue(400);
    const { t } = useLocale();

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchSelectDatas = async () => {
            /* make the request to the API here
            //Example: 
            const selectDataReponse = await
                fetch('domain of application here', {
                    method: 'GET',
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .catch((error) => {
                    console.log(error)
                });
            */

            //temporary variable
            const DataReponse: any = [
                {
                    id: "1",
                    notificationType: "new_admin",
                    title: "Casa do Bacalhau",
                    description: "Maria",
                    image: "url",
                },
                {
                    id: "2",
                    notificationType: "cashback_canceled",
                    title: "Casa do Bacalhau",
                    description: "Maria",
                    image: "url",
                },
                {
                    id: "3",
                    notificationType: "deposit_successful",
                    title: "Casa do Bacalhau",
                    description: "1000",
                    image: null,
                }
            ];

            setTimeout(() => {
                setData(DataReponse);
                setLoading(false);
            }, 2000);
        }

        fetchSelectDatas();
    }, []);


    const handleRemoveNotification = (index: number) => {
        setData((prevData) => prevData.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (isSidebarOpen) {
            sidebarOffset.value = withTiming(0, { duration: 300 });
        } else {
            sidebarOffset.value = withTiming(400, { duration: 300 });
        }
    }, [isSidebarOpen]);

    const animatedSidebarStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: sidebarOffset.value }]
        };
    });

    const handleCloseSidebar = () => {
        sidebarOffset.value = withTiming(400, { duration: 300 });
        closeSidebar();
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.backgroundOverlay}></View>
            <Animated.View style={[animatedSidebarStyle, styles.sidebar]}>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Skeleton
                            show={loading}
                            height={40}
                            width={150}
                            colorMode="dark"
                        >
                            {loading ? null : <Text style={styles.headerText}>{t("sidebarNotification.allNotifications")} ({data.length || 0})</Text>}
                        </Skeleton>
                        <TouchableOpacity onPress={handleCloseSidebar} style={styles.closeButton} activeOpacity={0.7}>
                            <MaterialCommunityIcons name="close-circle-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {
                            loading ?
                                <SkeletonNotification />
                                :
                                data.length === 0 ?
                                    null
                                    :
                                    <FlatList
                                        data={data}
                                        renderItem={({ item, index }) => (
                                            <NotificationItem
                                                index={index}
                                                item={item}
                                                handleRemoveNotification={handleRemoveNotification}
                                            />
                                        )}
                                        showsVerticalScrollIndicator={false}
                                    />
                        }
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 50,
        right: 0,
    },
    backgroundOverlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.6,
    },
    sidebar: {
        backgroundColor: '#212121',
        height: '100%',
        width: '90%',
        position: 'absolute',
        right: 0,
        zIndex: 20,
        paddingTop: 10
    },
    container: {
        flex: 1,
        paddingTop: 12,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: fontSize.titles.medium,
        fontWeight: 'bold',
        color: 'white'
    },
    closeButton: {
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        height: '100%',
    },
});
