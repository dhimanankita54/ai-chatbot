import { Outlet } from "react-router";
import Chatbot from "../components/Chatbot";
import SidebarComponent from "../components/Sidebar";


const Layout = () => {
    return (
        <>
            <div className='flex bg-gray-800 min-h-screen'>
                <SidebarComponent />
                <Outlet />
            </div>
        </>
    )
}

export default Layout;