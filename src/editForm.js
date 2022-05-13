import './editForm.css';
import React from "react";
import logo1 from './cost1.png';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import './addComponents.css';


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
                <img src={i.icon} alt="Logo" />
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
      fetch('http://35.180.210.115:8002/api/update/', {
        method: 'POST',
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
            "risk": props.tabData.risk === "" ? 1 : props.tabData.risk,
            "id": props.tabData.id
          } 
        ) 
      }).then((response) => response.json())
        .then((messages) => {console.log("messages");
      });
      document.getElementById("homeRedirect").click();
    };



    // ************************************************right bar start

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        // onClick={toggleDrawer(anchor, true)}
        // onKeyDown={toggleDrawer(anchor, true)}
      >
        <List>
          {
            <div className="componentsForm">
              {itemObj}
              {/* <input className='submitBtn' type="button" value="CONFIRM" onClick={toggleDrawer("right", false)}></input> */}
            </div>
          }
        </List>
      </Box>
    );

    // *************************Data

    function handleAddClick(id){
      props.seteditComponents(preData=>{
        return preData.map((c) => {
                  return c.id === id ? {...c, quantity: c.quantity+1} : c
              })
      });
  
      props.setcostDetails(preData=>{
        return preData.map((c) => {
                  return c.id === id ? {...c, quantity: c.quantity+1} : c
              })
      });
    }
  
    function handleSubtractClick(id){
      props.seteditComponents(preData=>{
        return preData.map((c) => {
                  return c.id === id && c.quantity !== 0 ? {...c, quantity: c.quantity-1} : c
              })
      });
  
      props.setcostDetails(preData=>{
        return preData.map((c) => {
                  return c.costID === id ? {...c, quantity: c.quantity-1} : c
              })
      });
    }
  
    const itemObj = props.editComponents.map(i => {
          return (
        <div className="componentItem" key={i.id}>
          <div className="componentLeftItem">
            <img src={i.icon} alt="Logo" />
          </div>
          <div className="componentCenerItem">
            <p>{i.name}</p>
            <p>{i.prince}€</p>
          </div>
          <div className="componentRightItem">
            <i className="fa fa-minus subtractQuantity" onClick={() => handleSubtractClick(i.id)} aria-hidden="true"></i>
            <p className='noMargin'>{i.quantity}</p>
            <i className="fa fa-plus addQuantity" onClick={() => handleAddClick(i.id)} aria-hidden="true"></i>
          </div>
        </div>
          )
      });
        
    // ************************************************right bar end
    
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
        <p className="editCostLink" onClick={toggleDrawer("right", true)}>Edit</p>
      </div>
      {getCostItemList}
    </div>
    <input className='confirmBtn' onClick={updateData} type="button" value="Confirm"></input>
    <a href="/" className='cancelLink'><input className='cancelBtn' type="button" value="Cancel"></input></a>
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
		</form>
    <a href="/" id='homeRedirect' className='homeRedirect'>Reload</a>
    </div>
  );
}