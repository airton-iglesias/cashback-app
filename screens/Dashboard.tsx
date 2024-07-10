import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from "expo-blur";
import Home from "../components/dashboardComponents/home";
import { View } from 'react-native';
import Search from '../components/dashboardComponents/search';
import Wallat from '../components/dashboardComponents/wallat';
import Qrcode from '../components/dashboardComponents/qrcode';
import Withdraw from '../components/dashboardComponents/withdraw';
import HomeIcon from '../assets/homeIcon';
import SearchIcon from '../assets/searchIcon';
import WallatIcon from '../assets/wallatIcon';
import QRCodeIcon from '../assets/qrcodeIcon';
import AirplaneIcon from '../assets/airplaneIcon';

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case 'DashboardHome':
                            return (
                                <View style={{ backgroundColor: 'transparent' }} className=' h-14 w-14 flex justify-center items-center'>
                                    <HomeIcon size={30} focused={focused}/>
                                </View>
                            );
                        case 'SearchTab':
                            return (
                                <View style={{ backgroundColor: 'transparent' }} className=' h-14 w-14 flex justify-center items-center'>
                                    <SearchIcon size={28} focused={focused}/>
                                </View>
                            );
                        case 'WalletTab':
                            return (
                                <View style={{ backgroundColor: 'transparent' }} className=' h-14 w-14 flex justify-center items-center'>
                                    <WallatIcon size={28} focused={focused}/> 
                                </View> 
                            );
                        case 'QrCodeTab':
                            return (
                                <View style={{ backgroundColor: 'transparent' }} className=' h-14 w-14 flex justify-center items-center'>
                                    <QRCodeIcon size={28} focused={focused}/>
                                </View>
                            );
                        case 'WithdrawTab':
                            return (
                                <View style={{ backgroundColor: 'transparent' }} className=' h-14 w-14 flex justify-center items-center'>
                                    <AirplaneIcon size={28} focused={focused}/>
                                </View>
                            );
                        default:
                            return (
                                <View style={{ backgroundColor: 'transparent' }} className=' h-14 w-14 flex justify-center items-center'>
                                    <HomeIcon size={30} focused={focused}/>
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
            })}
            initialRouteName="SearchTab"
        >
            <Tab.Screen name="DashboardHome" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="SearchTab" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="WalletTab" component={Wallat} options={{ headerShown: false }} />
            <Tab.Screen name="QrCodeTab" component={Qrcode} options={{ headerShown: false }} />
            <Tab.Screen name="WithdrawTab" component={Withdraw} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
