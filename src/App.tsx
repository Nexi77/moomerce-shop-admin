import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import Topbar from "./components/topbar/Topbar"
import Sidebar from './components/sidebar/Sidebar';
import MenuContextProvider from './contexts/MenuContext';

const App = () => {
  const { theme } = useContext(ThemeContext)
  useEffect(() => {
    switch(theme){
      case 'dark':
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        break;
      case 'light': 
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
      break;
      default:
        break;
    }
  }, [theme])
  return (
    <div className="App">
      <MenuContextProvider>
        <Topbar />
        <div className="container">
          <Sidebar />
          <main>
            <Outlet />
          </main>
        </div>
      </MenuContextProvider>
    </div>
  )
}
export default App
