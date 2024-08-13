import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AiIcon from "../../assets/icons/AiIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootStackParamList } from "../../types/navigationTypes";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Sidebar({ closeSidebar, isSidebarOpen }: any) {
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

    return (
        <View style={styles.overlay}>
            <View style={styles.backgroundOverlay}></View>
            <Animated.View style={[animatedSidebarStyle, styles.sidebar]}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleCloseSidebar} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-circle-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.menuItem}>
                            <TouchableOpacity
                                onPress={() => rootNavigation.navigate('profile')}
                                style={styles.menuButton}
                            >
                                <Feather name="user" size={24} color="white" />
                                <Text style={styles.menuText}>Meu perfil</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuItem}>
                            <TouchableOpacity
                                onPress={() => rootNavigation.navigate('points')}
                                style={styles.menuButton}
                            >
                                <Feather name="star" size={24} color="white" />
                                <Text style={styles.menuText}>Pontos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuButton}>
                                <AiIcon size={24} color="white" />
                                <Text style={styles.menuText}>Sobre nós</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuItem}>
                            <TouchableOpacity style={styles.menuButton}>
                                <Feather name="help-circle" size={24} color="white" />
                                <Text style={styles.menuText}>Ajuda</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuItem}>
                            <TouchableOpacity
                                style={styles.menuButton}
                                onPress={() => {
                                    rootNavigation.dispatch(
                                        CommonActions.reset({
                                            index: 1,
                                            routes: [{ name: 'signin' }],
                                        })
                                    );
                                }}
                            >
                                <LogoutIcon size={24} color="white" />
                                <Text style={styles.menuText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
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
        paddingVertical: 35
    },
    container: {
        flex: 1,
        paddingTop: 12,
    },
    header: {
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    closeButton: {
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#373737',
    },
    menuButton: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        height: '100%',
        width: '100%',
        paddingVertical: 10,
    },
    menuText: {
        color: 'white',
        fontSize: 18,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
