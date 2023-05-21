import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";
import { AuthContext } from "@/contexts/AuthContext";
import MenuContextProvider from "@/contexts/MenuContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


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
            {
                !isAuthenticated && <Navigate to='/auth/login' />
            }
      </div>
    )
}
export default MainLayout;