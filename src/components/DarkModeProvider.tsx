import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context with a default value
const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

interface DarkModeProviderProps {
  children: ReactNode;
}



export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to apply the dark mode class to the body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
export default DarkModeProvider;
