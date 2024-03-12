import React from 'react'
import { IoSunny } from "react-icons/io5";
import { FaCloudShowersHeavy } from "react-icons/fa6";
import "./SideMenu.css";


export const SideMenu = () => {
    return (
        <div className='side-menus'>
            <div className='sub-menu'>
                <h4> Today</h4>
                <FaCloudShowersHeavy />
                <h4> Rain</h4>
                <h4> Yes</h4>
            </div>

            <div className='sub-menu'>
                <h4> Tommorow</h4>
                <FaCloudShowersHeavy />
                <h4> Rain</h4>
                <h4> No</h4>
            </div>

            <div className='sub-menu'>
                <h4> Day After</h4>
                <IoSunny />
                <h4> Rain</h4>
                <h4> Yes</h4>
            </div>

            <div className='sub-menu'>
                <h4> Nov 26</h4>
                <IoSunny />
                <h4> Rain</h4>
                <h4> No</h4>
            </div>

        </div>
    )
}
