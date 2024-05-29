import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import login_background from '../assets/login_background.jpg';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            navigate('/login'); //navigate to login after successful registration
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Registration failed. Please try again later.');
        }
    };

    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay' src={login_background} alt="Background" style={{ zIndex: -10 }} />
            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center' style={{ zIndex: 1 }}>
                <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={handleSignUp}>
                    <h2 className='text-4xl font-bold text-center py-4'>Sign Up</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className='border relative bg-gray-100 p-2 outline'
                            style={{ outlineColor: '#C68642', outlineWidth: '2px' }}
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='border relative bg-gray-100 p-2 outline'
                            style={{ outlineColor: '#C68642', outlineWidth: '2px' }}
                        />
                    </div>
                    <button type='submit' className='w-full py-3 mb-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'>Register</button>
                    {error && <p className='text-red-500'>{error}</p>}
                    <p className='text-center mt-8'>
                        Already a member? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>Login here</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
