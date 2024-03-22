import React from 'react'
import "./Account.css"
import { Link } from 'react-router-dom';


function Account() {
    return (
        <div className='account'>
            <Link to='/signup'> Create an Account</Link>
        </div>
    )
}

export default Account;
