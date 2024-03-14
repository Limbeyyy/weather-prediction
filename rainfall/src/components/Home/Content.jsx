import { FaCloudShowersHeavy } from "react-icons/fa6";
import "./Content.css";

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
                    <h4> RainFall</h4>
                </div>
                <div>
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
