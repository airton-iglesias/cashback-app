import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { faHouse, faSearch, faWallet, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { BlurView } from "expo-blur";
import Home from "../components/dashboardComponents/home";
import { View } from 'react-native';
import Search from '../components/dashboardComponents/search';
import Wallat from '../components/dashboardComponents/wallat';
import Qrcode from '../components/dashboardComponents/qrcode';
import Withdraw from '../components/dashboardComponents/withdraw';  // Atualize o caminho conforme necessário

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon;
                    switch (route.name) {
                        case 'DashboardHome':
                            icon = faHouse;
                            break;
                        case 'SearchTab':
                            icon = faSearch;
                            break;
                        case 'WalletTab':
                            icon = faWallet;
                            break;
                        case 'QrCodeTab':
                            icon = faQrcode;
                            break;
                        case 'WithdrawTab':
                            icon = faPaperPlane;
                            break;
                        default:
                            icon = faHouse;
                    }

                    return (
                        <View style={{ backgroundColor: 'transparent' }} className=' h-14 w-14 flex justify-center items-center'>
                            <FontAwesomeIcon
                                icon={icon}
                                size={28}
                                style={{ color: focused ? 'white' : 'gray' }}
                            />
                        </View>
                    );
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
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }}
                    />
                ),
            })}
            initialRouteName="DashboardHome"
        >
            <Tab.Screen name="DashboardHome" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="SearchTab" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="WalletTab" component={Wallat} options={{ headerShown: false }} />
            <Tab.Screen name="QrCodeTab" component={Qrcode} options={{ headerShown: false }} />
            <Tab.Screen name="WithdrawTab" component={Withdraw} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
