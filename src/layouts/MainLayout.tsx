import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";
import { AuthContext } from "@/contexts/AuthContext";
import MenuContextProvider from "@/contexts/MenuContext";
import Login from '@/pages/auth/login/Login'
import { useContext } from "react";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="App">
            { isAuthenticated && 
                <MenuContextProvider>
                    <Topbar />
                    <div className="container">
                    <Sidebar />
                    <main>
                        <Outlet />
                    </main>
                    </div>
                </MenuContextProvider> 
            }
            { !isAuthenticated && <Login />}
      </div>
    )
}
export default MainLayout;