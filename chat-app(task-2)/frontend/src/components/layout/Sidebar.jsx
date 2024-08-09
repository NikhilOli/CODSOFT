import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-indigo-800' : '';
    };

    return (
        <div className="bg-indigo-700 text-white w-64 py-6 flex-shrink-0">
            <nav>
                <ul>
                    <li>
                        <Link
                            to="/chat"
                            className={`block py-2 px-4 hover:bg-indigo-800 ${isActive('/')}`}
                        >
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/chat/profile"
                            className={`block py-2 px-4 hover:bg-indigo-800 ${isActive('/profile')}`}
                        >
                            Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;