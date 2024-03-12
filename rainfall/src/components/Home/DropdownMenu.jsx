import React, { useState } from 'react';
import "./DropDownMenu.css"


function DropdownMenu() {
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle selection change
    const handleSelectionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleSelectionChange} className='custom-dropmenu'>
                <option value="">Choose a city</option>
                <option value="option1">Albury</option>
                <option value="option2">BadgerysCreek</option>
                <option value="option3">CoffsHarbour</option>
                <option value="option4">Moree</option>
                <option value="option5">Newcastle</option>
                <option value="option6">NorahHead</option>
                <option value="option7">NorthfolkIsland</option>
                <option value="option8">Penrith</option>
                <option value="option9">Richmond</option>
                <option value="option10">Sydney</option>
                <option value="option11">SydneyAirport</option>
                <option value="option12">WaggaWagga</option>
                <option value="option13">Williamtown</option>
                <option value="option14">Wollongong</option>
                <option value="option15">Canberra</option>
                <option value="option16">Tuggerangong</option>
                <option value="option17">MountGinini</option>
                <option value="option18">Ballarat</option>
                <option value="option19">Bendigo</option>
                <option value="option20">Sale</option>
                <option value="option21">MelbourneAirport</option>
                <option value="option22">Melbourne</option>
                <option value="option23">Mildura</option>

                <option value="option24">Nhil</option>
                <option value="option25">Portland</option>
                <option value="option26">Watsonia</option>

                <option value="option27">Dartmoor</option>
                <option value="option28">Brisbane</option>
                <option value="option29">Cairns</option>
                <option value="option30">GoldCoast</option>

                <option value="option31">Townsville</option>
                <option value="option32">Adelaide</option>
                <option value="option33">MountGambier</option>
                <option value="option34">Nurioopta</option>
                <option value="option35">Woomera</option>
                <option value="option36">Albany</option>
                <option value="option37">Witchcliffe</option>
                <option value="option38">PearceRAAF</option>
                <option value="option39">PearthAirport</option>
                <option value="option40">Perth</option>
                <option value="option41">SalmonGums</option>
                <option value="option42">Walpole</option>
                <option value="option43">Hobart</option>
                <option value="option44">Launceston</option>
                <option value="option45">AliceSprings</option>
                <option value="option46">Darwin</option>
                <option value="option47">Katherine</option>
                <option value="option48">Uluru</option>
            </select>
        </div>
    );
}

export default DropdownMenu;
