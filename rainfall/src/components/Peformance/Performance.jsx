import React from 'react'
import picture1 from "./Images/performance1.png"
import picture2 from "./Images/performance2.png"
import "./Performance.css"


const Performance = () => {
    return (
        <div className='pictures'>
            <img src={picture1} alt='pic1' className='picture' />
            <img src={picture2} alt='pic2' className='picture' />
        </div>
    )
}

export default Performance