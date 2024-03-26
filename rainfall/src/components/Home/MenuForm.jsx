import './MenuForm.css'
import React from 'react'
import Form from './Form'


const MenuForm = ({ model, location }) => {

  return (
    <div>
      <div>
        <h1 className='sides'> Know Your Weather</h1>
      </div>
      <Form model={model} location={location} />
    </div>
  )
}

export default MenuForm;