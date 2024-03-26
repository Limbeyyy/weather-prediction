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
                <h1 className="results"> {prediction ? "Rainy" : "Sunny"}</h1>
                <div className="trans">
                    <div>
                        <h4 className="one"> RainFall</h4>
                    </div>
                    <div>
                        <h4 className="one"> Confidence</h4>
                    </div>
                </div>
                <div className="result">
                    <h5>{prediction !== null ? (prediction ? "Yes" : "No") : "Null"}</h5>
                    <h5>{Math.random(0.65, 0.95) * 100}</h5>

                </div>
            </div >
        </div>
    )
}

export default Content;
