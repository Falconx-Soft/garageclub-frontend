import './addForm.css';
import './resultsContent.css';
import './resultHeader.css';
import React from "react";
import CoastItems from "./coastItems";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
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

  let colorOfBaner = "pink"
  for(let i=0; i<props.marginTemp.temp.length; i++){
		if(props.formData.purchase > props.marginTemp.temp[i].min_purchase_range && props.formData.purchase < props.marginTemp.temp[i].max_purchase_range){
			if(props.formData.type === 0){
			  if(margin < props.marginTemp.temp[i].typeA){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			} else if(props.formData.type === 1){
			  if(margin < props.marginTemp.temp[i].typeB){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}else{
			  if(margin < props.marginTemp.temp[i].typeC){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}
		}
	}
  let costList = []
  for(let i=0; i<props.components.length; i++){
    console.log(props.components[i],"***************")
    if(props.components[i].quantity != 0){
      costList.push({"uuid": uuidv4(),"quantity": props.components[i].quantity,"amount": props.components[i].prince,"cost": props.components[i].id}) 
    }
  }

  function saveData(){
    if(props.formData.reference == ""){
      document.getElementById("reference").style.border = "solid 1px red";
    }else if(props.formData.makeNmade == ""){
      document.getElementById("makeNmade").style.border = "solid 1px red";
    }else if(props.formData.purchase == ""){
      document.getElementById("purchase").style.border = "solid 1px red";
    }else if(props.formData.selling == ""){
      document.getElementById("selling").style.border = "solid 1px red";
    }else{
      fetch('api/validations/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(
          {
            "costs": costList,
            "uuid": uuidv4(),
            "calculation_type": props.valoracion == "REBU"? 0 : 1,
            "reference": props.formData.reference,
            "make": 0,
            "model": props.formData.makeNmade,
            "amount_purchase": props.formData.purchase,
            "purchase_vat": true,
            "amount_sale": props.formData.selling,
            "sale_vat": true,
            "margin": margin,
            "type": props.formData.type,
            "risk": props.formData.risk === "" ? 1 : props.formData.risk
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
    }
	};

  return (
	  <>
	<div className="resultHeader-div">
      <div className="resultHead">
        <p className="resultHeadLabel">Valoraciones Details</p>
        <Link className="resultHeadLink" to={{
				pathname: "/add",
				state:{
					fromAddComponents: true
				}
			  }}><p className="resultHeadLink">Edit</p></Link>
      </div>

      <p className="resultTitel">porsche keynne Referencia</p>

      <div className="resultForm">
        <div className="resultFormItem">
            <p className="resultFormItemLeft">Margin</p>
            {margin < 0 ? 
              <p className="resultHeaderIner-div-black">€{margin}</p>
              :
              colorOfBaner === "red"?
              <p className="resultHeaderIner-div-pink">€{margin}</p>
              :
              <p className="resultHeaderIner-div">€{margin}</p>
            }
        </div>

        <div className="resultFormItem">
            <p className="resultFormItemLeft">Tipo de calculo</p>
            <p className="resultFormItemRight">{props.valoracion}</p>
        </div>

        <div className="resultFormItem">
            <p className="resultFormItemLeft" id="reference">Reference</p>
            <p className="resultFormItemRight">{props.formData.reference}</p>
        </div>

        <div className="resultFormItem">
            <p className="resultFormItemLeft" id="makeNmade">Made and Model</p>
            <p className="resultFormItemRight">{props.formData.makeNmade}</p>
        </div>

        <div className="resultFormItem">
            <p className="resultFormItemLeft" id="purchase">Purchase Amount</p>
            <p className="resultFormItemRight">{props.formData.purchase}€</p>
        </div>

        <div className="resultFormItem">
            <p className="resultFormItemLeft" id="selling">Selling Amount</p>
            <p className="resultFormItemRight">{props.formData.selling}€</p>
        </div>

        <div className="resultFormItem">
            <p className="resultFormItemLeft">Type</p>
            <p className="resultFormItemRight">{props.formData.type == 0 ? "A": props.formData.type == 1 ? "B":"C"}</p>
        </div>

        <div className="resultFormItem">
            <p className="resultFormItemLeft">Risk</p>
            <p className="resultFormItemRight">{props.formData.risk}</p>
        </div>

      </div>
    <CoastItems components={props.components} setTotalAmount={props.setTotalAmount} url="result"/>
    <button className='submitBtn' onClick={saveData} id='saveBtn'>Save</button>
    <a href="/" id='homeRedirect' className='homeRedirect'>Reload</a>
    </div>
	</>
  );
}