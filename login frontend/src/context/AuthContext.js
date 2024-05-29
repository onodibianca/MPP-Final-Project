import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to log in the user
    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);  // Save the token locally
            setCurrentUser({ username, token });  // Update the user state
            setLoading(false);
            return token;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem('token');  // Remove the token from storage
        setCurrentUser(null);  // Clear the user state
    };

    // Effect to check local storage for an existing token on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentUser({ token });
        }
        setLoading(false);
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
