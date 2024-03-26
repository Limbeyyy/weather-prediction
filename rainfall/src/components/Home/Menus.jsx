import React, { useState } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownModelMenu from './DropModelMenu'
import Content from './Content'
import "./Menus.css"
import Form from './Form'
import MenuForm from './MenuForm'



const Menus = () => {
    const [showForm, setShowForm] = useState(false);

    const handleOpenForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            {showForm ? (<MenuForm />) :
                (<div className='mains'>
                    <div className='sub-main'>
                        <div className='locations'>
                            <h4> Select Location </h4>
                            <DropdownMenu />
                        </div>
                        <div className='models'>
                            <h4> Select Models</h4>
                            <DropdownModelMenu />
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
                    <Content />
                </div>)}

        </div>
    )
}

export default Menus