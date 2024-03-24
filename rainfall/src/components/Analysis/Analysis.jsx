import React from 'react';
import lr1 from "../Analysis/Immages/lr1.png";
import lr2 from "../Analysis/Immages/lr2.png";
import lr3 from "../Analysis/Immages/lr3.jpg";
import dt1 from "../Analysis/Immages/dt1.png";
import dt2 from "../Analysis/Immages/dt2.png";
import dt3 from "../Analysis/Immages/dt3.jpg";
import nn1 from "../Analysis/Immages/nn1.png";
import nn2 from "../Analysis/Immages/nn2.png";
import nn3 from "../Analysis/Immages/nn3.jpg"
import rfc1 from "../Analysis/Immages/rfc1.png";
import rfc2 from "../Analysis/Immages/rfc2.png"
import rfc3 from "../Analysis/Immages/rfc3.jpg"
import cat1 from "../Analysis/Immages/cat1.png"
import cat2 from "../Analysis/Immages/cat2.png"
import cat3 from "../Analysis/Immages/cat3.jpg"
import xboost1 from "../Analysis/Immages/xboost1.png"
import xboost2 from "../Analysis/Immages/xboost2.png"
import xboost3 from "../Analysis/Immages/xboost3.jpg"

import "./Analysis.css";


const imagesMap = {
    "Logistic Regression": [lr1, lr2, lr3],
    "Decision Tree Classifier": [dt1, dt2, dt3],
    "Multi Layer Perceptron": [nn1, nn2, nn3],
    "Random Forest Classifier": [rfc1, rfc2, rfc3],
    "CatBoost": [cat1, cat2, cat3],
    "XGBoost": [xboost1, xboost2, xboost3]
};

const Analysis = ({ selectedOption }) => {
    const images = imagesMap[selectedOption] || [];

    return (
        <div className="model-images">
            <h3> Evaluation: {selectedOption}</h3>
            <div className="image-list">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} className='images-mul' />
                ))}
            </div>
        </div>
    );
};

export default Analysis;
