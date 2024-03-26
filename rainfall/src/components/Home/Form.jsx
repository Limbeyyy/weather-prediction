import React from 'react'
import Content from './Content'
import "./Form.css"
const Form = () => {
    return (
        <div>
            <div className='main-top'>
                {/* <button className='form-button' onClick={toggleForm}>
          {showForm ? 'Hide Form' : 'Show Form'}

        </button> */}
                <form>
                    <div className='main'>
                        <div className='first'>
                            <div className='forms'>
                                <h4> Location</h4>
                                <input type='text' placeholder='Location' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Minimum Temperature</h4>
                                <input type='text' placeholder='MinTemp' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Max Temperature</h4>
                                <input type='text' placeholder='MaxTemp' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Rainfall</h4>
                                <input type='text' placeholder='Rainfall' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Evaporation</h4>
                                <input type='text' placeholder='Evaporation' className='field' />
                            </div>
                        </div>
                        <div className='first'>
                            <div className='forms'>
                                <h4> Sunshine</h4>
                                <input type='text' placeholder='Sunshine' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Wind Gust Direction</h4>
                                <input type='text' placeholder='WindGustDir' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Wind Gust Speed</h4>
                                <input type='text' placeholder='WindGustSpeed' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Wind Direction 9am</h4>
                                <input type='text' placeholder='Wind Direction 9am' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Wind Direction 3pm</h4>
                                <input type='text' placeholder='Wind Direction 3pm' className='field' />
                            </div>
                        </div>

                        <div className='second'>
                            <div className='forms'>
                                <h4> Wind Speed 9am</h4>
                                <input type='text' placeholder='Wind Speed 9am' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Wind Speed 3pm</h4>
                                <input type='text' placeholder='Wind Speed 3pm' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Humidity 9am</h4>
                                <input type='text' placeholder='Humidity 9am' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Humidity 3pm</h4>
                                <input type='text' placeholder='Humidity 3pm' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Pressure 9am</h4>
                                <input type='text' placeholder='Pressure 9am' className='field' />
                            </div>
                        </div>
                        <div className='second'>
                            <div className='forms'>
                                <h4> Pressure 3pm</h4>
                                <input type='text' placeholder='Pressure 3pm' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Cloud 9am</h4>
                                <input type='text' placeholder='Cloud 9am' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Cloud 3pm</h4>
                                <input type='text' placeholder='Cloud 3pm' className='field' />
                            </div>
                            <div className='forms'>
                                <h4>Temperature 9am</h4>
                                <input type='text' placeholder='Temperature 9am' className='field' />
                            </div>
                            <div className='forms'>
                                <h4> Temperature 3pm</h4>
                                <input type='text' placeholder='Temperature 3pm' className='field' />
                            </div>
                        </div>

                    </div>
                </form>

                <div>
                    <div className='forms-1'>
                        <h4> Rain Today</h4>
                        <input type='text' placeholder='Rain Today' className='field' />
                    </div>
                    <Content />
                </div>
            </div>

        </div>
    )
}

export default Form