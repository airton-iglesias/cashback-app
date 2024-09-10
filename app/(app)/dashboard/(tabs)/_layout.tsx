import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import HomeIcon from '@/assets/icons/homeIcon';
import SearchIcon from '@/assets/icons/searchIcon';
import WallatIcon from '@/assets/icons/wallatIcon';
import QRCodeIcon from '@/assets/icons/qrcodeIcon';
import CashbackIcon from '@/assets/icons/cashbackIcon';
import NotificationSidebar from '@/components/notificationSidebar';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/header';

export default function TabLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleTabChange = (currentTab: any) => {
    if (currentTab === 'qrcode' || currentTab === 'search') {
      setShowTopbar(false);
    } else {
      setShowTopbar(true);
    }
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
    <SafeAreaView style={{ flex: 1 }}>
      {showTopbar && <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />}
      {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}
      {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}

      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            switch (route.name) {
              case 'index':
                return (
                  <View style={styles.BottomTabIcons}>
                    <HomeIcon size={30} focused={focused} />
                  </View>
                );
              case 'search':
                return (
                  <View style={styles.BottomTabIcons}>
                    <SearchIcon size={28} focused={focused} />
                  </View>
                );
              case 'wallet':
                return (
                  <View style={styles.BottomTabIcons}>
                    <WallatIcon size={28} focused={focused} />
                  </View>
                );
              case 'qrcode':
                return (
                  <View style={styles.BottomTabIcons}>
                    <QRCodeIcon size={20} focused={focused} />
                  </View>
                );
              case 'send_cashback':
                return (
                  <View style={styles.BottomTabIcons}>
                    <CashbackIcon size={28} focused={focused} />
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
        initialRouteName="index"
        screenListeners={{
          tabPress: (e) => {
            const currentTab = e.target?.split('-')[0];
            handleTabChange(currentTab);
          },
        }}
      >
        <Tabs.Screen name="index" options={{ headerShown: false }} />
        <Tabs.Screen name="search" options={{ headerShown: false }} />
        <Tabs.Screen name="wallet" options={{ headerShown: false }} />
        <Tabs.Screen name="qrcode" options={{ headerShown: false }} />
        <Tabs.Screen name="send_cashback" options={{ headerShown: false }} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BottomTabIcons: {
    backgroundColor: 'transparent',
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
