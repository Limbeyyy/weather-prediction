import { FaCloudShowersHeavy } from "react-icons/fa6";
import "./Content.css";
import { IoSunny } from "react-icons/io5";

const Content = ({ onClick, prediction }) => {
    return (
        <div className='left-contents' onClick={onClick}>
            <div className='icons'>
                <div className='cloud'>
                    {prediction ? <FaCloudShowersHeavy /> : <IoSunny />}
                </div>
                <h1> {prediction ? "Rainy" : "Sunny"}</h1>
                <div className="trans">
                    <h4 className="one"> RainFall</h4>

                </div>
                <div className="result">
                    <h5>{prediction !== null ? (prediction ? "Yes" : "No") : "Null"}</h5>

                </div>
            </div >
        </div>
    )
}

export default Content;
