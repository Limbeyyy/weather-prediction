import './MenuForm.css'
import DropdownMenu from '../../components/Home/DropdownMenu'
import Content from '../../components/Home/Content'
// import PlotGraph from '../../components/Home/PlotGraph'
import { SideMenu } from '../../components/Home/SideMenu'
import { useState } from 'react'
import DropdownModelMenu from './DropModelMenu'

const server_base_url = 'http://localhost:8000'

import React from 'react'
import Form from './Form'


const MenuForm = () => {

  return (
    <div>
      <div>
        <h1 className='sides'> Know Your Weather</h1>
      </div>
      <Form />
    </div>
  )
}

export default MenuForm;