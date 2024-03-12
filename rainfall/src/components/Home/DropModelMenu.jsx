import React, { useState } from 'react';
import "./DropModelMenu.css"


function DropdownModelMenu() {
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle selection change
    const handleSelectionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleSelectionChange} className='model-dropmenu'>
                <option value="">Choose a Model</option>
                <option value="option1">Logistic Regression</option>
                <option value="option2">Decision Tree</option>
                <option value="option3">Random Forest</option>
                <option value="option4">XGBoost</option>
                <option value="option5">CatBoost</option>
            </select>
        </div>
    );
}

export default DropdownModelMenu;
