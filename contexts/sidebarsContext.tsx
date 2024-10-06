import React, { createContext, useState, useContext } from 'react';

interface SidebarContextProps {
  isSidebarOpen: boolean;
  isNotificationsOpen: boolean;
  showSidebar: boolean;
  showNotifications: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  openNotifications: () => void;
  closeNotifications: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de SidebarProvider');
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
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
    setShowNotifications(true);
    setIsNotificationsOpen(true);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
    setTimeout(() => {
      setShowNotifications(false);
    }, 300);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        isNotificationsOpen,
        showSidebar,
        showNotifications,
        openSidebar,
        closeSidebar,
        openNotifications,
        closeNotifications,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
