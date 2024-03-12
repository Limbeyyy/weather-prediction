import React from 'react'
import { FaCloudShowersHeavy } from "react-icons/fa6";
import "./Content.css";
import { IoSunny } from "react-icons/io5";

const Content = () => {
    return (
        <div className='left-contents'>
            <div className='icons'>
                <div className='cloud'>
                    <FaCloudShowersHeavy />
                    {/* <IoSunny /> */}
                </div>
                <h1> Rainy</h1>
                <div>
                    <h4> Humidity</h4>
                    <h4> RainFall</h4>
                </div>
                <div>
                    <h5> 45% </h5>
                    <h5> Yes</h5>
                </div>
            </div >

            <div className='temperature'>
                <h1> 72</h1>
                <sup> o </sup>
                <sup className='supscript'> C </sup>

            </div>

        </div>
    )
}

export default Content;


//           const [prediction, setPrediction] = useState('no');

//     // Function to handle prediction change
//     const handlePredictionChange = (newPrediction) => {
//         setPrediction(newPrediction);
//     };

//     return (
//         <div>
//             <div>
//                 <button onClick={() => handlePredictionChange('no')}>No Rain Tomorrow</button>
//                 <button onClick={() => handlePredictionChange('yes')}>Rain Tomorrow</button>
//             </div>
//             <FontAwesomeIcon icon={prediction === 'yes' ? faClouds : faSun} />
//         </div>
//     ); */}

