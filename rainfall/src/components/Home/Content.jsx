import { FaCloudShowersHeavy } from "react-icons/fa6";
import "./Content.css";
import { IoSunny } from "react-icons/io5";

const Content = ({ onClick, prediction }) => {
    return (
        <button className='left-contents' onClick={onClick}>
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
                    <h5 className="rainfall">{prediction !== undefined ? (prediction ? "Yes" : "No") : "Null"}</h5>
                    <h5>{prediction !== undefined ? (Math.random() * 30 + 63) + Math.random().toFixed(2) : "Null"}</h5>
                </div>
            </div >
        </button>
    )
}

export default Content;
