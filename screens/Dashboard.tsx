import React, { useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import Topbar from '../components/header';
import Sidebar from '../components/sidebar';
import BottomTabNavigation from '../navigation/BottomTabNavigation';
import FilterSidebar from '../components/filterSidebar';

export default function DashboardScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);

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

    const openFilterSidebar = () => {
        setShowFilterSidebar(true);
        setIsFilterSidebarOpen(true);
    };

    const closeFilterSidebar = () => {
        setIsFilterSidebarOpen(false);
        setTimeout(() => {
            setShowFilterSidebar(false); 
        }, 300);
    };

    const handleTabChange = (currentTab: string) => {
        setShowTopbar(currentTab !== 'QrCodeTab');
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
            if (isFilterSidebarOpen) {
                closeFilterSidebar();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isFilterSidebarOpen, closeFilterSidebar]);

    return (
        <View style={{ flex: 1 }}>
            {showTopbar && <Topbar openSidebar={openSidebar} />}
            {showFilterSidebar && <FilterSidebar closeSidebar={closeFilterSidebar} isSidebarOpen={isFilterSidebarOpen} />}
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
            <BottomTabNavigation 
                onTabChange={handleTabChange} 
                openFilterSidebar={openFilterSidebar} 
                closeFilterSidebar={closeFilterSidebar}
            />
        </View>
    );
}
