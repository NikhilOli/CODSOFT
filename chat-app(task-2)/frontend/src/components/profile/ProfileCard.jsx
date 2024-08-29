import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const ProfileCard = () => {
    const { user, setUser, loading } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    if (!user) {
        return (
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
                <div className="p-6 text-center">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>No user data available</p>
                    )}
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('/users/profile', { username, email });
            setUser(response.data);
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
            <div className="text-center p-6  border-b">
                <img
                    className="h-24 w-24 rounded-full mx-auto"
                    src={user.profilePhoto ? user.profilePhoto : `https://avatars.dicebear.com/api/initials/${user.username}.svg`}
                    alt="Profile"
                />
                <p className="pt-2 text-lg font-semibold">{user.username}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="mt-5">
                    <button
                        onClick={() => setEditing(!editing)}
                        className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-700"
                    >
                        {editing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
            </div>
            {editing && (
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={username || user.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email || user.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProfileCard;