// Result.jsx
import React, { useState } from 'react';
import DropdownModelMenu from '../Home/DropModelMenu';
import Analysis from './Analysis';
import "./Result.css";

const Result = () => {
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle model selection
    const handleModelSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className='analyze'>
            <DropdownModelMenu setModel={handleModelSelect} />
            <Analysis selectedOption={selectedOption} />
        </div>
    );
};

export default Result;
