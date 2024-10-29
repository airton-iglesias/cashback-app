import React, { createContext, useState, useContext } from 'react';

interface AppStateContextProps {
    isCommercePath: boolean;
    changeCommercePath: any;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de SidebarProvider');
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCommercePath, setIsCommercePath] = useState(false);
  
  const changeCommercePath = (isCommercePath: boolean) => {
    setIsCommercePath(!isCommercePath);
  };

  return (
    <AppStateContext.Provider
      value={{
        isCommercePath,
        changeCommercePath
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
