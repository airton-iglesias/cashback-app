import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootStackParamList } from "../../types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NotificationSidebar({ closeSidebar, isSidebarOpen }: any) {
    const initialData = [
        {
            title: "Casa do Bacalhau",
            description: "Maria",
            image: "url",
            isAdminAddNotification: true,
            isDeposit: false,
            depositFailed: null
        },
        {
            title: "Casa do Bacalhau",
            description: "Maria",
            image: "url",
            isAdminAddNotification: false,
            isDeposit: false,
            depositFailed: null
        },
        {
            title: "Casa do Bacalhau",
            description: "1000",
            image: null,
            isAdminAddNotification: false,
            isDeposit: true,
            depositFailed: false
        },
    ];

    const [data, setData] = useState(initialData);
    const rootNavigation = useNavigation<RootNavigationProp>();
    const sidebarOffset = useSharedValue(400);

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

    const handleRemoveNotification = (index: number) => {
        setData(prevData => prevData.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.backgroundOverlay}></View>
            <Animated.View style={[animatedSidebarStyle, styles.sidebar]}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Todas ({data.length})</Text>
                        <TouchableOpacity onPress={handleCloseSidebar} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-circle-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.content}>
                        {
                            data.length === 0 ? 
                                null
                                :
                                data.map((item, index) => (
                                    <View key={index} style={styles.itemAdminWrapper}>
                                        <View style={styles.itemInfosWrapper}>
                                            {item.image ? (
                                                <View style={styles.itemImageWrapper}>
                                                    <Image source={require('../../assets/images/reidobacalhau.png')} style={styles.itemImage} />
                                                </View>
                                            ) : null}
                                            {item.isAdminAddNotification ? (
                                                <View style={styles.textWrapper}>
                                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                                    <Text style={styles.itemDescription}>{item.description} adicionou você como Administrador.</Text>
                                                </View>
                                            ) : (
                                                <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                                                    <View style={styles.textWrapper}>
                                                        <Text style={styles.itemTitle}>
                                                            {item.isDeposit ? (item.depositFailed ? "Depósito falhou" : "Depósito feito com sucesso") : item.title}
                                                        </Text>
                                                        <Text style={styles.itemDescription}>
                                                            {item.isDeposit ? `${item.description} tokens` : `${item.description} Anulou o seu cashback, o valor 40.00 cEur foi devolvido à sua carteira`}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity style={styles.itemIcon} onPress={() => handleRemoveNotification(index)}>
                                                        <Feather name="trash" size={24} color="#E35D6A" />
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                        {item.isAdminAddNotification ? (
                                            <View style={styles.buttonsAdminWrapper}>
                                                <TouchableOpacity style={[styles.buttonAdmin, { backgroundColor: '#198754' }]}>
                                                    <Text style={styles.buttonAdminText}>Confirmar</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.buttonAdmin, { backgroundColor: '#626262' }]} onPress={() => handleRemoveNotification(index)}>
                                                    <Text style={styles.buttonAdminText}>Recusar</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : null}
                                    </View>
                                ))
                        }
                    </ScrollView>
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
        paddingTop: 40
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
        fontSize: 20,
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
    itemAdminWrapper: {
        borderBottomWidth: 1,
        paddingVertical: 30,
        borderColor: '#373737'
    },
    itemWrapper: {
        borderBottomWidth: 1,
        paddingVertical: 30,
        borderColor: '#373737',
        flexDirection: 'row',
    },
    itemInfosWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        gap: 15
    },
    itemImageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#BAB3B3',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,

    },
    textWrapper: {
        flex: 1,
        gap: 5,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#a3a3a3'

    },
    itemDescription: {
        color: '#F8F9FA',
        fontSize: 16,
        fontWeight: '400'
    },
    itemIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    buttonsAdminWrapper: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonAdmin: {
        width: '100%',
        height: 36,
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonAdminText: {
        color: 'white',
        fontSize: 16
    },
});
