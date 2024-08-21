import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {

        const { loginWithRedirect, user } = useAuth0();
        console.log(user);
        
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to E-commerce Store</h2>
        <p className="mb-6">Sign in to access your account and start shopping!</p>
        <button 
          onClick={() => loginWithRedirect()} 
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Sign In to Continue
        </button>
      </div>

        </div>
    );
};

export default LoginPage;
