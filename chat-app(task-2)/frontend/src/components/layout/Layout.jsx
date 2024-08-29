import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => { 
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;