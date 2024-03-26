import { useState } from 'react';
import "./DropModelMenu.css"


function DropdownModelMenu({ setModel }) {
  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle selection change
  const handleSelectionChange = (event) => {
    const val = event.target.value
    setSelectedOption(val)
    setModel(val)
  };

  const getSelectedOption = () => {
    return selectedOption;
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectionChange} className='model-dropmenu'>
        <option value="rf_classifier_model">Random Forest</option>
        <option value="logistic_model">Logistic Regression</option>
        <option value="dt_classifier_model">Decision Tree</option>
        <option value="mlp_model">MLP</option>
        <option value="catboost_model">CatBoost</option>
        <option value="xgboost_model">XGBoost</option>
      </select>
    </div>
  );
}

export default DropdownModelMenu;
