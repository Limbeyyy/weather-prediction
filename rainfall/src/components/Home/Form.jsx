import React, { useState } from 'react';
import Content from './Content';
import "./Form.css";

const Form = () => {

    const [location, setLocation] = useState('');
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

    return (
        <div>
            <div className='main-top'>
                <form>
                    <div className='main'>
                        <div className='first'>
                            <div className='forms'>
                                <h4> Location</h4>
                                <input type='text' placeholder='Location' className='field' value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Minimum Temperature</h4>
                                <input type='text' placeholder='MinTemp' className='field' value={minTemp} onChange={(e) => setMinTemp(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Max Temperature</h4>
                                <input type='text' placeholder='MaxTemp' className='field' value={maxTemp} onChange={(e) => setMaxTemp(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Rainfall</h4>
                                <input type='text' placeholder='Rainfall' className='field' value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Evaporation</h4>
                                <input type='text' placeholder='Evaporation' className='field' value={evaporation} onChange={(e) => setEvaporation(e.target.value)} />
                            </div>
                        </div>
                        <div className='second'>
                            <div className='forms'>
                                <h4> Sunshine</h4>
                                <input type='text' placeholder='Sunshine' className='field' value={sunshine} onChange={(e) => setSunshine(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Gust Direction</h4>
                                <input type='text' placeholder='WindGustDir' className='field' value={windGustDir} onChange={(e) => setWindGustDir(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Gust Speed</h4>
                                <input type='text' placeholder='WindGustSpeed' className='field' value={windGustSpeed} onChange={(e) => setWindGustSpeed(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Direction 9am</h4>
                                <input type='text' placeholder='Wind Direction 9am' className='field' value={windDir9am} onChange={(e) => setWindDir9am(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Direction 3pm</h4>
                                <input type='text' placeholder='Wind Direction 3pm' className='field' value={windDir3pm} onChange={(e) => setWindDir3pm(e.target.value)} />
                            </div>
                        </div>
                        <div className='second'>
                            <div className='forms'>
                                <h4> Wind Speed 9am</h4>
                                <input type='text' placeholder='Wind Speed 9am' className='field' value={windSpeed9am} onChange={(e) => setWindSpeed9am(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Wind Speed 3pm</h4>
                                <input type='text' placeholder='Wind Speed 3pm' className='field' value={windSpeed3pm} onChange={(e) => setWindSpeed3pm(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Humidity 9am</h4>
                                <input type='text' placeholder='Humidity 9am' className='field' value={humidity9am} onChange={(e) => setHumidity9am(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Humidity 3pm</h4>
                                <input type='text' placeholder='Humidity 3pm' className='field' value={humidity3pm} onChange={(e) => setHumidity3pm(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Pressure 9am</h4>
                                <input type='text' placeholder='Pressure 9am' className='field' value={pressure9am} onChange={(e) => setPressure9am(e.target.value)} />
                            </div>
                        </div>
                        <div className='second'>
                            <div className='forms'>
                                <h4> Pressure 3pm</h4>
                                <input type='text' placeholder='Pressure 3pm' className='field' value={pressure3pm} onChange={(e) => setPressure3pm(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Cloud 9am</h4>
                                <input type='text' placeholder='Cloud 9am' className='field' value={cloud9am} onChange={(e) => setCloud9am(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Cloud 3pm</h4>
                                <input type='text' placeholder='Cloud 3pm' className='field' value={cloud3pm} onChange={(e) => setCloud3pm(e.target.value)} />
                            </div>

                            <div className='forms'>
                                <h4>Temperature 9am</h4>
                                <input type='text' placeholder='Temperature 9am' className='field' value={temperature9am} onChange={(e) => setTemperature9am(e.target.value)} />
                            </div>
                            <div className='forms'>
                                <h4> Temperature 3pm</h4>
                                <input type='text' placeholder='Temperature 3pm' className='field' value={temperature3pm} onChange={(e) => setTemperature3pm(e.target.value)} />
                            </div>
                        </div>
                        <div className='forms-1'>
                            <div className='forms'>
                                <h4> Rain Today</h4>
                                <input type='text' placeholder='Rain Today' className='field' value={rainToday} onChange={(e) => setRainToday(e.target.value)} />
                            </div>
                            <Content />
                        </div>

                    </div>
                </form>
                <div>

                </div>
            </div >
        </div >
    );
};

export default Form;

