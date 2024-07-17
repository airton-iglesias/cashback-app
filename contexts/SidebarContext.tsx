// contexts/SidebarContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const SidebarContext = createContext<unknown>({defaultValue: undefined});

export const SidebarProvider = ({ children }:any) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const openSidebar = useCallback(() => {
        setShowSidebar(true);
        setIsSidebarOpen(true);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
        setTimeout(() => {
            setShowSidebar(false);
        }, 300);
    }, []);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, showSidebar, openSidebar, closeSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
