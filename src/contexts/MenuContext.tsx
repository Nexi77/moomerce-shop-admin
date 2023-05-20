import { createContext, useState, Dispatch, SetStateAction, ReactNode, useMemo } from 'react'

interface MenuContextType {
  menuOpen: boolean;
  setMenuState: Dispatch<SetStateAction<boolean>>
}

interface MenuContextProviderProps {
  children: ReactNode
}

const defaultContextState = {
    menuOpen: false,
    setMenuState: () => {}
} as MenuContextType;

export const MenuContext = createContext<MenuContextType>(defaultContextState);

const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const [menuOpen, setMenuState] = useState<boolean>(false);
  const value = useMemo(() => ({
    menuOpen, setMenuState
  }), [menuOpen])
  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContextProvider;

