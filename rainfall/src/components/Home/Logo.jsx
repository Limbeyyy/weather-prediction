import React from 'react'
import './Logo.css'
import photo from '/images/weather-logo.avif';



function Logo() {
    return (
        <div className='logos'>
            <img src={photo} alt='Logo' className='logo' />
        </div>
    )
}

export default Logo;