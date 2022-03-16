import './editForm.css';
import React from "react";
import CoastItems from "./coastItems";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import logo1 from './cost1.png';
import { v4 as uuidv4 } from 'uuid';

export default function EditForm(props) {

    function handleChange(event) {
    props.settabData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            };
        });
    };

    React.useEffect(function() {
      for(let i=0; i<props.costDetails.length; i++){
        props.seteditComponents(prevData=>{
          return prevData.map((c) => {
            return c.id === props.costDetails[i].costID && c.quantity === 0 ? {...c, quantity: props.costDetails[i].quantity} : c
          })
        });
      };
    }, [])

    const getCostItemList=props.editComponents.map(i => {
      if(i.quantity != 0){
        return(
          <>
            <div className="cosatItem2">
              <div className="cosatItemLeft">
                <img src={logo1} alt="Logo" />
                <p>{i.name}</p>
              </div>
              <div className="cosatItemRight">
                <p><b>{i.quantity * i.prince}€</b></p>
              </div>
            </div>
          </>
        )
      }
    });

    let updatecostList = []
    for(let i=0; i<props.editComponents.length; i++){
      if(props.editComponents[i].quantity != 0){

        updatecostList.push({"uuid": uuidv4(),"quantity": props.editComponents[i].quantity,"amount": props.editComponents[i].prince,"cost": props.editComponents[i].id}) 

      };
    };

    function updateData(){
      fetch('api/validations/'+props.tabData.id+"/", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(
          {
            "costs": updatecostList,
            "uuid": uuidv4(),
            "calculation_type":props.tabData.valoracion == "REBU"? 0 : 1,
            "reference": props.tabData.reference,
            "make": 0,
            "model": props.tabData.makeNmade,
            "amount_purchase": props.tabData.purchase,
            "purchase_vat": true,
            "amount_sale": props.tabData.selling,
            "sale_vat": true,
            "margin": props.tabData.margin,
            "type": props.tabData.type === "A"? 0 : props.tabData.type === "B"? 1:2,
            "risk": props.tabData.risk === "" ? 1 : props.tabData.risk
          } 
        ) 
      }).then((response) => response.json())
        .then((messages) => {console.log("messages");
      });
    };

    
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
    
    <div className='costDiv'>
      <div className='costDiv-head'>
        <h1>Cost Details</h1>
        <Link to="/editFormCost" className="editCostLink"><p>Edit</p></Link>
      </div>
      {getCostItemList}
    </div>
    <input className='confirmBtn' onClick={updateData} type="button" value="Confirm"></input>

    <a href="/" className='cancelLink'><input className='cancelBtn' type="button" value="Cancel"></input></a>
		</form>
    </div>
  );
}