import React, { useState } from 'react';
import Content from './Content';
import axios from 'axios';
import "./Form.css";

const confidences = {
    "logistic_model": 78.24,
    "dt_classifier_model": 86.68,
    "rf_classifier_model": 93.36,
    "catboost_model": 95.14,
    "xgboost_model": 96.60,
    "mlp_model": 88.73,
}

const Form = ({ model, location: selectedLocation }) => {
    model = model === '' ? 'rf_classifier_model' : model
    const uri = selectedLocation === ''
        ? `http://localhost:8000/predict/?model=${model}`
        : `http://localhost:8000/predict/${selectedLocation}/?model=${model}`

    const [location, setLocation] = useState('')
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [evaporation, setEvaporation] = useState('');
    const [sunshine, setSunshine] = useState('');
    const [windGustDir, setWindGustDir] = useState('');
    const [windGustSpeed, setWindGustSpeed] = useState('');
    const [windDir9am, setWindDir9am] = useState('');
    const [windDir3pm, setWindDir3pm] = useState('');
    const [windSpeed9am, setWindSpeed9am] = useState('');
    const [windSpeed3pm, setWindSpeed3pm] = useState('');
    const [humidity9am, setHumidity9am] = useState('');
    const [humidity3pm, setHumidity3pm] = useState('');
    const [pressure9am, setPressure9am] = useState('');
    const [pressure3pm, setPressure3pm] = useState('');
    const [cloud9am, setCloud9am] = useState('');
    const [cloud3pm, setCloud3pm] = useState('');
    const [temperature9am, setTemperature9am] = useState('');
    const [temperature3pm, setTemperature3pm] = useState('');
    const [rainToday, setRainToday] = useState('');
    const [result, setResult] = useState({});
    const [changed, setChanged] = useState(false);

    const getInference = async () => {
        const request_body = changed ? {
            "Location": location,
            "MinTemp": Number(minTemp),
            "MaxTemp": Number(maxTemp),
            "Rainfall": Number(rainfall),
            "Evaporation": Number(evaporation),
            "Sunshine": Number(sunshine),
            "WindGustDir": windGustDir,
            "WindGustSpeed": Number(windGustSpeed),
            "WindDir9am": windDir9am,
            "WindDir3pm": windDir3pm,
            "WindSpeed9am": Number(windSpeed9am),
            "WindSpeed3pm": Number(windSpeed3pm),
            "Humidity9am": Number(humidity9am),
            "Humidity3pm": Number(humidity3pm),
            "Pressure9am": Number(pressure9am),
            "Pressure3pm": Number(pressure3pm),
            "Cloud9am": Number(cloud9am),
            "Cloud3pm": Number(cloud3pm),
            "Temp9am": Number(temperature9am),
            "Temp3pm": Number(temperature3pm),
            "RainToday": rainToday
        } : null;
        // console.log(request_body)

        try {
            const response = await axios.post(uri, request_body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`,
                },
            });

            if (response.status === 200) {
                setResult(response.data);
                setLocation(selectedLocation === '' ? response.data.inputs.Location : selectedLocation)
                setMinTemp(response.data.inputs.MinTemp.toFixed(2))
                setMaxTemp(response.data.inputs.MaxTemp.toFixed(2))
                setRainfall(response.data.inputs.Rainfall.toFixed(2))
                setEvaporation(response.data.inputs.Evaporation.toFixed(2))
                setSunshine(response.data.inputs.Sunshine.toFixed(2))
                setWindGustDir(response.data.inputs.WindGustDir)
                setWindGustSpeed(response.data.inputs.WindGustSpeed.toFixed(2))
                setWindDir9am(response.data.inputs.WindDir9am)
                setWindDir3pm(response.data.inputs.WindDir3pm)
                setWindSpeed9am(response.data.inputs.WindSpeed9am.toFixed(2))
                setWindSpeed3pm(response.data.inputs.WindSpeed3pm.toFixed(2))
                setHumidity9am(response.data.inputs.Humidity9am.toFixed(2))
                setHumidity3pm(response.data.inputs.Humidity3pm.toFixed(2))
                setPressure9am(response.data.inputs.Pressure9am.toFixed(2))
                setPressure3pm(response.data.inputs.Pressure3pm.toFixed(2))
                setTemperature9am(response.data.inputs.Temp9am.toFixed(2))
                setTemperature3pm(response.data.inputs.Temp3pm.toFixed(2))
                setCloud9am(response.data.inputs.Cloud9am.toFixed(2))
                setCloud3pm(response.data.inputs.Cloud3pm.toFixed(2))
                setRainToday(response.data.inputs.RainToday)
                // console.log(response.data)
            } else {
                console.error('server responded with status: ', response.status)
            }
        } catch (error) {
            console.error('Error during prediction:', error);
        } finally {
            setChanged(false);
        }
    }


    return (
        <div>
            <div className='main-top'>
                <form>
                    <div className='main'>
                        <div className='first'>
                            <div className='forms'>
                                <h4> Location</h4>
                                <input type='text' placeholder='Location' className='field' value={location} onChange={(e) => { setLocation(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Minimum Temperature</h4>
                                <input type='text' placeholder='MinTemp' className='field' value={minTemp} onChange={(e) => { setMinTemp(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Max Temperature</h4>
                                <input type='text' placeholder='MaxTemp' className='field' value={maxTemp} onChange={(e) => { setMaxTemp(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Rainfall</h4>
                                <input type='text' placeholder='Rainfall' className='field' value={rainfall} onChange={(e) => { setRainfall(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Evaporation</h4>
                                <input type='text' placeholder='Evaporation' className='field' value={evaporation} onChange={(e) => { setEvaporation(e.target.value); setChanged(true) }} />
                            </div>
                        </div>
                        <div className='second'>
                            <div className='forms'>
                                <h4> Sunshine</h4>
                                <input type='text' placeholder='Sunshine' className='field' value={sunshine} onChange={(e) => { setSunshine(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Gust Direction</h4>
                                <input type='text' placeholder='WindGustDir' className='field' value={windGustDir} onChange={(e) => { setWindGustDir(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Gust Speed</h4>
                                <input type='text' placeholder='WindGustSpeed' className='field' value={windGustSpeed} onChange={(e) => { setWindGustSpeed(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Direction 9am</h4>
                                <input type='text' placeholder='Wind Direction 9am' className='field' value={windDir9am} onChange={(e) => { setWindDir9am(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Direction 3pm</h4>
                                <input type='text' placeholder='Wind Direction 3pm' className='field' value={windDir3pm} onChange={(e) => { setWindDir3pm(e.target.value); setChanged(true) }} />
                            </div>
                        </div>
                        <div className='second'>
                            <div className='forms'>
                                <h4> Wind Speed 9am</h4>
                                <input type='text' placeholder='Wind Speed 9am' className='field' value={windSpeed9am} onChange={(e) => { setWindSpeed9am(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Speed 3pm</h4>
                                <input type='text' placeholder='Wind Speed 3pm' className='field' value={windSpeed3pm} onChange={(e) => { setWindSpeed3pm(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Humidity 9am</h4>
                                <input type='text' placeholder='Humidity 9am' className='field' value={humidity9am} onChange={(e) => { setHumidity9am(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Humidity 3pm</h4>
                                <input type='text' placeholder='Humidity 3pm' className='field' value={humidity3pm} onChange={(e) => { setHumidity3pm(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Pressure 9am</h4>
                                <input type='text' placeholder='Pressure 9am' className='field' value={pressure9am} onChange={(e) => { setPressure9am(e.target.value); setChanged(true) }} />
                            </div>
                        </div>
                        <div className='second'>
                            <div className='forms'>
                                <h4> Pressure 3pm</h4>
                                <input type='text' placeholder='Pressure 3pm' className='field' value={pressure3pm} onChange={(e) => { setPressure3pm(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Cloud 9am</h4>
                                <input type='text' placeholder='Cloud 9am' className='field' value={cloud9am} onChange={(e) => { setCloud9am(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Cloud 3pm</h4>
                                <input type='text' placeholder='Cloud 3pm' className='field' value={cloud3pm} onChange={(e) => { setCloud3pm(e.target.value); setChanged(true) }} />
                            </div>

                            <div className='forms'>
                                <h4>Temperature 9am</h4>
                                <input type='text' placeholder='Temperature 9am' className='field' value={temperature9am} onChange={(e) => { setTemperature9am(e.target.value); setChanged(true) }} />
                            </div>
                            <div className='forms'>
                                <h4> Temperature 3pm</h4>
                                <input type='text' placeholder='Temperature 3pm' className='field' value={temperature3pm} onChange={(e) => { setTemperature3pm(e.target.value); setChanged(true) }} />
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <div className='forms-1'>
                        <h4> Rain Today</h4>
                        <input type='text' placeholder='Rain Today' className='field' value={rainToday} onChange={(e) => { setRainToday(e.target.value); setChanged(true) }} />
                    </div>
                    <Content onClick={getInference} prediction={result.target} confidence={model === '' ? undefined : confidences[model]} />
                </div>
            </div >
        </div >
    );
};

export default Form;