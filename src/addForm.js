import './addForm.css';
import React from "react";
import CoastItems from "./coastItems";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import logo1 from './cost1.png';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import './addComponents.css';


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
      const [listItemCount, setListItemCount] = React.useState(0);
      
      function handleAddClick(id){
        props.setComponents(preData=>{
          return preData.map((c) => {
                  setListItemCount(prevData=> prevData + 1);
                    return c.id === id ? {...c, quantity: c.quantity+1} : c
                })
        })
      }
    
      function handleSubtractClick(id){
        props.setComponents(preData=>{
          return preData.map((c) => {
                  setListItemCount(prevData=>prevData - 1);
                    return c.id === id && c.quantity !== 0 ? {...c, quantity: c.quantity-1} : c
                })
        })
      }
    
      props.components.sort(function(a, b) {
        return  a.priority - b.priority;
        });
    
      const itemObj = props.components.map(i => {
            return (
          <div className="componentItem" key={i.id}>
            <div className="componentLeftItem">
              <img src={logo1} alt="Logo" />
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
    
    {listItemCount > 0 && <CoastItems components={props.components} setTotalAmount = {props.setTotalAmount} toggleDrawer={toggleDrawer} url="addForm" /> }
    
    {listItemCount == 0 ? <p className='coastLink coastLinkLable' onClick={toggleDrawer("right", true)}>+ ADD COST</p> : null}

    <Link to="/result" className='confirmLink'><input className='confirmBtn' type="button" value="Confirm"></input></Link>

    <a href="/" className='confirmLink2'><input className='cancelBtn' type="button" value="Cancel"></input></a>
		</form>

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

    </div>
  );
}