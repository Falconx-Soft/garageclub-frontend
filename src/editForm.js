import './editForm.css';
import React from "react";
import CoastItems from "./coastItems";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
export default function EditForm(props) {

    function handleChange(event) {
    props.settabData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleValoracionChange(event){
      props.setValoracion(prevData => {
        return (event.target.value)
      });
    }
    
    const location = useLocation()
    const {fromAddComponents} = location.state

    console.log(props.costList,"**************");

  return (
    <div className="addform">
		<form className='inputForm'>

    <div className='inputDiv'>
      <select 
        className="referanceInputDiv"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard-typ"
        value={props.tabData.valoracion}
        onChange={handleChange}
        label="valoracion"
        name = "valoracion">
          <option value="">Select Valoracion</option>
          <option value="REBU">REBU</option>
          <option value="IVA">IVA</option>
      </select>
    </div>

    <div className='inputDiv'>
      <input type="text" id="standard-basic" label="Reference"   name="reference" value={props.tabData.reference} variant="standard" className='inputDivInput' placeholder='Referance' onChange={handleChange} ></input>
    </div>

    <div className='inputDiv'>
      <input id="standard-basic" label="Make and Model" type="text"  name="makeNmade" value={props.tabData.makeNmade} variant="standard" className='inputDivInput' placeholder='Make and Model' onChange={handleChange}></input>
    </div>

    <div className='inputDiv'>
      <input id="standard-basic" label="Purchase Amount" type="number"  name="purchase" value={props.tabData.purchase} variant="standard" className='inputDivInputPurchase' placeholder='Purchase Amount' onChange={handleChange}></input>
      <p className='euroSymbol'>€</p>
    </div>

    <div className='inputDiv'>
      <input id="standard-basic" label="Selling Amount" type="number"  name="selling" value={props.tabData.selling} variant="standard" className='inputDivInputPurchase' placeholder='Selling Amount' onChange={handleChange}></input>
      <p className='euroSymbol'>€</p>
    </div>

    <div className='inputDiv'>
      <select 
        className="referanceInputDiv"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={props.tabData.type}
        
        label="Type"
        name = "type"
		onChange={handleChange}
      >
          <option value="">Select Type</option>
          <option value={"A"}>A</option>
          <option value={"B"}>B</option>
          <option value={"C"}>C</option>
      </select>
    </div>

    <div className='inputDiv'>
      <select 
        className="referanceInputDiv"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={props.tabData.risk}
        onChange={handleChange}
        label="Risk"
        name = "risk"
      >
          <option value="">Select Risk</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
      </select>
    </div>
    
    {/* {fromAddComponents && <CoastItems components={props.components} setTotalAmount = {props.setTotalAmount} url="addForm" /> }
    
    { fromAddComponents ? null :<Link to="/addComponents" className='coastLink'><p className='coastLinkLable'>+ ADD COAST</p></Link>} */}

    <Link to="/result" className='confirmLink'><input className='confirmBtn' type="button" value="Confirm"></input></Link>

    <a href="/" className='cancelLink'><input className='cancelBtn' type="button" value="Cancel"></input></a>
		</form>
    </div>
  );
}