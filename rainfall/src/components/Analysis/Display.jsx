import React, { useState } from 'react';
import { FormControl, Select, MenuItem, Button } from '@mui/material';

function Display() {
    const [selectedModel, setSelectedModel] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imagePaths = {
        "Random Forest": ["./Analysis/OutputImage/random forest/rfc1.png", "path_to_random_forest_image2.png", "path_to_random_forest_image3.png"],
        "Logistic Regression": ["path_to_logistic_regression_image1.png", "path_to_logistic_regression_image2.png"],
        "XGBoost": ["path_to_xgboost_image1.png", "path_to_xgboost_image2.png"],
        "CatBoost": ["path_to_catboost_image1.png", "path_to_catboost_image2.png"],
        "Decision Tree": ["./Analysis/OutputImage/decision tree/dt1.png", "./Analysis/OutputImage/decision tree/dt2.png", "./Analysis/OutputImage/decision tree/dt1.png"],
        "Neural Nets": ["path_to_neural_nets_image1.png", "path_to_neural_nets_image2.png"]
    };

    const displayImage = () => {
        // Load and display current image based on selected model
        const imagePath = imagePaths[selectedModel][currentImageIndex];
        const image = new Image();
        image.src = imagePath;
        image.onload = () => {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    };

    const handleChange = (event) => {
        setSelectedModel(event.target.value);
        setCurrentImageIndex(0); // Reset current image index when model changes
    };

    const handleNextImage = () => {
        if (currentImageIndex < imagePaths[selectedModel].length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0); // Loop back to the first image
        }
    };

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(imagePaths[selectedModel].length - 1); // Loop to the last image
        }
    };

    return (
        <div>
            <FormControl>
                <Select
                    value={selectedModel}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select Model' }}
                >
                    <MenuItem value="" disabled>Select Model</MenuItem>
                    {Object.keys(imagePaths).map(model => (
                        <MenuItem key={model} value={model}>{model}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={displayImage} disabled={!selectedModel} variant="contained">Display Image</Button>
            <Button onClick={handlePreviousImage} disabled={!selectedModel} variant="contained">Previous Image</Button>
            <Button onClick={handleNextImage} disabled={!selectedModel} variant="contained">Next Image</Button>
            <canvas id="imageCanvas" width="300" height="300"></canvas>
        </div>
    );
}

export default Display;
