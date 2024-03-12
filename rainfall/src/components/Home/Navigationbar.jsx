import React from 'react'
import './Navigationbar.css'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Navigationbar = () => {
    return (
        <div className='navigation'>
            <Logo />
            <ul>
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/performance"> Performance </Link></li>
                <li><Link to="/analysis"> Analysis</Link></li>
            </ul>
        </div>
    )
}

export default Navigationbar