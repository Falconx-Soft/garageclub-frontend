import './addForm.css';
import React from "react";
import CoastItems from "./coastItems";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
export default function AddForm(props) {

    function handleChange(event) {
    props.setFormData(prevFormData => {
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

  return (
    <div className="addform">
		<form className='inputForm'>

    <div className='inputDiv'>
      <select 
        className="referanceInputDiv"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard-typ"
        value={props.valoracion}
        onChange={handleValoracionChange}
        label="Operation"
        name = "operation">
          <option value="">Select Operation</option>
          <option value="REBU">REBU</option>
          <option value="IVA">IVA</option>
      </select>
    </div>

    <div className='inputDiv'>
      <input type="text" id="standard-basic" label="Reference" onChange={handleChange}  name="reference" value={props.formData.reference} variant="standard" className='inputDivInput' placeholder='Referance' ></input>
    </div>

    <div className='inputDiv'>
      <input id="standard-basic" label="Make and Model" type="text" onChange={handleChange} name="makeNmade" value={props.formData.makeNmade} variant="standard" className='inputDivInput' placeholder='Make and Model'></input>
    </div>

    <div className='inputDiv'>
      <input id="standard-basic" label="Purchase Amount" type="number" onChange={handleChange} name="purchase" value={props.formData.purchase} variant="standard" className='inputDivInputPurchase' placeholder='Purchase Amount'></input>
      <p className='euroSymbol'>€</p>
    </div>

    <div className='inputDiv'>
      <input id="standard-basic" label="Selling Amount" type="number" onChange={handleChange} name="selling" value={props.formData.selling} variant="standard" className='inputDivInputPurchase' placeholder='Selling Amount'></input>
      <p className='euroSymbol'>€</p>
    </div>

    <div className='inputDiv'>
      <select 
        className="referanceInputDiv"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={props.formData.type}
        onChange={handleChange}
        label="Type"
        name = "type"
      >
          <option value="">Select Type</option>
          <option value={0}>A</option>
          <option value={1}>B</option>
          <option value={2}>C</option>
      </select>
    </div>

    <div className='inputDiv'>
      <select 
        className="referanceInputDiv"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={props.formData.risk}
        onChange={handleChange}
        label="Risk"
        name = "risk"
      >
          <option value="">Select Risk</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
      </select>
    </div>
    
    {fromAddComponents && <CoastItems components={props.components} setTotalAmount = {props.setTotalAmount} url="addForm" /> }
    
    { fromAddComponents ? null :<Link to="/addComponents" className='coastLink'><p className='coastLinkLable'>+ ADD COAST</p></Link>}

    <Link to="/result" className='confirmLink'><input className='confirmBtn' type="button" value="Confirm"></input></Link>

    <a href="/" className='confirmLink2'><input className='cancelBtn' type="button" value="Cancel"></input></a>
		</form>
    </div>
  );
}