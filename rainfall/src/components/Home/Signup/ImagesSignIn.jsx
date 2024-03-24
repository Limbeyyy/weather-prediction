
import React from 'react'
import images from '../Images/weather.png';
import "./ImagesSignIn.css";


function ImagesSignIn() {
    return (
        <div className='signin-images'>
            <img src={images} alt="wall" className='signups' />
        </div>

    )
}

export default ImagesSignIn