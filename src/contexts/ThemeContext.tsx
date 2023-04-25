import { createContext, useState, Dispatch, SetStateAction, ReactNode, useMemo } from 'react'

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: 'light' | 'dark',
  setTheme: Dispatch<SetStateAction<ThemeType>>
}

interface ThemeContextProviderProps {
  children: ReactNode
}

const defaultContextState = {
  theme: 'light',
  setTheme: () => {}
} as ThemeContextType;

export const ThemeContext = createContext<ThemeContextType>(defaultContextState);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const value = useMemo(() => ({
    theme, setTheme
  }), [theme])
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;

