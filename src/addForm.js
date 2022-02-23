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

    // function handleIcionCheck(key){
    //   if(key == "purchase"){
    //     const purchaseIcion = document.getElementById("purchaseIcion");
    //     if(purchaseIcion.classList.contains("inputTcionChecked")){
    //       purchaseIcion.classList.remove("inputTcionChecked");
    //       props.setinputIcion(prevValue => {
    //         return{
    //           purchase : false,
    //           sell: prevValue.sell
    //         }
    //       });
    //     }else{
    //       purchaseIcion.classList.add("inputTcionChecked");
    //       props.setinputIcion(prevValue => {
    //         return{
    //           purchase : true,
    //           sell : prevValue.sell
    //         }
    //       });
    //     }
    //   }else{
    //     const sellIcion = document.getElementById("sellIcion");
    //     if(sellIcion.classList.contains("inputTcionChecked")){
    //       sellIcion.classList.remove("inputTcionChecked");
    //       props.setinputIcion(prevValue => {
    //         return{
    //           ...prevValue,
    //           sell : false
    //         }
    //       });
    //     }else{
    //       sellIcion.classList.add("inputTcionChecked");
    //       props.setinputIcion(prevValue => {
    //         return{
    //           ...prevValue,
    //           sell : true
    //         }
    //       });
    //     }
    //   }
    // }

    
    const location = useLocation()
    const {fromAddComponents} = location.state

  return (
    <div className="addform">
		<form>
    <div className="referanceInputDiv">
    <p>Referance</p>
      <FormControl className='matrialDropDownForm' variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard-typ"
            value={props.valoracion}
            onChange={handleValoracionChange}
            label="reference"
            name = "reference"
          >
            <MenuItem value="REBU">REBU</MenuItem>
            <MenuItem value="IVA">IVA</MenuItem>
          </Select>
      </FormControl>
    </div>

    {/* <TextField id="standard-basic" label="Reference" type="text" onChange={handleChange} name="reference" value={props.formData.reference} variant="standard" /> */}

    <TextField id="standard-basic" label="Make and Made" type="text" onChange={handleChange} name="makeNmade" value={props.formData.makeNmade} variant="standard" />

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
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
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