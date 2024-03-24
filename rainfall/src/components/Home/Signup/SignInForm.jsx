import './SignInForm.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCircleExclamation, faFileText, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ErrorBox = ({ message }) => {
    return (
        <div className="error-box">
            <p className="error-message"> <FontAwesomeIcon icon={faCircleExclamation} />{message}</p>
        </div>
    );
};

function SignInForm() {
    const [formData, setFormData] = useState({
        username: '', // Corrected field name
        email: '',
        full_name: '', // Corrected field name
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
            const response = await axios.post('http://localhost:8000/token/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error during sign up:', error);
            if (error.response && error.response.status === 422) {
                setErrorMessage('Invalid data. Please check your inputs.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }
    };

    return (
        <div>
            {errorMessage && <ErrorBox message={errorMessage} />}
            <form className='signform'>

                <div className='first'>
                    <div className='signin'>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" name="username" placeholder="User Name" value={formData.username} onChange={handleInputChange} required />
                    </div>

                    <div className='signin'>
                        <FontAwesomeIcon icon={faFileText} />
                        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleInputChange} required />
                    </div>

                    <div className='signin'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                    </div>

                    <button type="submit" onClick={handleLogin}>Sign In</button>
                </div>

                <div className='second'>
                    <div className='signin'>
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
