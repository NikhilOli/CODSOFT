

interface User {
    name: string;
    picture: string;
    email: string;
}

interface UserDetailsProps {
    user: User;
    isUserDetailsOpen: boolean;
    toggleUserDetails: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user}) => {
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="flex items-center mb-4">
                <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full border-2 border-green-500 shadow-md mr-4"
                />
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            </div>
            <div className="text-gray-300">
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default UserDetails;
