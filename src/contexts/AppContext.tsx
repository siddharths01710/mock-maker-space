import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, ViewMode, Language, User } from '@/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentCategory: string | null;
  setCurrentCategory: (category: string | null) => void;
  currentModule: string | null;
  setCurrentModule: (module: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('detailed');
  const [language, setLanguage] = useState<Language>('EN');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        viewMode,
        setViewMode,
        language,
        setLanguage,
        sidebarOpen,
        setSidebarOpen,
        currentCategory,
        setCurrentCategory,
        currentModule,
        setCurrentModule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
