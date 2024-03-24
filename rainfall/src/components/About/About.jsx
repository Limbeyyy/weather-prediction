import React from 'react'
import "./About.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <div className='all'>
            <div className='abouts'>
                <h1> Welcome to Rainfall Predictor</h1>
                <h2>Your Weather Forecasting Companion.</h2>
                <p> With our intuitive user interface and powerful prediction algorithms, stay ahead of the weather with accurate rainfall forecasts tailored to your location.</p>
                <p> Plan your activities, mitigate risks, and make informed decisions with confidence. Let's predict rain together!</p>
            </div>


            <h1 className='service'> Our Services</h1>
            <div className='services'>
                <div className='services-1'>

                    <h2> Accurate Forecasts</h2>
                    <p>Stay informed with precise predictions tailored to your location.</p>
                </div>
                <div className='services-1'>
                    <h2> Intuitive UI</h2>
                    <p> Seamlessly navigate through weather data with our user-friendly design.</p>
                </div>
                <div className="services-1">
                    <FontAwesomeIcon icon={faBell} />
                    <h2> Notifications</h2>
                    <p> Receive rainfall forecasts personalized to your specific needs and preferences.</p>
                </div>

                <div className="services-1">
                    <h2> Confidence</h2>
                    <p> Helps you make well-informed decisions for your day based on reliable forecasts.</p>
                </div>
            </div>
        </div>
    )
}

export default About