import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppStateContextType {
  isSwitchedAccount: boolean;
  switchAccount: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSwitchedAccount, setIsSwitchedAccount] = useState(false);

  const switchAccount = () => {
    setIsSwitchedAccount(prevState => !prevState);
  };

  return (
    <AppStateContext.Provider value={{ isSwitchedAccount, switchAccount }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
