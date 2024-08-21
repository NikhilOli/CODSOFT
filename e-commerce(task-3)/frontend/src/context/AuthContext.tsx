import React, { createContext, ReactNode, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: any; // You can replace `any` with a specific type if you know the structure of the user object
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
