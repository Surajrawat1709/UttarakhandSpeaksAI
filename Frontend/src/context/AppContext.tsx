import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  username: string;
  setUsername: (v: string) => void;
  animeName: string;
  setAnimeName: (v: string) => void;
  currentImage: string;
  setCurrentImage: (v: string) => void;
  token: string | null;
  setToken: (v: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');
  const [animeName, setAnimeName] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string>('/assets/Dress_c1/village_male_happy.png');
  const [token, setTokenState] = useState<string | null>(
    () => localStorage.getItem('auth_token')
  );

  const setToken = (v: string | null) => {
    setTokenState(v);
    if (v) {
      localStorage.setItem('auth_token', v);
    } else {
      localStorage.removeItem('auth_token');
    }
  };

  return (
    <AppContext.Provider
      value={{ username, setUsername, animeName, setAnimeName, currentImage, setCurrentImage, token, setToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
