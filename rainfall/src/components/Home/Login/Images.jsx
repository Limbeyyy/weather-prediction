import React from 'react';
import books from '../Images/books.svg';
import "./Images.css"


function ImageSection() {
    return (
        <div className='login-images'>
            <img src={books} alt='wallpaper' />
        </div>
    );
}

export default ImageSection;
