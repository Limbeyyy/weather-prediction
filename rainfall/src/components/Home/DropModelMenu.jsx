import { useState } from 'react';
import "./DropModelMenu.css"


function DropdownModelMenu({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle selection change
  const handleSelectionChange = (event) => {
    const val = event.target.value
    setSelectedOption(val)
    onSelect(val)
  };

  const getSelectedOption = () => {
    return selectedOption;
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectionChange} className='model-dropmenu'>
        <option value="Random Forest Classifier">Random Forest</option>
        <option value="Logistic Regression">Logistic Regression</option>
        <option value="Decision Tree Classifier">Decision Tree</option>
        <option value="Multi Layer Perceptron">MLP</option>
        <option value="CatBoost">CatBoost</option>
        <option value="XGBoost">XGBoost</option>
      </select>
    </div>
  );
}

export default DropdownModelMenu;
