import React from 'react';
"use client";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./PlotGraph.css";


const LineGraph = () => {
    // Sample data for demonstration
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // enter API
        datasets: [
            {
                label: "Temperature",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                borderWidth: 1,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                display: false, // hide x-axis
            },
            y: {
                display: false, // hide y-axis
            },

        },

        legend: {
            display: false,
        }
    };

    return (
        <div className='temp-graph'>
            <h2> Temperature</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineGraph;
