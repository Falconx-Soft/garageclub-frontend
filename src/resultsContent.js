import './addForm.css';
import './resultsContent.css';
import './resultHeader.css';
import React from "react";
import CoastItems from "./coastItems";
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
  let colorOfBaner = "green";
  if(margin > 0){
  if(props.formData.purchase < 1000){
    if(props.formData.type === "A"){
      if(margin < 100){
        colorOfBaner = "red";
        console.log(colorOfBaner,"@@@@@@@@@@@@");
      }else{
        colorOfBaner = "green";
        console.log(colorOfBaner,"@@@@@@@@@@@@");
      }
    } else if(props.formData.type === "B"){
      if(margin < 170){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 250){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 1000 && props.formData.purchase < 2000){
    if(props.formData.type === "A"){
      if(margin < 43){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 74){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 108){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 2000 && props.formData.purchase < 4000){
    if(props.formData.type === "A"){
      if(margin < 28){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 48){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 71){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 4000 && props.formData.purchase < 6000){
    if(props.formData.type === "A"){
      if(margin < 24){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 41){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 60){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 6000 && props.formData.purchase < 8000){
    if(props.formData.type === "A"){
      if(margin < 21){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 36){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 54){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 8000 && props.formData.purchase < 10000){
    if(props.formData.type === "A"){
      if(margin < 19){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 33){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 49){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 10000 && props.formData.purchase < 12500){
    if(props.formData.type === "A"){
      if(margin < 18){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 30){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 44){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 12500 && props.formData.purchase < 15000){
    if(props.formData.type === "A"){
      if(margin < 17){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 28){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 42){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 15000 && props.formData.purchase < 20000){
    if(props.formData.type === "A"){
      if(margin < 15){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 25){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 37){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 20000 && props.formData.purchase < 25000){
    if(props.formData.type === "A"){
      if(margin < 16){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 26){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 39){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else if(props.formData.purchase > 25000 && props.formData.purchase < 30000){
    if(props.formData.type === "A"){
      if(margin < 15){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 25){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 36){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }else{
    if(props.formData.type === "A"){
      if(margin < 14){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    } else if(props.formData.type === "B"){
      if(margin < 24){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }else{
      if(margin < 35){
        colorOfBaner = "red";
      }else{
        colorOfBaner = "green";
      }
    }
  }
  }else{
    colorOfBaner = "black";
  }

  console.log(colorOfBaner,"*******************")

  return (
	  <>
	<div className="resultHeader-div">

      {margin < 0 ? 
      <div className="resultHeaderIner-div-black"> 
        <i className="fa fa-check" aria-hidden="true"></i>
          <div className="resultLabel">
            <p>{props.formData.company}</p>
            <h1 className="resultHeader-heading">${margin}</h1>
          </div>
      </div>
      :
      colorOfBaner === "red"?
      <div className="resultHeaderIner-div-pink"> 
        <i className="fa fa-x" aria-hidden="true"></i>
          <div className="resultLabel">
            <p>{props.formData.company}</p>
            <h1 className="resultHeader-heading">${margin}</h1>
          </div>
      </div>:
      <div className="resultHeaderIner-div"> 
        <i className="fa fa-x" aria-hidden="true"></i>
          <div className="resultLabel">
            <p>{props.formData.company}</p>
            <h1 className="resultHeader-heading">${margin}</h1>
          </div>
      </div>
      }
    </div>
    <div className="addform">

    
    <FormControl className='matrialDropDownForm' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Reference</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard-typ"
          value={props.valoracion}
          label="reference"
          name = "reference"
          disabled
        >
          <MenuItem value="REBU">REBU</MenuItem>
          <MenuItem value="IVA">IVA</MenuItem>
        </Select>
    </FormControl>

    <TextField id="standard-basic" label="Make and Made" type="text"  name="makeNmade" value={props.formData.makeNmade} variant="standard" disabled/>

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
          label="Risk"
          name = "risk"
          disabled
        >
          <MenuItem value={1}>2</MenuItem>
          <MenuItem value={2}>1</MenuItem>
        </Select>
    </FormControl>
    <CoastItems components={props.components} setTotalAmount={props.setTotalAmount}/>
    </div>
	</>
  );
}