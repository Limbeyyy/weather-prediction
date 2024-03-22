import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import './LoginForm.css'
import axios from 'axios';


function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://your-auth-api.com/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Successful login
                const userData = response.data;
                console.log('User data:', userData);
            } else {
                // Handle authentication error
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <form className='login-form' >
            <div className='login'>
                <FontAwesomeIcon icon={faEnvelope} />
                <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className='login'>
                <FontAwesomeIcon icon={faLock} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
            </div>


            <button type="submit" onClick={handleLogin}>Login</button>
        </form >

    );
}

export default LoginForm;
