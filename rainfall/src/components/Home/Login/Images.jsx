import React from 'react';
import weather from '../Images/weather.png';
import "./Images.css"


function ImageSection() {
    return (
        <div className='login-images'>
            <img src={weather} alt='wallpaper' className='logins' />
        </div>
    );
}

export default ImageSection;
