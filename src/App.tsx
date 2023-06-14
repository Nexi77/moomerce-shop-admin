import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      <Outlet />
      <ToastContainer />
    </div>
  )
}
export default App
