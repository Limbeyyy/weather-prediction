import React, { useState } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownModelMenu from './DropModelMenu'
import Content from './Content'
import "./Menus.css"

import MenuForm from './MenuForm'



const Menus = ({ model, location, setModel, setLocation }) => {
    const [showForm, setShowForm] = useState(false);

    const handleOpenForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            {showForm ? (<MenuForm model={model} location={location} />) :
                (<div className='mains'>
                    <div className='sub-main'>
                        <div className='locations'>
                            <h4> Select Location </h4>
                            <DropdownMenu setLocation={setLocation} />
                        </div>
                        <div className='models'>
                            <h4> Select Models</h4>
                            <DropdownModelMenu setModel={setModel} />
                        </div>

                        <div className='target'>
                            <h1> Target :</h1>
                        </div>


                        <div className='input-vector'>
                        </div>

                        <div className='form-buttons'>
                            <h2>Click to View Form</h2>
                            <button className='buttons' onClick={handleOpenForm}>Open Form</button>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default Menus