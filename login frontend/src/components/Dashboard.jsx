import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    if (!currentUser) {
        navigate('/login'); // Redirect to login if not authenticated
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {currentUser?.username}!</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
