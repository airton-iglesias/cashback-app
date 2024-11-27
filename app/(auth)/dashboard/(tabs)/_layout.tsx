import { Tabs, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import HomeIcon from '@/assets/icons/homeIcon';
import SearchIcon from '@/assets/icons/searchIcon';
import WallatIcon from '@/assets/icons/wallatIcon';
import QRCodeIcon from '@/assets/icons/qrcodeIcon';
import CashbackIcon from '@/assets/icons/cashbackIcon';
import NotificationSidebar from '@/components/notificationSidebar';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/header';
import { SidebarProvider, useSidebar } from '@/contexts/sidebarsContext';
import { usePathname } from 'expo-router';

export default function TabLayout() {
  return (
    <SidebarProvider>
      <Content />
    </SidebarProvider>
  );
}

function Content() {
  const {
    isSidebarOpen,
    isNotificationsOpen,
    showSidebar,
    showNotifications,
    openSidebar,
    closeSidebar,
    openNotifications,
    closeNotifications,
    showTopbar,
    hideTopbar
  } = useSidebar();

  const [currentScreen, setCurrentScreen] = useState();
  const pathname = usePathname();

  const handleTabChange = (currentTab: any) => {
    setCurrentScreen(currentTab);
    if (currentTab === 'qrcode' || currentTab === 'search') {
      hideTopbar(false);
    } else {
      hideTopbar(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (pathname === '/dashboard' && currentScreen === 'qrcode' || currentScreen === 'search') {
        hideTopbar(true);
      }

      if (pathname === '/dashboard/qrcode' && currentScreen === 'send_cashback') {
        hideTopbar(false);
      }
    }, [pathname])
  );

  useEffect(() => {
    const backAction = () => {
      if (isSidebarOpen) {
        closeSidebar();
        return true;
      }
      if (isNotificationsOpen) {
        closeNotifications();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isSidebarOpen, isNotificationsOpen]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showTopbar && <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />}
      {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}
      {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: () => (<BlurView intensity={80} tint="dark" style={styles.BlurView} />),
          tabBarStyle: { height: 80, backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          tabBarIconStyle: { flex: 1 },
          tabBarHideOnKeyboard: true
        }}
        screenListeners={{
          tabPress: (e) => {
            const currentTab = e.target?.split('-')[0];
            handleTabChange(currentTab);
          },
        }}
      >
        <Tabs.Screen name="index" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused }) => <HomeIcon size={30} focused={focused} /> }} />
        <Tabs.Screen name="search" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused }) => <SearchIcon size={28} focused={focused} /> }} />
        <Tabs.Screen name="wallet" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused }) => <WallatIcon size={28} focused={focused} /> }} />
        <Tabs.Screen name="qrcode" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused }) => <QRCodeIcon size={20} focused={focused} /> }} />
        <Tabs.Screen name="send_cashback" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused }) => <CashbackIcon size={28} focused={focused} /> }} />
      </Tabs>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BlurView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
});