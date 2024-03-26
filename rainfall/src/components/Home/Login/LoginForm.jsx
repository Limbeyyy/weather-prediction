import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';
import axios from 'axios';
import Menu from '../Menu';

// Separate component for error message box
const ErrorBox = ({ message }) => {
    return (
        <div className="error-box">
            <p className="error-message"> <FontAwesomeIcon icon={faCircleExclamation} />{message}</p>
        </div>
    );
};

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/token/', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                const userData = response.data;

                localStorage.setItem("token_type", userData.token_type)
                localStorage.setItem("access_token", userData.access_token)
                console.log('User data:', userData);
                navigate('/menuss');

            } else {
                setErrorMessage('Invalid username or password'); // Set error message for incorrect login
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000); // Clear error message after 3 seconds
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Invalid username or password');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); // Clear error message after 3 seconds
        }
    };

    return (
        <div>
            {errorMessage && <ErrorBox message={errorMessage} />} {/* Display error message in separate error box */}
            <form className='login-form' >
                <div className='login'>
                    <FontAwesomeIcon icon={faUser} />
                    <input type="text" name="username" placeholder="UserName" value={formData.username} onChange={handleInputChange} required />
                </div>

                <div className='login'>
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                </div>

                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
