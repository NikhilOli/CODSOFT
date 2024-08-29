import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="bg-indigo-600 text-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold">ChatApp</Link>
                {user ? (
                    <div className="flex items-center">
                        <Link to="/chat/profile" className="mr-4 hover:underline">
                            {user.username}
                        </Link>
                        <Link
                            to="/login"
                            className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded"
                        >
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="mr-4 hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;