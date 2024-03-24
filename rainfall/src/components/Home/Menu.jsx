import './Menu.css'
import DropdownMenu from '../../components/Home/DropdownMenu'
import Content from '../../components/Home/Content'
// import PlotGraph from '../../components/Home/PlotGraph'
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
            <h5>Your City</h5>
            <DropdownMenu />
          </div>

          <div className='mid-contents'>
            <h5 style={{ padding: '20px ' }}>Models</h5>
            <DropdownModelMenu onSelect={setModel} />
          </div>
          <div style={ContainerStyle}>
            <h4 className='target'>Target: {target !== null ? (target ? "Yes" : "No") : "Null"}</h4>
          </div>
          <div style={ContainerStyle}>
            <h4 style={{ fontSize: "larger" }}>Input Vectors: </h4>
            <div style={InputVectorStyle}>
              {displayResult()}
            </div>
          </div>

        </div>

        <div className='right-contents'>
          <Content onClick={handleClick} prediction={prediction} />
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
  width: "45vw",
  padding: "5px",
  backgroundColor: "#eee",
}

const ContainerStyle = {
  padding: "15px 50px",
  marginBottom: "30px",
}

const VectorItemStyle = {
  marginRight: "5px",
  padding: "5px 8px",
}
