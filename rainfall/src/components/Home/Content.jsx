import { FaCloudShowersHeavy } from "react-icons/fa6";
import "./Content.css";
// import { IoSunny } from "react-icons/io5";

const Content = ({ onClick, prediction }) => {
    return (
        <div className='left-contents' onClick={onClick}>
            <div className='icons'>
                <div className='cloud'>
                    <FaCloudShowersHeavy />
                    {/* <IoSunny /> */}
                </div>
                <h1> Rainy</h1>
                <div>
                    <h4> RainFall</h4>
                </div>
                <div>
                    <h5>{ prediction !== null ? prediction.toString() : "Null" }</h5>
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
