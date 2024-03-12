import './Menu.css'
import DropdownMenu from '../../components/Home/DropdownMenu'
import Content from '../../components/Home/Content'
import React from 'react'
import PlotGraph from '../../components/Home/PlotGraph'
import { SideMenu } from '../../components/Home/SideMenu'
import DropdownModelMenu from './DropModelMenu'


function Menu() {

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
