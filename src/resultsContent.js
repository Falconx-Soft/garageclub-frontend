import './addForm.css';
import './resultsContent.css';
import './resultHeader.css';
import React from "react";
import CoastItems from "./coastItems";
import { v4 as uuidv4 } from 'uuid';
import {TextField,MenuItem,FormControl,Select,InputLabel} from '@material-ui/core';
export default function ResultsContent(props) {
  let margin = 0;
  if(props.valoracion === "IVA"){
    let netMargin = props.formData.selling - props.formData.purchase;
    margin = Math.floor(netMargin - props.totalAmount);
  }else{
    let grossMargin = props.formData.selling - props.formData.purchase;
    let netMargin = grossMargin/1.21;
    margin = Math.floor(netMargin - props.totalAmount);
  }

  let colorOfBaner = "green"
	for(let i=0; i<props.marginTemp.temp.length; i++){
		console.log(props.amount_purchase,props.marginTemp.temp[i].min_purchase_range,)
		if(props.amount_purchase > props.marginTemp.temp[i].min_purchase_range && props.amount_purchase < props.marginTemp.temp[i].max_purchase_range){
			if(props.type === 0){
			  if(props.amount_purchase< props.marginTemp.temp[i].typeA){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			} else if(props.type === 1){
			  if(props.amount_purchase< props.marginTemp.temp[i].typeB){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}else{
			  if(props.amount_purchase< props.marginTemp.temp[i].typeC){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}
		}
	}

  function saveData(){
		fetch('api/validations/', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(
        {
          "costs": [
            {
              "uuid": uuidv4(),
              "quantity": 2147483647,
              "amount": 0,
              "cost": 4
            }
          ],
          "uuid": uuidv4(),
          "calculation_type": 0,
          "reference": props.formData.reference,
          "make": 0,
          "model": props.formData.makeNmade,
          "amount_purchase": props.formData.purchase,
          "purchase_vat": true,
          "amount_sale": props.formData.selling,
          "sale_vat": true,
          "margin": margin,
          "type": props.formData.type,
          "risk": props.formData.risk
        } 
      ) 
		}).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    document.getElementById("homeRedirect").click();
	};

  return (
	  <>
	<div className="resultHeader-div">

      {margin < 0 ? 
      <div className="resultHeaderIner-div-black"> 
        <i className="fa fa-check" aria-hidden="true"></i>
          <div className="resultLabel">
            <p>{props.formData.company}</p>
            <h1 className="resultHeader-heading">€{margin}</h1>
          </div>
      </div>
      :
      colorOfBaner === "red"?
      <div className="resultHeaderIner-div-pink"> 
        <i className="fa fa-x" aria-hidden="true"></i>
          <div className="resultLabel">
            <p>{props.formData.company}</p>
            <h1 className="resultHeader-heading">€{margin}</h1>
          </div>
      </div>:
      <div className="resultHeaderIner-div"> 
        <i className="fa fa-x" aria-hidden="true"></i>
          <div className="resultLabel">
            <p>{props.formData.company}</p>
            <h1 className="resultHeader-heading">€{margin}</h1>
          </div>
      </div>
      }
    </div>
    <div className="addform">

    
    <FormControl className='matrialDropDownForm' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Operation</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard-typ"
          value={props.valoracion}
          label="Operation"
          name = "Operation"
          disabled
        >
          <MenuItem value="REBU">REBU</MenuItem>
          <MenuItem value="IVA">IVA</MenuItem>
        </Select>
    </FormControl>

    <TextField id="standard-basic" label="Reference" type="text"  name="reference" value={props.formData.reference} variant="standard" disabled/>

    <TextField id="standard-basic" label="Make and Model" type="text"  name="makeNmade" value={props.formData.makeNmade} variant="standard" disabled/>

    <div className="inputWithIcion">
      <TextField id="standard-basic" label="Purchase Amount" type="number"  name="purchase" value={props.formData.purchase} variant="standard" disabled/>
      {props.inputIcion.purchase ? 
      <i className="fa fa-check inputIcion inputTcionChecked" id="purchaseIcion" aria-hidden="true"></i> :
      <i className="fa fa-check inputIcion" id="purchaseIcion" aria-hidden="true"></i>
      }
    </div>

    <div className="inputWithIcion">
      <TextField id="standard-basic" label="Selling Amount" type="number"  name="selling" value={props.formData.selling} variant="standard" disabled/>
      {props.inputIcion.sell ?
        <i className="fa fa-check inputIcion inputTcionChecked" id="sellIcion" aria-hidden="true"></i>:
        <i className="fa fa-check inputIcion" id="sellIcion" aria-hidden="true"></i>
      }
    </div>

    <FormControl className='matrialDropDownForm' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel >
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.formData.type}
          label="Type"
          name = "type"
          disabled
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
          label="Risk"
          name = "risk"
          disabled
        >
          <MenuItem value={1}>2</MenuItem>
          <MenuItem value={2}>1</MenuItem>
        </Select>
    </FormControl>
    <CoastItems components={props.components} setTotalAmount={props.setTotalAmount}/>
    <button className='submitBtn' onClick={saveData}>Save</button>
    <a href="/" id='homeRedirect' className='homeRedirect'>Reload</a>
    </div>
	</>
  );
}