import React from "react";
import Header from "./Headers";
import ImageSection from '../Login/Images';
import LoginForm from '../Login/LoginForm';
import Account from '../Login/Account';
import "./LoginPage.css"


const LoginPage = () => {
    return (
        <div className="containers">
            <div className='container-border'>
                <ImageSection />
                <div className='contents'>
                    <Header />
                    <div className='fields'>
                        <LoginForm />
                    </div>
                    <Account />
                </div>
            </div>
        </div>
    )
}

export default LoginPage