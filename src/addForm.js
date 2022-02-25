import './addForm.css';
import React from "react";
import CoastItems from "./coastItems";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import {TextField,MenuItem,FormControl,Select,InputLabel} from '@material-ui/core';
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
		<form>
    <div className="referanceInputDiv">
    <p>Operation</p>
      <FormControl className='matrialDropDownForm' variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard-typ"
            value={props.valoracion}
            onChange={handleValoracionChange}
            label="Operation"
            name = "operation"
          >
            <MenuItem value="REBU">REBU</MenuItem>
            <MenuItem value="IVA">IVA</MenuItem>
          </Select>
      </FormControl>
    </div>

    {/* <TextField id="standard-basic" label="Reference" type="text" onChange={handleChange} name="reference" value={props.formData.reference} variant="standard" /> */}

    <TextField id="standard-basic" label="Reference" type="text" onChange={handleChange}  name="reference" value={props.formData.reference} variant="standard"/>
    
    <TextField id="standard-basic" label="Make and Model" type="text" onChange={handleChange} name="makeNmade" value={props.formData.makeNmade} variant="standard" />

    <div className="inputWithIcion">
      <TextField id="standard-basic" label="Purchase Amount" type="number" onChange={handleChange} name="purchase" value={props.formData.purchase} variant="standard" />
      {props.valoracion === "REBU" ? 
      <i className="fa fa-check inputIcion" id="purchaseIcion" aria-hidden="true"></i> :
      <i className="fa fa-check inputIcion" id="purchaseIcion" aria-hidden="true"></i>
      }
      
    </div>

    <div className="inputWithIcion">
      <TextField id="standard-basic" label="Selling Amount" type="number" onChange={handleChange} name="selling" value={props.formData.selling} variant="standard" />
      {props.valoracion === "REBU" ?
        <i className="fa fa-check inputIcion inputTcionChecked" id="sellIcion" aria-hidden="true"></i>:
        <i className="fa fa-check inputIcion" id="sellIcion" aria-hidden="true"></i>
      }
    </div>

    <FormControl className='matrialDropDownForm' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.formData.type}
          onChange={handleChange}
          label="Type"
          name = "type"
        >
          <MenuItem value={0}>A</MenuItem>
          <MenuItem value={1}>B</MenuItem>
          <MenuItem value={2}>C</MenuItem>
        </Select>
    </FormControl>


    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Risk</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.formData.risk}
          onChange={handleChange}
          label="Risk"
          name = "risk"
        >
          <MenuItem value={1}>2</MenuItem>
          <MenuItem value={2}>1</MenuItem>
        </Select>
    </FormControl>

    
    {fromAddComponents && <CoastItems components={props.components} setTotalAmount = {props.setTotalAmount} /> }
    <Link to="/addComponents"><input className='submitBtn' type="button" value="ADD COSTES"></input></Link>

		</form>
    </div>
  );
}