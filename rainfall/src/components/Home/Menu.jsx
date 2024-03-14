import './Menu.css'
import DropdownMenu from '../../components/Home/DropdownMenu'
import Content from '../../components/Home/Content'
import PlotGraph from '../../components/Home/PlotGraph'
import { SideMenu } from '../../components/Home/SideMenu'
import DropdownModelMenu from './DropModelMenu'
import { useState } from 'react'


function Menu() {
  const [rainfall, setRainfall] = useState(null)
  const [inputSample, setInputSample] = useState([])
  const [target, setTarget] = useState(null)

  async function get_prediction() {
    const res = await fetch("http://localhost:8000/predict/")
  }

    return (
        <div className='inner-container'>
            <div className='selection-bar'>
                <div className='mid-contents'>
                    <h4>Your City</h4>
                    <DropdownMenu />

                </div>
                <div className='mid-contents'>
                    <h4>Models</h4>
                    <DropdownModelMenu />
                </div>

                <Content />

            </div>
            <div className='right-contents'>
                <PlotGraph />
                <SideMenu />
            </div>
        </div>
    )
}

export default Menu
