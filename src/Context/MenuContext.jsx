import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MenuContext = createContext(null)

export function MenuProvider({ children }) {
  const [aberto, setAberto] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setAberto(false)
  }, [location.pathname])

  return (
    <MenuContext.Provider value={{ aberto, setAberto }}>
      {children}
    </MenuContext.Provider>
  )

}

export function useMenu() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('useMenu precisa estar dentro de MenuProvider')
  return ctx
}