import React, { useState, useEffect } from 'react';
import { View, BackHandler, SafeAreaView } from 'react-native';
import Topbar from '../components/header';
import Sidebar from '../components/sidebar';
import BottomTabNavigation from '../navigation/BottomTabNavigation';
import NotificationSidebar from '@/components/notificationSidebar';

export default function DashboardScreen() {
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

    const handleTabChange = (currentTab: string) => {
        if (currentTab === 'QrCodeTab' || currentTab === 'SearchTab'){
            setShowTopbar(false);
            return;
        }

        setShowTopbar(true);
        
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
    }, [isSidebarOpen, closeSidebar]);

    useEffect(() => {
        const backAction = () => {
            if (isNotificationsOpen) {
                closeSidebar();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isNotificationsOpen, closeNotifications]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {showTopbar && <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />}
            {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
            <BottomTabNavigation
                onTabChange={handleTabChange}
            />
        </SafeAreaView>
    );
}
