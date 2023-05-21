import { createContext, useState, Dispatch, SetStateAction, ReactNode, useMemo } from 'react'

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

interface AuthContextProviderProps {
  children: ReactNode
}

const defaultContextState = {
    isAuthenticated: false,
    setIsAuthenticated: () => {}
} as AuthContextType;

export const AuthContext = createContext<AuthContextType>(defaultContextState);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const value = useMemo(() => ({
    isAuthenticated, setIsAuthenticated
  }), [isAuthenticated])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

