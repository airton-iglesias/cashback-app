import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Home from "../components/dashboardComponents/home";
import Search from '../components/dashboardComponents/search';
import Wallat from '../components/dashboardComponents/wallat/wallat';
import Qrcode from '../components/dashboardComponents/qrcode/qrcode';
import SendDiscount from '../components/dashboardComponents/sendDiscount/sendDiscount';
import HomeIcon from '../assets/icons/homeIcon';
import SearchIcon from '../assets/icons/searchIcon';
import WallatIcon from '../assets/icons/wallatIcon';
import QRCodeIcon from '../assets/icons/qrcodeIcon';
import WithdrawIcon from '../assets/icons/cashbackIcon';
import BlurView from 'expo-blur/build/BlurView';
import { DashboardTabParamList } from '../types/navigationTypes';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

export default function BottomTabNavigation({ onTabChange }: any) {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case 'DashboardHome':
                            return (
                                <View style={styles.BottomTabIcons}>
                                    <HomeIcon size={30} focused={focused} />
                                </View>
                            );
                        case 'SearchTab':
                            return (
                                <View style={styles.BottomTabIcons}>
                                    <SearchIcon size={28} focused={focused} />
                                </View>
                            );
                        case 'WalletTab':
                            return (
                                <View style={styles.BottomTabIcons}>
                                    <WallatIcon size={28} focused={focused} />
                                </View>
                            );
                        case 'QrCodeTab':
                            return (
                                <View style={styles.BottomTabIcons}>
                                    <QRCodeIcon size={20} focused={focused} />
                                </View>
                            );
                        case 'WithdrawTab':
                            return (
                                <View style={styles.BottomTabIcons}>
                                    <WithdrawIcon size={28} focused={focused} />
                                </View>
                            );
                        default:
                            return (
                                <View style={styles.BottomTabIcons}>
                                    <HomeIcon size={30} focused={focused} />
                                </View>
                            );
                    }
                },
                tabBarStyle: {
                    position: 'absolute',
                    height: 80,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#aaa',
                tabBarBackground: () => (
                    <BlurView
                        intensity={80}
                        tint="dark"
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 80,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        }}
                    />
                ),
                tabBarHideOnKeyboard: true,
            })}
            initialRouteName="DashboardHome"
            screenListeners={({ route }) => ({
                state: (e) => {
                    const currentRouteName = e.data.state.routes[e.data.state.index].name;
                    onTabChange(currentRouteName);
                },
            })}
        >
            <Tab.Screen name="DashboardHome" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="SearchTab" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="WalletTab" component={Wallat} options={{ headerShown: false }} />
            <Tab.Screen name="QrCodeTab" component={Qrcode} options={{ headerShown: false }} />
            <Tab.Screen name="WithdrawTab" component={SendDiscount} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    BottomTabIcons: {
        backgroundColor: 'transparent', 
        height: 56, 
        width: 56, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});