import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp'; 
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUp />} />  // Add the SignUp route
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
