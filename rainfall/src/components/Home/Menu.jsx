import './Menu.css'
import DropdownMenu from '../../components/Home/DropdownMenu'
import Content from '../../components/Home/Content'
import PlotGraph from '../../components/Home/PlotGraph'
import { SideMenu } from '../../components/Home/SideMenu'
import { useState } from 'react'
import DropdownModelMenu from './DropModelMenu'

const server_base_url = 'http://localhost:8000'

function Menu() {
  const [prediction, setPrediction] = useState(false)
  const [target, setTarget] = useState(false)
  const [inputs, setInputs] = useState([])
  const [model, setModel] = useState(null)

  async function getPrediction() {
    try {
      const p = await fetch(`${server_base_url}/predict/?${model !== null ? `model=${model}` : ""}`)
      const response = await p.json();
      console.log(response)
      return response;
    } catch (error) {
      console.error("(getInference): ", error);
    }
  }

  async function handleClick() {
    const response = await getPrediction()
    console.log(response)
    setPrediction(response.prediction)
    setTarget(response.target)
    setInputs(response.input)
    console.log(response.input.Sunshine)
  }

  const displayResult = () => {
    return Object.entries(inputs).map(([key, value]) => {
      console.log(key, value);
      return (
        <div key={key} style={VectorItemStyle}>
          <h4>{key}</h4>
          <p>{value.toFixed(4)}</p>
        </div>
      )
    });
  }

  return (
    <div>
      <div className='inner-container'>
        <div className='selection-bar'>
          <div className='mid-contents'>
            <h4>Your City</h4>
            <DropdownMenu />
          </div>

          <div className='mid-contents'>
            <h4>Models</h4>
            <DropdownModelMenu onSelect={setModel}/>
          </div>

          <Content onClick={handleClick} prediction={prediction} />
        </div>

        <div className='right-contents'>
          <PlotGraph />
          <SideMenu />
        </div>
      </div>

      <div style={ContainerStyle}>
        <h4>Target: {target === null ? "None" : target.toString()}</h4>
      </div>
      <div style={ContainerStyle}>
        <h4>InputVector: </h4>
        <div style={InputVectorStyle}>
          {displayResult()}
        </div>
      </div>
    </div>
  )
}

export default Menu


const InputVectorStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "none",
  overflowX: "auto",
  overflowY: "none",
  width: "70vw",
  padding: "5px",
  backgroundColor: "#eee",
}

const ContainerStyle = {
  padding: "15px 50px",
}

const VectorItemStyle = {
  marginRight: "5px",
  padding: "5px 8px",
}
