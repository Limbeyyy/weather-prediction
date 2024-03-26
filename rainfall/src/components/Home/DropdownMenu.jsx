import React, { useState } from 'react';
import "./DropDownMenu.css"


function DropdownMenu({ setLocation }) {
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle selection change
    const handleSelectionChange = (event) => {
        const val = event.target.value;
        setSelectedOption(val);
        setLocation(val);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleSelectionChange} className='custom-dropmenu'>
                <option value="">Choose a city</option>
                <option value="Albury">Albury</option>
                <option value="BadgerysCreek">BadgerysCreek</option>
                <option value="CoffsHarbour">CoffsHarbour</option>
                <option value="Moree">Moree</option>
                <option value="Newcastle">Newcastle</option>
                <option value="NorahHead">NorahHead</option>
                <option value="NorthfolkIsland">NorthfolkIsland</option>
                <option value="Penrith">Penrith</option>
                <option value="Richmond">Richmond</option>
                <option value="Sydney">Sydney</option>
                <option value="SydneyAirport">SydneyAirport</option>
                <option value="WaggaWagga">WaggaWagga</option>
                <option value="Williamtown">Williamtown</option>
                <option value="Wollongong">Wollongong</option>
                <option value="Canberra">Canberra</option>
                <option value="Tuggerangong">Tuggerangong</option>
                <option value="MountGinini">MountGinini</option>
                <option value="Ballarat">Ballarat</option>
                <option value="Bendigo">Bendigo</option>
                <option value="Sale">Sale</option>
                <option value="MelbourneAirport">MelbourneAirport</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Mildura">Mildura</option>
                <option value="Nhil">Nhil</option>
                <option value="Portland">Portland</option>
                <option value="Watsonia">Watsonia</option>
                <option value="Dartmoor">Dartmoor</option>
                <option value="Brisbane">Brisbane</option>
                <option value="Cairns">Cairns</option>
                <option value="GoldCoast">GoldCoast</option>
                <option value="Townsville">Townsville</option>
                <option value="Adelaide">Adelaide</option>
                <option value="MountGambier">MountGambier</option>
                <option value="Nurioopta">Nurioopta</option>
                <option value="Woomera">Woomera</option>
                <option value="Albany">Albany</option>
                <option value="Witchcliffe">Witchcliffe</option>
                <option value="PearceRAAF">PearceRAAF</option>
                <option value="PearthAirport">PearthAirport</option>
                <option value="Perth">Perth</option>
                <option value="SalmonGums">SalmonGums</option>
                <option value="Walpole">Walpole</option>
                <option value="Hobart">Hobart</option>
                <option value="Launceston">Launceston</option>
                <option value="AliceSprings">AliceSprings</option>
                <option value="Darwin">Darwin</option>
                <option value="Katherine">Katherine</option>
                <option value="Uluru">Uluru</option>
            </select>
        </div>
    );
}

export default DropdownMenu;
