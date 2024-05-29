import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import '../index.css';
import login_background from '../assets/login_background.jpg';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const { token } = response.data;
            if (rememberMe) {
                localStorage.setItem('token', token); // Save the token in local storage if "Remember Me" is checked
            } else {
                sessionStorage.setItem('token', token); // Save the token in session storage otherwise
            }
            window.location.href = 'http://localhost:3001';
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to connect to server');
        }
    };

    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay' src={login_background} alt="Background" style={{ zIndex: -10 }} />
            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={handleLogin}>
                    <h2 className='text-4xl font-bold text-center py-4'>DOG SHELTER</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Username</label>
                        <input className='border relative bg-gray-100 p-2 outline' style={{ outlineColor: '#C68642', outlineWidth: '2px' }} type="text" name = "username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Password</label>
                        <input className='border relative bg-gray-100 p-2 outline' style={{ outlineColor: '#C68642', outlineWidth: '2px' }} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='w-full py-3 mb-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'>Sign In</button>
                    {error && <p className='text-red-500'>{error}</p>}
                    <div className='flex justify-between py-4'>
                        <button className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'>
                            <AiFillFacebook className='mr-2' /> Facebook
                        </button>
                        <button className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'>
                            <FcGoogle className='mr-2' /> Google
                        </button>
                    </div>
                    <div className='flex items-center mt-2'>
                        <input className='mr-2' type="checkbox" name="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label>Remember Me</label>
                    </div>
                    <p className='text-center mt-8'>
                        Not a member? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign up now</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
