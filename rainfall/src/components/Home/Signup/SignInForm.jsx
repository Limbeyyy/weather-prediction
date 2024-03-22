import './SignInForm.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFileText } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function SignInForm() {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        email: '',
        NewPassword: '',
        ConfirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // Here you can perform further validation or submit the form data
        console.log('Form Data:', formData);
        // Reset form fields
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    return (
        <form className='signform'>
            <div>
                <div className='signin'>
                    <FontAwesomeIcon icon={faFileText} />
                    <input type="text" name="FirstName" placeholder="First Name" value={formData.FirstName} onChange={handleInputChange} required />
                </div>

                <div className='signin'>
                    <FontAwesomeIcon icon={faFileText} />
                    <input type="text" name="LastName" placeholder="Last Name" value={formData.LastName} onChange={handleInputChange} required />
                </div>

                <div className='signin'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                </div>

                <button type="submit" onClick={handleLogin}>Sign In</button>

            </div>

            <div>
                <div className='signin'>
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" name="NewPassword" placeholder="New Password" value={formData.NewPassword} onChange={handleInputChange} required />
                </div>


                <div className='signin'>
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" name="ConfirmPassword" placeholder="Confirm Password" value={formData.ConfirmPassword} onChange={handleInputChange} required />
                </div>


            </div>


        </form>
    );
}

export default SignInForm;
